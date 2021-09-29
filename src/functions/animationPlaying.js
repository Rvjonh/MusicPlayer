//in the animation ...
let numberBlocks = 7;

//flag to run animation in blocks ...
let animateBlocks = false;
let beginHeight = 0.3 // in em of CSS
let LimitHight = 3; // in em of CSS


export function handleAnimationPlaying(id){
    handleDesactivateAnimation();

    let item = document.getElementById("song-"+id);

    let frame = createFrame();
    
    item.appendChild(frame);

    activeAnimationBlocks();
}

function createFrame(){
    let div = document.createElement("div");
    div.id = "frame-play";


    let img = document.createElement("img");
    img.src = "src\\assets\\extra\\animationPlaying-logo.png";
    img.id = "logo-play";
    
    let figure = createAnimationBlocks();

    div.appendChild(img);
    div.appendChild(figure);

    return div;
}

function createAnimationBlocks(){
    let figure = document.createElement("figure");
    figure.id = "animation-play";
    
    let blocks = [];
    for (let i = 0;i<numberBlocks;i++){
        let item = document.createElement("div");
        item.classList.add("block-animation");

        blocks.push(item);
    }

    for(let block of blocks){
        figure.appendChild(block);
    }

    return figure;
}
//----------------- Quit the animation --------------------
export function handleDesactivateAnimation(){
    let frame = document.getElementById("frame-play");	
	if (frame){
        let song = frame.parentNode;
		song.removeChild(frame);
	}

}

//------------------------To Animate the blocks-------------
export function activeAnimationBlocks(){
    let blockContainer = document.getElementById("animation-play");
    
    animateBlocks = setInterval(()=>{
        for(let i of blockContainer.children){
            let number = beginHeight + Math.floor(Math.random() * LimitHight);
            i.style.height = number+"em";
        }
    },1000/4);
}

//--------------------To Pause animation--------------------

export function desactivateAnimationBlocks(){
    let blockContainer = document.getElementById("animation-play");
    clearInterval(animateBlocks);
    for(let i of blockContainer.children){
        i.style.height = beginHeight + "em";
    }
}