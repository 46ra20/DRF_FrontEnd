const loadProfile=()=>{
    const profile_container = document.getElementById('profile_container')
    const user = JSON.parse(localStorage.getItem('user'))
    profile_container.innerHTML=''
    document.getElementById('old-image-show').innerHTML=`
        <img src="${user.image}" class="my-2 rounded" style="height:80px;width:80px"/>
    `
    profile_container.innerHTML=`
        <p class="d-flex justify-content-end"><button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-regular fa-pen-to-square"></i></button></p>

        <img src="${user.image}" class="rounded-circle shadow border" style="height:320px;width:320px"/>
        <div class="mt-3">
            <p class="display-6 fw-bolder">Name: ${user.first_name?user.first_name:'not set'} ${user.last_name?user.last_name:''}</p>
            <p class="fw-bold">User Name: ${user.user_name}</p>
            <p class="fw-bold">Email: ${user.email?user.email:'not set'}</p>
            <p class="text-center"><button class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Change Password</button></p>
        </div>
    `
}

const handleUpdatePassword = (event)=>{
    event.preventDefault()
    console.log(event.target)
    data = new FormData(event.target)
    console.log(data)
}

loadProfile()
