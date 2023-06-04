
const imgEle = document.getElementsByClassName('post-iamge');

// for previewing image before posting
imgEle[0]?.addEventListener("change",(e) => {
    frame.src = URL.createObjectURL(e.target.files[0]);
});


// Handling show/hide password readability
pwShowHide = document.querySelectorAll(".eye-icon"),
pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
 
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
          return;
      }
      password.type = "password";
      
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  })
  
})
})   


// Showing/hiding post's comment section

function handleClick(self){
    const post_div_id = document.querySelector('.post-collapse-'+ self.id)
    // console.log('cliecked',post_div_id);
    if(post_div_id.style.display=='none'){
          post_div_id.style.display='block'
    }else{
         post_div_id.style.display='none'
    }
}