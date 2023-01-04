
const imgEle = document.getElementsByClassName('post-iamge');

imgEle[0]?.addEventListener("change",(e) => {
    frame.src = URL.createObjectURL(e.target.files[0]);
    // frame.style.width = '13%';
});