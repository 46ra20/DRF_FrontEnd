const loading_spin=document.getElementById('loading_spin')

image_url = ''
const handleImageUpload=(event)=>{
    console.log(event.target.files[0])
    const image = new FormData()
    image.append("image",event.target.files[0])
    fetch("https://api.imgbb.com/1/upload?key=d2482430033f7bfb9ae882d79af05191",{
        method:'POST',
        // headers:{"content-type":"multipart/form-data"},
        body:image
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        image_url=d.data.display_url
        }
    )
}

const handleAddpost=(e)=>{
    e.preventDefault()
    loading_spin.classList.replace('d-none','d-inline-block')

    const title = get_value('title')
    const price = get_value('price')
    const course_duration = get_value('course_duration')
    const description = get_value('description')
    const learning_outcome = get_value('description')
    const assesment_method = get_value('assesment_method')
    const prerequisites = get_value('prerequisites')
    const select_department = get_value('select_department')

    
    const image = image_url
    const user = parseInt(localStorage.getItem('user_id'))

    const formatData = new FormData()

    formatData.append('title',title)
    formatData.append('description',description)
    formatData.append('assessment_methods',assesment_method)
    formatData.append('learing_outcomes',learning_outcome)
    formatData.append('course_duration',course_duration)
    formatData.append('prerequisites',prerequisites)
    formatData.append('image',image)
    formatData.append('price',price)
    formatData.append('title',title)
    formatData.append('department',select_department)
    formatData.append('user',user)
    
    console.log(formatData)

    fetch(url+`course/authentic/${user}/`,{
        method:'POST',
        // headers:{
        //     "Content-Type": "multipart/form-data"
        // },
        // body:JSON.stringify(context)
        body:formatData
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        // window.location.href='mycorse.html'
    })
    .catch(error=>{
        loading_spin.classList.replace('d-inline-block','d-none')
        
        console.log(error)
    })
    

}

const CategoryView = ()=>{
    fetch(url+'course/category/')
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        const category_container = document.getElementById('select_department')
        d.forEach(element => {
            const option = document.createElement('option')
            option.value=element.id
            option.innerText=element.category
            category_container.appendChild(option)
        });
    })
    .catch(err=>console.log(err))

}



const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}

CategoryView()
