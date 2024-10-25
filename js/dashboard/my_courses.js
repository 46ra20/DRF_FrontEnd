const loadMyCourses=(event)=>{
    dashboard_container.innerHTML='' 
    dashboard_container.innerHTML=
    `<section class="col-11 mx-auto my-3 p-4 rounded border shadow bg-white">
    <div  id="details_spin" class="d-none justify-content-center">
      <div class="d-block spinner-border text-warning" role="status" style="height: 42px; width: 42px;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="">
      <div>
        <div class="d-flex py-2 gap-2 border-bottom">
          <div class="fw-bold col-1">No.</div>
          <div class="fw-bold col-7">Title</div>
          <div class="fw-bold d-none d-md-block col-1">Price</div>
          <!-- <div scope="col d-sm-none">Course Duration</div> -->
          <div class="fw-bold">Action</th>
          </div>
        </div>
        <div id="table_container">
        </div>
      </div>
  </section>
  <section>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit your course</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal_container">

          </div>
          <!-- <div class="modal-footer">
                  <button type="button" class="btn btn-warning" onclick="UpdatePost(event)">Save changes</button>
                </div> -->
        </div>
      </div>
    </div>

    <!-- Button trigger modal -->
    

    <!-- Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"  id="modal_container_">
        
      </div>
    </div>
  </section>`
  loadMyCourse()
  showActiveMenu(event)
}


const loadMyCourse = () => {
    document.getElementById('details_spin').classList.replace('d-none','d-flex')
    const user = localStorage.getItem('user_id')
    fetch(url+`course/authentic/${user}/`)
        .then(r => r.json())
        .then(d => {
            displayMyCourses(d)
            document.getElementById('details_spin').classList.replace('d-flex','d-none')
        })
        .catch(err => console.log(err))
}
const displayMyCourses = (courses) => {
    let count =0;
    const table_container = document.getElementById('table_container')
    table_container.innerHTML=""
    courses.forEach(course => {        
        const div = document.createElement('div')
        div.classList.add('d-flex','border-bottom','py-2','gap-2')

        div.innerHTML = `
                <div class="fw-bold col-1">${++count}.</div>
                <div class="fw-bold col-7"><a class="fw-bold" style="text-decoration:none" href="detailsView.html?id=${course?.id}">${course?.title}</a></div>
                <div class="fw-bold d-none d-md-block col-1">${course?.price}$</div>
                
                <div class="d-flex gap-1 flex-wrap">
                    <button class="btn btn-warning d-block" onclick="hangleEdit(${course?.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    <button class="btn btn-danger d-block " onclick="hangleDelete(${course?.id})">Delete</button>
                </div>
        `
        table_container.append(div)
    });
}

const hangleDelete=(id)=>{
    const del = window.confirm('Are you sure?')
    console.log(id)
    if(del==true){
        const user = localStorage.getItem('user_id')

        fetch(url+`course/details/${user}/${id}/`,{
            method:'DELETE'
        })
        .then(r=>r.json())
        .then(d=>{
            // window.location.reload()
            console.log(d)
            loadMyCourse()
        })
        .catch(err=>{
            console.log(err)
            // window.location.reload()
            loadMyCourse()
        })
    }
    
}

const hangleEdit=(id)=>{
    const user = localStorage.getItem('user_id')
    const modal_container = document.getElementById('modal_container')
    fetch(url+`course/details/${user}/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        modal_container.innerHTML=
        `
            <form
                action=""
                method="post"
                class="bg-white border rounded p-4 shadow"
                >
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                    type="text"
                    class="form-control"
                    name=""
                    value=${d?.title}
                    id="title"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input
                    type="number"
                    class="form-control"
                    value=${d?.price}
                    name=""
                    id="price"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="course_duration" class="form-label">Course Duration</label>
                    <input
                    type="number"
                    class="form-control"
                    value=${d?.course_duration}
                    name=""
                    id="course_duration"
                    aria-describedby="helpId"
                    placeholder=""
                    />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Select your Department</label>
                    <select class="form-select" aria-label="Select your Department" id="select_department">
                    <option selected>${d?.department}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" 
                    value=${d?.description}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="learning_outcome" class="form-label"
                    >Learning Outcome</label
                    >
                    <textarea
                    class="form-control"
                    id="learning_outcome"
                    value=${d?.learing_outcomes}
                    rows="3"
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
                    value=${d?.assessment_methods}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="prerequisites" class="form-label">Prerequisites</label>
                    <textarea class="form-control" id="prerequisites" rows="3" value=${d?.prerequisites}></textarea>
                </div>
                  <button type="button" class="btn btn-warning" onclick="UpdatePost(event,${d?.id})">Save changes</button>
            </form>
        `

        setValue('title',d?.title)
        setValue('description',d?.description)
        setValue('assesment_method',d?.assessment_methods)
        setValue('learning_outcome',d?.learing_outcomes)
        setValue('prerequisites',d?.prerequisites)
        setValue('select_department',d?.department)
    })
    .catch(err=>{
        console.log(err)
        // window.location.reload()
    })
}
const setValue=(id,value)=>{
    const ele = document.getElementById(id)
    ele.value = value
    return ele
}


const UpdatePost=(e,id)=>{
    const title = get_value('title')
    const price = get_value('price')
    const course_duration = get_value('course_duration')
    const description = get_value('description')
    const learning_outcome = get_value('description')
    const assesment_method = get_value('assesment_method')
    const prerequisites = get_value('prerequisites')
    const select_department = get_value('select_department')

    // const profile_img=document.getElementById('course_image')
    // const image = profile_img.files[0]
    const user = localStorage.getItem('user_id')

    const formatData = new FormData()

    formatData.append('title',title)
    formatData.append('description',description)
    formatData.append('assessment_methods',assesment_method)
    formatData.append('learing_outcomes',learning_outcome)
    formatData.append('course_duration',course_duration)
    formatData.append('prerequisites',prerequisites)
    if(select_department){
        formatData.append('department',select_department)
    }

    formatData.append('price',price)
    formatData.append('title',title)
    formatData.append('user',user)

    const context = {
        'title':title,
        'description':description,
        'assessment_methods':assesment_method,
        'learing_outcomes':learning_outcome,
        'course_duration':course_duration,
        'prerequisites':prerequisites,
        'price':price,
        'title':title,
        'user':user
    }

    if(select_department!=0){
        context['department']=select_department
    }
    console.log(context)
    

    fetch(url+`course/details/${user}/${id}/`,{
        method:'PATCH',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(context)
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        window.location.reload()
    })
    .catch(error=>console.log(error))
}


// const get_value=(id)=>{
//     const input = document.getElementById(id)
//     return input.value
// }

const handleModal=(title,id)=>{
    console.log(title,id)
}