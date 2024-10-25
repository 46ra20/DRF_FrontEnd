const loadAddCoursePage = async(event)=>{
    dashboard_container.innerHTML=''
    dashboard_container.innerHTML=
    `<form
      action=""
      onsubmit="handleAddpost(event)"
      method="post"
      class="col-11 mx-auto my-3 p-4 bg-white border rounded shadow"
    >
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          name=""
          id="title"
          aria-describedby="helpId"
          placeholder=""
          required
        />
      </div>
      <div class="mb-3">
        <label for="course_image" class="form-label">Image</label>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          onchange="handleImageUpload(event)"
          name=""
          id="course_image"
          aria-describedby="helpId"
          placeholder="please provide an image link"
          required
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input
          type="number"
          class="form-control"
          name=""
          id="price"
          aria-describedby="helpId"
          placeholder=""
          required
        />
      </div>
      <div class="mb-3">
        <label for="course_duration" class="form-label">Course Duration</label>
        <input
          type="number"
          class="form-control"
          name=""
          id="course_duration"
          aria-describedby="helpId"
          placeholder=""
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Select your Department</label>
        <select class="form-select" aria-label="Select your Department" id="select_department" required>
          <option selected>Department</option>
          
        </select>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="learning_outcome" class="form-label"
          >Learning Outcome</label
        >
        <textarea
          class="form-control"
          id="learning_outcome"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="assesment_method" class="form-label"
          >Assesment Method</label
        >
        <textarea
          class="form-control"
          id="assesment_method"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="prerequisites" class="form-label">Prerequisites</label>
        <textarea class="form-control" id="prerequisites" rows="3" required></textarea>
      </div>

      <button
        name=""
        class="d-block w-100 btn btn-warning text-white fw-bold"
        id=""
        
        class="btn btn-primary"
        type="submit"
        value="Add Course"
      >
      Add Course
      <div  id="loading_spin" class="d-none">
        <div class="d-inline-block spinner-border text-light" role="status" style="height: 16px; width: 16px;">
          <span class="visually-hidden">Loading...</span>
      </div>
      </button>
    </form>`
    await showActiveMenu(event)
}

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
    CategoryView()
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



loadAddCoursePage()