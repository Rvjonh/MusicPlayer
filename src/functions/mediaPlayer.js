import songs from "/src/functions/data.js";
import * as animationFrame from "/src/functions/animationPlaying.js";
import loadSongs from "/src/functions/loadSongs.js";
import * as animationMusicMove from "/src/functions/animationMusicMove.js";

let data = [...songs];


export let audioSong = document.getElementById("audio-song");
//Volume predefined in the media-player....
audioSong.volume = 1;//[ 0 , 1 ];

let imgSong = document.getElementById("img-song");
let titleSong = document.getElementById("title-song");
let authorSong = document.getElementById("author-song");

export let buttonPlay = document.getElementById("play");
let playImg = document.getElementById("play-button");
let pauseImg = document.getElementById("pause-button");

export let nextButton = document.getElementById("next");
export let previousButton = document.getElementById("previous");

let beginTime = document.getElementById("begin-time");
let endTime = document.getElementById("end-time");

let displayTime = document.getElementById("display-time");
let barContainer = document.getElementById("container-progress");
let barProgres = document.getElementById("progress");
let barProgresBuffered = document.getElementById("progress-downloaded");

export let buttonVolume = document.getElementById("volume");
let volubleButton = document.getElementById("voluble-img");
let muteButton = document.getElementById("mute-img");

let controlVolume = document.getElementById("control-volume");

let repeatOnce = false;
export let repeatButton = document.getElementById("repeat");
let randomPlaying = false;
export let randomButton = document.getElementById("random");

//-------------------To play the song---------------------
buttonPlay.addEventListener("click", handleChangeImg);

function handleChangeImg() {
	playImg.classList.toggle("active");
	pauseImg.classList.toggle("active");
}
//----------------------------------------------------
export async function handlePlaySong(song) {
	audioSong.src = await data[parseInt(song)].route;
	let audio = audioSong.play();

	if (audio !== undefined) {
		audio
			.then((_) => {
				// Automatic playback started!
				// Show playing UI.
				// We can now safely pause video...
				audioSong.id = song;
				barProgresBuffered.style.width = "0%";
				
				handlePutPlayImg();
				updateSongInformation(data[song]);
				//in animationPlaying.js
				animationFrame.handleAnimationPlaying(song);
				animationMusicMove.desactivateAnimationMusicMove();
				animationMusicMove.activateAnimationMusicMove();

				endTime.textContent = changeSeconds(audioSong.duration);
			})
			.catch((error) => {
				// Auto-play was prevented
				// Show paused UI.
				console.log("There was an error loading the song ... wait, please.");
			});
	}
}
function handlePutPlayImg() {
	pauseImg.classList.add("active");
	playImg.classList.remove("active");
}
function updateSongInformation(item) {
	imgSong.src = item.cover;
	titleSong.textContent = item.name;
	authorSong.textContent = item.author;
}

//when ends...
audioSong.addEventListener("ended", handleEndSong);

function handleEndSong() {
	updateTimeMark("00:00");
	handleChangeImg();

	if (repeatOnce) {
		handlePlaySong(audioSong.id);
		handleRepeatSong();
		repeatOnce = false;
	} else {
		handleNextSong();
	}

	animationFrame.desactivateAnimationBlocks();
	animationMusicMove.desactivateAnimationMusicMove();
}
//-----------------To next Song------------------------
nextButton.addEventListener("click", handleNextSong);

function handleNextSong() {
	let numberSong = parseInt(audioSong.id) + 1;
	
	if (numberSong <= data.length - 1) {
		handlePlaySong(numberSong);
	}
}
//-----------------To previous Song--------------------
previousButton.addEventListener("click", handlePreviousSong);

function handlePreviousSong() {
	let numberSong = parseInt(audioSong.id) - 1;
	
	if (numberSong >= 0) {
		handlePlaySong(numberSong);
	}
}

//-----------------To pause the song ------------------
buttonPlay.addEventListener("click", handleStopSong);

function handleStopSong() {
	if (!audioSong.paused) {
		audioSong.pause();
		animationFrame.desactivateAnimationBlocks();
		animationMusicMove.desactivateAnimationMusicMove();
	} else {
		audioSong.play();
		animationFrame.activeAnimationBlocks();
		animationMusicMove.activateAnimationMusicMove();
	}
}
//---------------To check buffered time----------------
audioSong.addEventListener("progress", handldeBufferedTime);

function handldeBufferedTime(){
	let duration =  audioSong.duration;
    if (duration > 0) {
      	for (let i = 0; i < audioSong.buffered.length; i++) {
            if (audioSong.buffered.start(audioSong.buffered.length - 1 - i) < audioSong.currentTime) {
                barProgresBuffered.style.width = (audioSong.buffered.end(audioSong.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
}
//---------------To check CurrentTime------------------
audioSong.addEventListener("timeupdate", handleCurrentTime);
function handleCurrentTime() {
	let currentTime = (audioSong.currentTime / audioSong.duration) * 100;
	barProgres.style.width = currentTime.toFixed(2) + "%";

	if (currentTime >= 100) {
		barProgres.style.width = 0 + "%";
	}

	updateTimeMark(changeSeconds(audioSong.currentTime));
}

function updateTimeMark(time) {
	beginTime.textContent = time;
}

function changeSeconds(sec) {
	if (sec < 0) {
		return "00:00";
	}

	let hour = 0;
	let min = 0;

	if (sec >= 3600) {
		hour = parseInt(sec / 3600);
		sec = sec - hour * 3600;
	}

	if (sec >= 60) {
		min = parseInt(sec / 60);
		sec = sec - min * 60;
	}

	sec = changeString(parseInt(sec));
	min = changeString(min);

	if (hour > 0) {
		hour = changeString(hour);
		return hour + ":" + min + ":" + sec;
	}
	return min + ":" + sec;
}
function changeString(num) {
	if (num <= 9) {
		return "0" + num;
	}
	return num;
}

barContainer.addEventListener("mousemove", handleShowPosition);

function handleShowPosition(event) {
	setNumberTime(event);
	setPositionTime(event);
}

function setNumberTime(event) {
	let number = event.offsetX / barContainer.clientWidth;

	displayTime.textContent = changeSeconds(parseInt(number.toFixed(2) * audioSong.duration));
}

function setPositionTime(event) {
	let position = event.offsetX;

	if (position >= barContainer.clientWidth - 23.5) {
		position = barContainer.clientWidth - 46;
	} else if (position <= 23.5) {
		position = 0;
	} else {
		position -= 23.5;
	}

	displayTime.style.left = position + "px";
}

barContainer.addEventListener("mouseup", (event) => {
	let number = event.offsetX / barContainer.clientWidth;
	audioSong.currentTime = parseInt(number.toFixed(2) * audioSong.duration);
});
barContainer.addEventListener("mouseenter", () => {
	displayTime.classList.add("active");
});
barContainer.addEventListener("click", () => {
	displayTime.classList.add("active");

	/* setTimeout(()=>{
        displayTime.classList.remove("active");
    },750); */
});
barContainer.addEventListener("mouseleave", () => {
	displayTime.classList.remove("active");
});

//---------------To mute and voluble -----------------
buttonVolume.addEventListener("click", addEventMuteVolume);

function addEventMuteVolume() {
	handleChangeVoluble();
	handleChangeImgButtons();
	if(audioSong.volume === 0 || controlVolume.value === 0){
		setVolume(1);
		setRangeVolume(1);
		audioSong.muted = false;
	}
}

function handleChangeImgButtons() {
	if(volubleButton.classList.contains("active")){
		volubleButton.classList.remove("active");
		muteButton.classList.add("active");
	}else{
		volubleButton.classList.add("active");
		muteButton.classList.remove("active");
	}
}
function handleChangeVoluble() {
	
	if(audioSong.muted){
		if(audioSong.volume === 0){
			audioSong.volume = 1;
		}
		setRangeVolume(audioSong.volume);
		audioSong.muted = false;
	}else{
		setRangeVolume(0);
		audioSong.muted = true;
	}

}

///-----------------Bar volume---------------------------
setRangeVolume(audioSong.volume);

controlVolume.addEventListener("change", handleChangeVolume);

function handleChangeVolume(e){

	setVolume(e.target.value);
	setRangeVolume(e.target.value);
	
	if(audioSong.volume === 0){
		audioSong.muted = true;
		volubleButton.classList.remove("active");
		muteButton.classList.add("active");
	}else{
		audioSong.muted = false;
		volubleButton.classList.add("active");
		muteButton.classList.remove("active");
	}
}

function setVolume(vol){
	try{
		audioSong.volume = vol;
	}catch{
		//it can be modified the volume ...
	}
}

function setRangeVolume(value){
	controlVolume.value = value;
	controlVolume.setAttribute("value", value);
}

//{passive:true} improve the scrolling in the wheel event and in the normal scroll  event
// it just improves the performance :)
controlVolume.addEventListener("wheel", handleWheelChangeVolume, {passive:true});

//dispach the wheel even when is on de muted volume button and/or the volume-bar

buttonVolume.addEventListener("wheel", handleWheelChangeVolume, {passive:true});
/* there is a little bug that executes two times by the input and the bar(background), so it's case
	of events ...
	barVolume.addEventListener("wheel", handleWheelChangeVolume, {passive:true});
*/


//this is the worst part of the bar volume, it's need to fixed every point to be
// precise with the numbers in the audio's volume ... for that many parse's
function handleWheelChangeVolume(event){
	if(event.deltaY < 0){
		if(controlVolume.value == 0.0){
			setVolume(0.1);
			audioSong.muted = false;
			volubleButton.classList.add("active");
			muteButton.classList.remove("active");
		}else{
			setVolume(audioSong.volume + 0.1);
		}
		setRangeVolume(parseFloat(controlVolume.value)+ 0.1);
	}else{
		setRangeVolume(controlVolume.value - 0.1);
		setVolume(parseFloat(audioSong.volume).toFixed(1) - 0.1);

		if(controlVolume.value == 0.0){
			volubleButton.classList.remove("active");
			muteButton.classList.add("active");
		}
	}
}

controlVolume.addEventListener("input", handleConstantChangeVolume);

function handleConstantChangeVolume(e){
	setVolume(e.target.value)
	setRangeVolume(e.target.value);
	if(e.target.value != 0.0){
		volubleButton.classList.add("active");
		muteButton.classList.remove("active");
	}else{
		volubleButton.classList.remove("active");
		muteButton.classList.add("active");
	}
}




//-------------------To repeat ---------------------------
repeatButton.addEventListener("click", handleRepeatSong);

function handleRepeatSong() {
	if (!repeatButton.classList.contains("repeat-m")) {
		repeatButton.classList.add("repeat-m");
		audioSong.loop = true;
	} else if (!repeatButton.classList.contains("repeat-1")) {
		repeatButton.classList.add("repeat-1");
		audioSong.loop = false;
		repeatOnce = true;
	} else {
		repeatButton.classList.remove("repeat-m");
		repeatButton.classList.remove("repeat-1");
		audioSong.loop = false;
		repeatOnce = false;
	}
}

//------------------ To random ----------------------------
randomButton.addEventListener("click", handleRandomPlaySongs);

function handleRandomPlaySongs() {
	let songNowPlaying = data[audioSong.id];

	if (!randomPlaying) {
		data = shufful(data);
		data.splice(data.indexOf(songNowPlaying), 1);
		data.unshift(songNowPlaying);
	} else {
		data = [...songs];
	}

	loadSongs(data);
	audioSong.id = data.indexOf(songNowPlaying);
	animationFrame.handleAnimationPlaying(audioSong.id);
	if (audioSong.paused) {
		animationFrame.desactivateAnimationBlocks();
	}

	randomPlaying = !randomPlaying;
	randomButton.classList.toggle("active");
}
function shufful(arr) {
	let currentIndex = arr.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);

		currentIndex--;

		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
	}

	return arr;
}
