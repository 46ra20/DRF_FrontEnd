const loadCourses = () =>{
    document.getElementById('course_loading_spin').classList.replace('d-none','d-flex')
    fetch(url+'course/public_all/home/')
    .then(r=>r.json())
    .then(data=>{
        // console.log(data)
        viewCourses(data)
        handleBlogView(data)
    })
    .catch(err=>console.log(err))
}


const viewCourses=(courses)=>{
    const parent = document.getElementById('load_courses')
    courses.forEach(course => {
        const div = document.createElement('div')
        div.classList.add('col-sm-11', 'col-md-4', 'col-lg-3')

        div.innerHTML=
        `<div class='m-2 cardDegin border bg-white' style="height: 420px !important;">
            <img src="${course['image']?
                `${course.image}`
                :
                './image/dummy_image_for_book.png'} "
                class="img-fluid" 
                alt=""
            >


            <div class="p-4">
                <p class="fw-bold" style="font-size:16px">${course?.title.slice(0,35)}</p>
                <p class="m-0">${course?.description.slice(0,60)} <a href="" class="link-offset-2 link-underline link-underline-opacity-0">...<small>Read More<small></a></p>
                <!-- <p class="my-1">Price: ${course?.price}$</p>
                <p class="m-0">Course Duration: ${course?.course_duration}</p>
                <p class="my-1">Department: ${course?.department}</p> -->
                <a class="btn btn-warning shadow card_btn" href="detailsView.html?id=${course?.id}">Details</a>
            </div>
        </div>
        `
        parent.append(div)
    });
}

const viewFavoriteCourse=()=>{
    const favorite_course = document.getElementById('favorite_course')
    fetch(url+'course/favorite_course/')
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        data.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('col-12','col-lg-3')
            div.style="cursor:pointer"
            div.addEventListener("click",()=>{
                console.log('hello',element.id)
                window.location.href=`detailsView.html?id=${element.id}`
            })

            div.innerHTML=`
                <div class="m-3 p-2 border rounded shadow custom_effect">
                    <img src='${element.image}' class="img-fluid rounded w-100 d-block" style="height:150px"/>
                    <h5 class="mt-3">${element.title}</h5>
                    <div class="d-flex justify-content-between my-2 fw-semibold">
                        <p class="m-0">${showStar(parseInt(element.ratting/2))} (${parseInt(element.ratting/2)})</p>
                        <p class="m-0">${element.price} $</p>
                    </div>
                </div>
            `
            favorite_course.append(div)
        });
    })
}

const handleBlogView=(courses)=>{
    const blog_container = document.getElementById('blog_container')
    courses.forEach(course => {
        const div = document.createElement('div')
        // div.classList.add('d-flex','border','rounded','g-2','align-items-center','bg-light','shadow','custom_effect')
        // div.classList.add('hover_effect')
        // div.style="max-width: 540px;"
        div.style="cursor:pointer"

        div.innerHTML=`
        <div class="card mb-3 hover_effect bg-white" style="">
            <div class="row g-0">
                <div class="col-md-4 p-2">
                <img src="
                ${course['image']?
                    `${course.image}`
                    :
                    './image/dummy_image_for_book.png'
                
                } " class="w-100 h-100 rounded" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${course?.title.slice(0,40)}</h5>
                    <p class="card-text">${course?.description.slice(0,100)}.....<a class="text-info" href="blog.html">Read More</a></p>
                    <p class="card-text">Department: ${course?.department}</p>
                </div>
                </div>
            </div>
        </div>

        `
        blog_container.appendChild(div)
        
    });

}

const handleShowReview= ()=>{
    const comment_block = document.getElementById('comment_block')

    fetch(url+`course/review/all/`)
    .then(r=>r.json())
    .then(d=>{
        if(d.data.length>0){
            // console.log(d.data)
            showReviews(d.data)
        }
    })
    .catch(err=>console.log(err))
}


const showReviews = (reviews)=>{
    const review_container = document.getElementById('review_container')
    if(reviews.length >0){
        // const blank_div = document.createElement('div')
        // blank_div.innerHTML=`
        //     <div style="height:220px;width:180px" class="d-md-none">
                    
        //     </div>
        // `
        // review_container.append(blank_div)
        reviews.forEach(element => {
            const div = document.createElement('div')
            // div.classList.add('col-lg-1','col-md-2','col-sm-3','mb-2')
            div.classList.add("p-4","bg-light","shadow","rounded","hover_effect",'slide_track')
            div.innerHTML=`
            
            
                <div class="comment_preview">
                    <div class="commenter">
                        <img src="${element.image}/"/>
                        <p class="fw-bold">${element.name}</p>
                        
                    </div>
                    <p class="comment_star">${showStar(element.rating)}</p>
                    <div class="comment_text"><p>${element.review}</p></div>
                </div>
            `
            review_container.append(div)
            document.getElementById('course_loading_spin').classList.replace('d-flex','d-none')

        });
    }
}


const showStar=(star)=>{
    let s = ''
    for(let i=0;i<5;i++){

        if(i<star){s+=`<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`}
        else{
            s+=`<i class="fa-solid fa-star" style="color:#74747461"></i>`
        }
    } 
    return s
}

const showCategory=()=>{
    department_list = ['<i class="fa-solid fa-computer"></i>','<i class="fa-regular fa-lightbulb"></i>','<i class="fa-solid fa-person-military-to-person"></i>','<i class="fa-solid fa-gears"></i>','<i class="fa-solid fa-sitemap"></i>']
    bg_color = ['#ADD8E6','#98FF98','#E6E6FA','#FFFACD','#FFB6C1']
    border_color = ['#00008B','#006400','#4B0082','#8B8000','#8B0000']
    fetch(url+'course/category/')
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        const category_container = document.getElementById('show_all_department')
        const childDiv = document.createElement('div')
        childDiv.classList.add('slide_track')
        let i=0;
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('rounded','p-3','text-center','shadow','m-3','d-block')
            div.style=`height:120px;width:150px;background-color:${bg_color[i]};border:1px solid ${border_color[i]}`
            div.innerHTML=`
                <p class="h1">${department_list[i++]}</p>
                <p class="h5 fw-bold font-white">${element.category}</p>
            `
            childDiv.append(div)
        });
        category_container.append(childDiv)
    })
    .catch(err=>console.log(err))
}

loadCourses()
showCategory()
handleShowReview()
viewFavoriteCourse()
