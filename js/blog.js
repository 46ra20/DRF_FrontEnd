
const handleBlog=()=>{
    document.getElementById('blog_loading_spin').classList.replace('d-none','d-flex')
    const blogs_container = document.getElementById('blogs_container')
    fetch(url+`course/public_all/all/`)
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        const div = document.createElement('div')
        div.classList.add('d-flex','flex-wrap','my-4')

        data.forEach(element => {
            const cDiv = document.createElement('div')
            cDiv.classList.add('col-12','col-lg-6','p-2')
             const date = new Date(element?.date);

            cDiv.innerHTML=`
                <div class="card mb-3">
                <img src="${element.image}" class="card-img-top img-fluid" style="height:250px" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><a href="">${element.title}</a></h5>
                    <p class="card-text">${element.description.slice(0,100)}</p>
                    <p class="card-text"><small class="text-muted">Last updated ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</small></p>
                </div>
                </div>
            `
            div.append(cDiv)
        });
        blogs_container.append(div)
        document.getElementById('blog_loading_spin').classList.replace('d-flex','d-none')

    })
    .catch(err=>console.log(err))
}


handleBlog()