//animation to move the image when is clicked ...
let imgSong = document.getElementById("img-song");

export default function addAnimationFrameImg(){

    imgSong.addEventListener("click", animationFrameImg);

}

function animationFrameImg(event){
	imgSong.classList.add("frame-img-animation");

    setTimeout(() => {
        imgSong.classList.remove("frame-img-animation");
    }, 1000/3); // equal or equivalent with the animation, 
    // remove just after the animation ends...
}

/*
//for me it's better than the :active
.frame-img-animation{
    animation: frame-img-animation-loop .25s;
}
@keyframes frame-img-animation-loop {
    from{
        cursor: grabbing;
        transform:  scale(1) translate(-1em, .5em);
    }
    36%{
        transform:  scale(1.05) translate(1em, 0em);
    }
    50%{
        transform: scale(1.1)  translate(-1em , -0.5em);
    }
    to{
        transform: scale(1)  translate(0em , 0em);
    }
}


*/