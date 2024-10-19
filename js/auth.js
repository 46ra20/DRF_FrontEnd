const loading_spin=document.getElementById('loading_spin')
const handleLogin = (e)=>{
    e.preventDefault()
    // loading_spin.classList.remove('d-none')
    loading_spin.classList.replace('d-none','d-inline-block')
    const username = get_value('username')
    const password=get_value('password')
    
        fetch(url+"account/login/",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({'username':username,'password':password})
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            if(data?.error){
                loading_spin.classList.replace('d-inline-block','d-none')
                message_shoe("Wrong Password",'bg-danger')

            }
            getAuthDetails(data['user_id'])
            // window.location.reload()
            localStorage.setItem('token',data['token'])
            localStorage.setItem('user_id',data['user_id'])
            setTimeout(5000)
            if(data['token'] && data['user_id']){

                window.location.href='index.html'
            }

        })
        .catch(error=>{
            loading_spin.classList.replace('d-inline-block','d-none')
            message_shoe('User name or password is Invalid','bg-danger')
        })
}

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


const handleRegistration=(e)=>{
    e.preventDefault()
    loading_spin.classList.replace('d-none','d-inline-block')

    const username=get_value('username')
    const first_name = get_value('first_name')
    const last_name = get_value('last_name')
    const email=get_value('email')
    const password=get_value('password')
    const con_password = get_value('con_password')

    const profile_img=image_url
    const image = profile_img
    const formatData = new FormData()

    


    const option_ = document.getElementsByName('inlineRadioOptions')
    console.log(option_)
    let select_option = 'STUDENT'
    option_.forEach(item=>{
        if(item.checked){
            select_option=item.value
        }
    })

    formatData.append('username',username)
    formatData.append('first_name',first_name)
    formatData.append('last_name',last_name)
    formatData.append('email',email)
    formatData.append('password',password)
    formatData.append('confirm_password',con_password)
    formatData.append('account_type',select_option)
    formatData.append('image',image)

    

    fetch(url+'account/registration/',{
        method:'POST',
        // headers:{
        //     "Content-Type": "multipart/form-data",
        // },
        body:formatData
    })
    .then(r=>r.json())
    .then(d=>{
        if(d=='Done'){
            
            const message='Please verify your email...'
            message_shoe(message,'bg-white')
            document.getElementById('singup_form').reset();
            window.location.href='verifyEmail.html'
        }
        else if(d=='Sorry'){
            loading_spin.classList.replace('d-inline-block','d-none')

            const message ='Something wrong please try agin..'
            message_shoe(message,'bg-danger')

        }
        else{
            loading_spin.classList.replace('d-inline-block','d-none')
            message_shoe(d.error,'bg-danger')
        }
    })
    .catch(error=>{
        loading_spin.classList.replace('d-inline-block','d-none')
        message_shoe(error.message,'bg-danger')
    })
}


const getAuthDetails= (id)=>{
    fetch(url+`account/user_details/${id}/`)
    .then(r=>r.json())
    .then(d=>{
      // console.log(d)
      localStorage.setItem('user',JSON.stringify(d))
      getUserDetails(id)
    })
    .catch(error=>console.log(error))
}



const get_value=(id)=>{
    const input = document.getElementById(id)
    return input.value
}

const message_shoe=(message,type)=>{
    const message_container = document.getElementById('message_container')
    message_container.classList.add("text-center","border","p-2","rounded",type,"d-block")
    message_container.innerText=message
    console.log('from inner function')
}


