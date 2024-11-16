const MenuItem = ()=>{
    const menu_item = document.getElementById('menu_item')
    const menu_item_mobile = document.getElementById('menu_item_mobile')
    const menu_items = `
        <li  class="nav-item dashboard_li" onclick="loadAddCoursePage(event)"><i class="fa-solid fa-plus"></i> Add Course</li>
          <li class="nav-item dashboard_li" onclick="loadMyCourses(event)"><i class="fa-brands fa-discourse"></i> My Courses</li>
          <li class="nav-item dashboard_li" onclick="loadMyStudent(event)"><i class="fa-solid fa-graduation-cap"></i> My Students</li>
          <li class="nav-item dashboard_li" onclick="loadEnrolledCourses(event)"><i class="fa-solid fa-money-bill"></i> Enrolled Courses</li>
          <li class="nav-item dashboard_li" onclick="loadMostFavoriteCourses(event)"><i class="fa-solid fa-heart"></i> Most Favorite Courses</li>
          <li class="nav-item dashboard_li" onclick="loadTotalEaring(event) "><i class="fa-solid fa-circle-exclamation"></i> Total Earning</li>
          <li class="nav-item dashboard_li" onclick="loadUnenrolledCourse(event)"><i class="fa-solid fa-circle-xmark"></i> Unenrolled Courses</li>
    `
    menu_item.innerHTML=menu_items
    menu_item_mobile.innerHTML=menu_items
}
MenuItem()