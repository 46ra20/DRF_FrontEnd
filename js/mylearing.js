const loadMyEnroledCourse = ()=>{
    const user = localStorage.getItem('user_id')

    fetch(url+`course/enrol/${user}/`)
    .then(r=>r.json())
    .then(d=>displayMyCourses(d))
    .catch(err=>console.log(err))
}

const displayMyCourses = (courses) => {
    const table_container = document.getElementById('table_container')
    const n = courses.data.length;
    console.log(courses)
    for(let i=0;i<n;i++){
        const div = document.createElement('div')
        div.classList.add('d-flex','border-bottom','py-2','gap-2')
        const date = new Date(courses?.data[i]?.date)
        div.innerHTML = `
                <div class="fw-bold col-1">${i+1}.</div>
                <div class="col-5"><a class="fw-bold" style="text-decoration:none" href="detailsView.html?id=${courses.data[i]?.enrol_course}">${courses?.course_details[i]?.title}</a></div>
                <div class="d-none d-md-block col-2">${courses?.course_details[i]?.price} $</div>
                <div class="d-none d-md-block col-2">${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
                
                <div class="">
                    <button class="btn btn-danger d-block w-100" onclick="hangleDelete(${courses?.data[i]?.id})">Unenrol</button>
                </div>
        `
        table_container.append(div)
    }
}

const hangleDelete =(id)=>{
    const unenroll = window.confirm('Are you sure to unenroll from this course?')
    if(unenroll===true){

    fetch(url+`course/enrol_unenroled/${id}/`,{
        method:'DELETE'
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        if(d['success']){
            window.location.reload()
        }
    })
    .catch(err=>console.log(err))
    }
}

loadMyEnroledCourse()