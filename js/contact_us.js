const handleContactUs=(event)=>{
    event.preventDefault()
    fromData = new FormData(event.target)

    fetch(url+'contact_us/',{
        method:'post',
        body:fromData
    })
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('message_box').innerHTML=''
        document.getElementById('message_box').innerHTML=`
            <div class="border rounded bg-info mb-3">
                <p class="h4 fw-bold text-center">${data.message}.<br>Thank You.</p>
            </div>
        `
        console.log(data)
        event.target.reset()
    })
}