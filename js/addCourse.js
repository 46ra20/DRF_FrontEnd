const loading_spin=document.getElementById('loading_spin')


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

    const profile_img=get_value('course_image')
    const image = profile_img
    const user = localStorage.getItem('user_id')

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
        window.location.href='mycorse.html'
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
