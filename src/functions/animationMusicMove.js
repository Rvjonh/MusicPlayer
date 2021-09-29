let frame =  document.getElementById("frame");

//Goblal elements, do not touch...
let animation;
let columns;


//global loops, one for every column, DO NOT TOUCH!
let upBlocks = [];
let downBlocks = [];


/* specifications */ // touch carefully
// numberColumns >= 0 to show
let numberColumns = 7;

/*
let colors = ["red","red","green"];
let colors = [ "yellow", "orange", "#005500","yellow", "green", "blue"];
let colors = ["#1b4965","#cae9ff","#5fa8d3","#efa00b","#d65108","#591f0a","#8a1c7c","#da4167"];
let colors = ["yellow","rgba(241,249,7,1)","rgba(222,103,91,1)","rgba(240,81,45,1)","blue","rgb(255, 33, 4)"]
*/

// put the same quantity of numberBlocks and Color (in String for CSS);
// let numberBlocks = quantity of colors ...;

let colors = ["#049CCD","#06CC7A","#05E727","#35F801","#96F109","#FAEE00","#F69502","#E15B01","#FE3837"];
let numberBlocks = colors.length > 0? colors.length : 0; 


// time to display a block (show visiable...)
//affected by this, and transition: visibility .25s; in _animationMusicMove.scss
let seg = 100;  //try do not joke with this :P


let flag = (()=>{
    if(numberBlocks > 0 && numberColumns > 0){
        return true
    }
    return false
})();


export function animationMusicMove(){
    if(flag){
        animation = createAnimation();
        columns = createColumns(numberColumns);

        createFrame(animation, columns);

        frame.appendChild(animation);
    }
}

function createAnimation(){
    let div = document.createElement("div");
    div.className = "back-frame";
    
    return div;
}

function createColumns(numberColumns){
    let columns = [];

    for(let i = 0; i< numberColumns ; i++){
        columns.push(new createColumn());
    }

    return columns;
}

function createColumn(){
    let column = document.createElement("div");
    column.className = "column";

    let blocks = [];

    for(let i=0; i<numberBlocks ; i++){
        blocks.push(new createBlock(i));
    }
    for(let block of blocks){
        column.appendChild(block);
    }

    return column;
}

function createBlock(i){
    let block =  document.createElement("div");
    block.classList.add("block");
    block.style.backgroundColor = colors[colors.length - i - 1];
    return block;
}

function createFrame(frame, columns){
    for(let column of columns){
        frame.appendChild(column);
    }
}




function upColumn(item){
    let num = Math.floor(Math.random() * numberBlocks);
    let index = 0;

    upBlocks[item] = setInterval(()=>{
        try{
            columns[item].children[numberBlocks - 1 - index].classList.add("block-transparency");
        }catch{
            clearInterval(upBlocks[item]);
        }

        if(index>=num){
            clearInterval(upBlocks[item]);
            downColumn(item, num);
            
        }
        index++;
    },seg);
}

function downColumn(item, num){

    let index = numberBlocks - 1 - num;

    downBlocks[item] = setInterval(()=>{
        try{
            columns[item].children[index].classList.remove("block-transparency");
        }catch{
            clearInterval(downBlocks[item]);
        }

        index++;
        if(index >= numberBlocks){
            clearInterval(downBlocks[item]);
            upColumn(item);
        }   
    },seg);
}


export function activateAnimationMusicMove(){
    if(flag){
        for(let i=0  ; i<columns.length ; i++){
            upColumn(i);
        }
    }
}

export function desactivateAnimationMusicMove(){  
    if(flag){
        for(let i=0 ; i<columns.length ; i++){
            clearInterval(upBlocks[i]);
            clearInterval(downBlocks[i]);
    
            for(let j=0 ; j<columns[i].children.length ; j++){
                columns[i].children[j].classList.remove("block-transparency");
            }
        }
    }
}