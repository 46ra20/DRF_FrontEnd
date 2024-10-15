// alert('hello')
const AllloadCourses = () =>{
    console.log('hell0')
    document.getElementById('all_course_loading_spin').classList.replace('d-none','d-flex');

    fetch(url+`course/public_all/all/`)
    .then(r=>r.json())
    .then(data=>{
        console.log(data)

        viewCourses(data)
        // handlePagination(data.next,data.previous,data.count)
    })
    .catch(err=>console.log(err))
}

const viewCourses=(courses)=>{
    const parent = document.getElementById('load_courses')
    document.getElementById('all_course_loading_spin').classList.replace('d-flex','d-none');

    parent.innerHTML=''
    if(courses.length==0){
        parent.innerHTML=`
            <div class="d-flex justify-content-center text-center mx-auto">
                <img src="image/nodata.png" />
            </div>
        `
    }
    courses.forEach(course => {
        const div = document.createElement('div')
        div.classList.add('col-sm-11', 'col-md-4', 'col-lg-3')

        div.innerHTML=
        `<div class='m-2 cardDegin border bg-white'>
            <img src="
            ${course['image']?
                `${course.image}`
                :
                './image/dummy_image_for_book.png'
            
            } "
                class="img-fluid" 
                alt=""
            >


            
            <div class="p-4">
                <p class="fw-bold m-0" style="font-size:16px">${course?.title.slice(0,40)}</p>
                <p class="m-0">${course?.description.slice(0,60)} <a href="" class="link-offset-2 link-underline link-underline-opacity-0">...</a></p>
                <p class="my-1">Price: ${course?.price}$</p>
                <p class="m-0">Course Duration: ${course?.course_duration} ${course.course_duration>1?"Hours":"Hour"}</p>
                <p class="my-1">Department: ${course?.department}</p>
                <a class="btn btn-warning shadow card_btn" href="detailsView.html?id=${course?.id}">Details</a>
            </div>
        </div>
        `
        parent.append(div)
    });
}

const CategoryView = ()=>{
    fetch(url+'course/category/')
    .then(r=>r.json())
    .then(d=>{
        // console.log(d)
        const category_container = document.getElementById('category_container')
        d.forEach(element => {
            const li = document.createElement('li')
            li.classList.add('dropdown-item')
            li.style=('cursor:pointer;')
            li.onclick=()=>{handleFilter(element.id)}
            li.innerText=`${element.category}`
            category_container.append(li)
        });
    })
    .catch(err=>console.log(err))

}


const handleFilter=(id)=>{
    document.getElementById('all_course_loading_spin').classList.replace('d-none','d-flex');

    fetch(url+`course/get_by_dep/${id}/`)
    .then(r=>r.json())
    .then(d=>{
        viewCourses(d)
    })
    .catch(err=>console.log(err))

}


const handlePagination=(next,previous,count)=>{
    console.log(next,previous,count)
    const page_pagination = document.getElementById('page_pagination')
    let pageNo = parseInt(count/9)
    if(count%5 !=0 ){
        pageNo+=1
    }

    page_pagination.innerHTML=`
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" ${previous?'':'disable'}>
                <button class="page-link ${previous?'':'disabled'}" onclick="AllloadCourses('${previous}')" aria-label="Previous" ${previous?'':'disabled'}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <div class="d-flex" id="load_page_no"></div>
              <li class="page-item">
                <button class="page-link ${next?'':'disabled'}" onclick="AllloadCourses('${next}')" aria-label="Next" ${next?'':'disabled'}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
        </nav>
    `
    function Test(){
        const load_page_no = document.getElementById('load_page_no')
        for(let i=1;i<=pageNo;i++){
            const li = document.createElement('li')
            li.classList.add('page-item')
            li.innerHTML=`<button class="page-link" style="border-radius: 0px;" onclick="AllloadCourses('${url}course/authentic/course/public_all/all/?page_no=${i}')">${i}</button>`
            load_page_no.appendChild(li)
        }
    }
    Test()
}
// handlePagination()
CategoryView()
AllloadCourses()
