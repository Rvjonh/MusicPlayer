export let buttonFullScreen = document.getElementById("full-screen");
let panel = document.getElementById("panel-controls");

let btnOpen = document.getElementById("open-fullscreen");
let btnClose = document.getElementById("close-fullscreen");

let frame = document.getElementById("frame");
let timeLabels = document.getElementById("time-song");
let adicionalControls = document.getElementById("aditional-controls");



export function addEventFullScreen(){
    
    buttonFullScreen.addEventListener("click", handleChangeFrame);

}

function handleChangeFrame(){
    btnOpen.classList.toggle("active");
    btnClose.classList.toggle("active");
    
    panel.classList.toggle("expanded-media-player");
    
    frame.classList.toggle("active");
    timeLabels.classList.toggle("active")
    adicionalControls.classList.toggle("active");
}

export function handleCloseFrame(){
    btnOpen.classList.add("active");
    btnClose.classList.remove("active");
    
    panel.classList.remove("expanded-media-player");
    
    frame.classList.remove("active");
    timeLabels.classList.remove("active")
    adicionalControls.classList.remove("active");
}