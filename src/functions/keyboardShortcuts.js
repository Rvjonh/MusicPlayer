import * as mediaPlayer from '/src/functions/mediaPlayer.js';
import * as fullScreen from '/src/functions/fullscreen.js';

//go navegate through the elements witht the arrow up and down ... check handleSelectionWithArrows
let containerList = document.getElementById("container-songs");
let mediaPlayerPanel = document.getElementById("panel-controls");
let elementFocused; // to control the index with focus...

export function addKeyboardShortcuts(){

    mediaPlayer.audioSong.addEventListener("canplay", ()=>{
        addEventKeyDown();
    })

    document.addEventListener("keydown", handleSelectionWithArrows);
}

function addEventKeyDown(){
    document.addEventListener("keydown", handlePressKey);
}

function removeEventKeyDown(){
    document.removeEventListener("keydown", handlePressKey);
}


function handlePressKey(e){
    // to detect only one press or key down...
    removeEventKeyDown();
    document.addEventListener("keyup", addEventKeyDown);
    let letter = e.key.toLowerCase();
   
    switch(letter){
        case " ":   //Play or Pause the song on turn
            e.preventDefault();
            mediaPlayer.buttonPlay.dispatchEvent(new Event("click"));
            break;
        case "escape":  //Close the full-screen mediaPlayer controls...
            fullScreen.handleCloseFrame();
            break;
        case "a":
            mediaPlayer.randomButton.dispatchEvent(new Event("click"));
            break;
        case "f":   //Put full-screen the mediaPlayer controls...
            fullScreen.buttonFullScreen.dispatchEvent(new Event("click"));
            break;
        case "m":   //Muted the song
            mediaPlayer.buttonVolume.dispatchEvent(new Event("click"));
            break;
        case "n":   //Next Song in the list 
            mediaPlayer.nextButton.dispatchEvent(new Event("click"));
            break;
        case "p":   //Previous song in the list
            mediaPlayer.previousButton.dispatchEvent(new Event("click"));
            break;
        case "r":   //Repeat event
            mediaPlayer.repeatButton.dispatchEvent(new Event("click"));
            break;
        default:
            //console.log("Last pressed ", letter);
    }
}

/*
the idea here is control the selection with the arrows (up and down), the tab keyword, and the mouse
without lose the control,
if the body is selecteced then it goes back how if the first load has happened,
so you can control again with tge arrows (up and down), the tab keyword and the mouse...
*/


export function handleFocusSelection(event){
	event.target.addEventListener("keydown", enterPlaySong);
}

function enterPlaySong(event){	

	if(event.key === "Enter"){
		const idSong = event.target.id.split("-")[1];

		mediaPlayer.handlePlaySong(parseInt(idSong));

        elementFocused = parseInt(idSong);

		mediaPlayerPanel.classList.add("active-media-player");
	}

	event.target.removeEventListener("keydown", enterPlaySong);
}


function handleSelectionWithArrows(event){

    if(event.key === "Tab"){
        if(document.activeElement === document.body){
            elementFocused = 0;
        }else{
            if(parseInt(elementFocused)+1 <= containerList.children.length - 1){
                elementFocused = parseInt(elementFocused)+1;
            }else{
                elementFocused=0;
            }
        }

    }else if(document.activeElement === document.body){

        if(event.key === "ArrowUp"){
            elementFocused = containerList.children.length - 1;
            containerList.children[elementFocused].focus();
        }else if(event.key === "ArrowDown"){
            elementFocused = 0;
            containerList.children[elementFocused].focus();
        }
        

    }else if(event.key === "ArrowUp"){

        if(elementFocused-1 >=0){
            elementFocused--;
        }else{
            elementFocused = containerList.children.length - 1;
        }
        containerList.children[elementFocused].focus();
            
    }else if(event.key === "ArrowDown"){
            
        if(parseInt(elementFocused)+1 <= containerList.children.length - 1){
            elementFocused = parseInt(elementFocused)+1;
        }else{
            elementFocused=0;
        }
        containerList.children[elementFocused].focus();
    }
}

export function updateFocusOnClick(event){
    const elementPath = event.path;

	const div = elementPath.find((el) => el.classList.contains("song-item"));

	const idSong = div.id.split("-")[1];

    elementFocused = parseInt(idSong);
}