let c = 0;

const navBar =()=>{
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    
    let user={}
    if(user_id && token && c==0){
      c++;
      getUserDetails(user_id)
    }
    if(user_id && token){
      user  = JSON.parse(localStorage.getItem('user'))
    }
    
    const navContainer = document.getElementById('navContainer')
    navContainer.innerHTML=''

    navContainer.innerHTML=`
    <nav class="navbar navbar-expand-lg" style="background-color: #FFFFFF;">
      <div class="container-fluid col-11 mx-auto text-white" style="color: white;">
      ${
        user?.account_type=='TEACHER'?`
        <button class="btn btn-light d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><span class="navbar-toggler-icon"></span></button>
        `:`
        <a class="navbar-brand fw-bolder" href="index.html?reload=0">JSRN</a>`
      }
        <a class="d-none d-lg-inline navbar-brand fw-bolder" href="index.html?reload=0">JSRN</a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          
          <img src="${user?.image?`${user.image}`:"./image/JSRN.png"}" class="rounded-circle dropdown-toggle" style="height: 40px;
    width: 40px;
    border: 1px solid orange;">
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active  menu_item fw-bold" aria-current="index.html?reload=0" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active  menu_item fw-bold" aria-current="allcourses.html" href="allcourses.html">All Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active  menu_item fw-bold" aria-current="blog.html" href="blog.html">Blogs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active  menu_item fw-bold" aria-current="contact_us.html" href="contact_us.html">Contact Us</a>
            </li>
          </ul>
          <div class="d-flex  align-items-center">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                ${
                  user&&token&&user_id?
                  ` 
                    <li class="nav-item dropdown">
                    <img src="${user?.image?`${user.image}`:"./image/JSRN.png"}" class="rounded-circle dropdown-toggle" style="height: 40px;
    width: 40px;
    border: 1px solid orange;" alt="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu dropdown-menu-end p-4">
                      <li><a class="dropdown-item fw-bold menu_item" href="profile.html">Profile</a></li>
                      ${
                        user?.account_type=='TEACHER'?
                        `<li><a class="dropdown-item fw-bold menu_item" href="dashboard.html">Dashboard</a></li>
                        `
                        :
                        `
                        <li><a class="dropdown-item fw-bold menu_item" href="myLearing.html">My Learing</a></li>
                        
                        `
                      }
                      <li><a class="dropdown-item btn fw-bold menu_item"  onclick="handleLogout()">Logout</a></li>
                    </ul>
                  </li>
                  `
                  :
                  `
                    <li class="nav-item me-2">
                      <a class="nav-link active text-white btn btn-outline-warning menu_item fw-bolder" aria-current="singup.html" href="singup.html">SingUp</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active text-white btn btn-outline-warning menu_item fw-bolder" aria-current="index.html" href="login.html">Login</a>
                    </li>
                  `

                }
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5>Dashboard Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" style="background-color:#343a40;">
        <ul class="navbar-nav text-white m-3">
          <li  class="nav-item dashboard_li" onclick="loadAddCoursePage(event)"><i class="fa-solid fa-plus"></i> Add Course</li>
          <li class="nav-item dashboard_li" onclick="loadMyCourses(event)"><i class="fa-brands fa-discourse"></i> My Courses</li>
          <li class="nav-item dashboard_li"><i class="fa-solid fa-graduation-cap"></i> My Students</li>
          <li class="nav-item dashboard_li"><i class="fa-solid fa-money-bill"></i> Enrolled Courses</li>
          <li class="nav-item dashboard_li"><i class="fa-solid fa-heart"></i> Most Favorite Courses</li>
          <li class="nav-item dashboard_li"><i class="fa-solid fa-circle-exclamation"></i> Total Earning</li>
          <li class="nav-item dashboard_li"><i class="fa-solid fa-circle-xmark"></i> Unenrolled Courses</li>
        </ul>
      </div>
    </div>
    `
}

const footerLoader=()=>{
  const footer_continer = document.getElementById('footer_continer')
  footer_continer.innerHTML=`
  <div class="justify-content-around align-items-center flex-sm-column flex-lg-row d-lg-flex">
      <div class="d-flex align-items-center flex-column">
        <img src="./image/JSRN.png" class="rounded-circle mb-3" style="height:150px;width:150px"/>
        <p class="fw-bold text-white">
          All right reserved by JSRN School
        </p>
        <p><small class="text-white">Copyright © 2024 JSRN School</small></p>
      </div>
      <div class="">
        <p class="fw-bold text-white text-center border-bottom">Our Service</p>
        <ul class="text-white nav flex-column align-items-center">
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Home Teaching</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Private Tutor</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Tutor</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Service</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Online Class</a> </li>
        </ul>
      </div>
      <div class="">
        <p class="fw-bold text-white text-center border-bottom">Useful Links</p>
        <ul class="text-white nav flex-column align-items-center">
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover " href="">Refund policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Terms and Conditions</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Privacy Policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">App Privacy Policy</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">About us</a> </li>
          <li><a class="text-white mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="">Success Story</a> </li>
        </ul>
      </div>
    </div>
  `
}



const getUserDetails=(id)=>{
    fetch(url+`account/user_details/${id}/`)
    .then(r=>r.json())
    .then(d=>{
      // console.log(d)
      localStorage.setItem('user',JSON.stringify(d))
      navBar()

    })
    .catch(error=>console.log(error))
}


const handleLogout = ()=>{
  fetch(url+'account/logout/',{
      method:'POST'
  })
  .then(r=>r.json())
  .then(d=>{
      if(d){
          window.location.href='index.html'
          localStorage.clear()
      }
      console.log(d)
    }
  )
  .catch(err=>console.log(err))

}


//fixed variable for all pages
// const url='https://drf-online-school-jsrn-getm.vercel.app/'
const url = 'http://127.0.0.1:8000/'
const dashboard_container=document.getElementById('dashboard_container')





let type = true;
const handlePasswordShow = (event,id) =>{
  const pass = document.getElementById(id);
  const eye = event.target;
  type=!type;
  
  if(type){
    pass.type='password';
    eye.src='image/eye-fill.svg';
  }
  else{
    pass.type='text';
    eye.src='image/eye-slash-fill.svg';
  }
}


const showActiveMenu=(event)=>{
    const list = event.target.parentNode.querySelectorAll('.dashboard_li')
    list.forEach(element => {
        if(element==event.target){
          event.target.classList.add('active_menu')
        }
        else{
            element.classList.remove('active_menu')
        }
    });
}



footerLoader()
navBar()