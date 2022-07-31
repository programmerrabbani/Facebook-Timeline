document.title = ' Facebook App ';

// get elements

const post_form = document.getElementById('post_form');
const update_form = document.getElementById('update_form');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all_post');




// get all data
const getAllPosts = () =>{

    let posts = readeLSData('fb_post');

    let list = ' ';

    if ( !posts ) {
      
      all_post.innerHTML = `<div class="card"><div class="card-body shadow-sm text-center">No Posts Found</div></div>`
      return false;

    } 
    posts.reverse().map( (data ) => {

        list +=`
        
            <div class="fb_timeline my-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="post_augth">
                <div class="user_info">
                  <a href="#"><img src="${data.aphoto}" alt=""></a>
                  <div class="user_details">
                    <span>${data.aname}</span>
                    <span>2 h.<i class="fa-solid fa-earth-americas"></i></span>
                  </div>
                </div>
                <div class="dropdown">
                   <a class=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                   <i class="fa-solid fa-ellipsis"></i>
                    </a>

                   <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <li><a class="dropdown-item edit_post" href="#post_edit_modal" data-bs-toggle="modal" post_id=${data.id} >Edit</a></li>
                       <li><a class="dropdown-item delete_post" post_id=${data.id} href="#">Delete</a></li>
                    </ul>
                    </div>
              </div>
              <div class="post_content my-3">
                <p>${data.pcontent}</p>
              </div>
            </div>
            
            ${data.pphoto ? '<img src="'+data.pphoto+'" alt="">' : ''}
          </div>
         </div>
        
        
        
        
        `;

    });

    all_post.innerHTML = list;

}

getAllPosts();

// post_form submit

post_form.onsubmit = ( e ) =>{ 

    e.preventDefault();

    const form_data = new FormData(e.target);

    const postData = Object.fromEntries(form_data.entries());

    const { aname , aphoto , pcontent , pphoto } = Object.fromEntries(form_data.entries());


    // create a random id

    const randid = Math.floor(Math.random() * 1000000) +'_'+ Date.now();


    // validation

    if ( !aname || !aphoto || !pcontent ) {
        
        msg.innerHTML = setAlert(' All Fields Are Required ');

    } else {
        
        createLSData( 'fb_post' , { ...postData , id: randid } );

        msg.innerHTML = ' ' ;
        e.target.reset();
        getAllPosts();

    }

}

// data delete & edit

all_post.onclick = (e) =>{

  e.preventDefault();

  if (e.target.classList.contains('delete_post')) {
    
    const postid = e.target.getAttribute('post_id');

    const posts = readeLSData('fb_post');

    const delete_data = posts.filter(data => data.id !==postid);

    updateLSData('fb_post', delete_data);

    getAllPosts();

  } else if (e.target.classList.contains('edit_post')) {
    
    const postid = e.target.getAttribute('post_id');

    const posts = readeLSData('fb_post');

    const edit_data = posts.findIndex(data => data.id == postid);

    const { aname , aphoto , pcontent , pphoto , id } = posts[edit_data];


    update_form.innerHTML = `
    
    
                <div class="my-3">
              <label for="">Augth Name</label>
              <input name="aname" type="text" value="${aname}" class="form-control">
              <input name="id" type="hidden" value="${id}" class="form-control">
            </div>
            <div class="my-3">
              <label for="">Augth Photo</label>
              <input name="aphoto" type="text" value="${aphoto}" class="form-control">
            </div>
            <div class="my-3">
              <label for="">Post Content</label>
              <textarea name="pcontent" class="form-control">${pcontent}</textarea>
            </div>
            <div class="my-3">
              <label for="">Post Photo</label>
              <input name="pphoto" type="text" value="${pphoto}" class="form-control">
            </div>
            <div class="my-3">
              <input type="submit" value="Update Now" class="btn btn-primary w-100">
            </div>
    
    
    
    
    `;


  }

}

// update form onsubmit

update_form.onsubmit = (e) =>{

  e.preventDefault();

  const form_data = new FormData(e.target);

  const { aname , aphoto , pcontent , pphoto , id } = Object.fromEntries(form_data.entries());

  const allData = readeLSData('fb_post');

  const index = allData.findIndex( data => data.id == id );

     allData[index] = { aname , aphoto , pcontent , pphoto , id };

     updateLSData('fb_post' , allData);

     getAllPosts();

}