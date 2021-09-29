import * as mediaPlayer from '/src/functions/mediaPlayer.js';
import * as shortcuts from '/src/functions/keyboardShortcuts.js';

let containerList = document.getElementById("container-songs");
let mediaPlayerPanel = document.getElementById("panel-controls");

export default function loadSongs(songs) {
	containerList.innerHTML = "";
	let number = 0;

	for (let song of songs) {
		let div = createSongItem(song, number++);
		div.addEventListener("click", playSongEvent);
		//to update the control over the focus index or clasification...
		div.addEventListener("focus", shortcuts.handleFocusSelection);
        div.addEventListener("click", shortcuts.updateFocusOnClick);

		containerList.appendChild(div);
	}
}

function createSongItem(song, number) {
	let div = document.createElement("div");
	div.id = "song-" + number;
	div.className = "song-item";
	div.setAttribute("tabindex", "0");

	let picture = document.createElement("picture");
	picture.className = "song-img";

	let img = document.createElement("img");
	img.src = song.cover;
	img.alt = "Cover of the song "+song.name;

	picture.appendChild(img);
	div.appendChild(picture);

	let divInfo = document.createElement("div");
	divInfo.className = "song-info";

	let h2 = document.createElement("h2");
	h2.textContent = song.name;

	let author = document.createElement("p");
	author.textContent = song.author;

	divInfo.appendChild(h2);
	divInfo.appendChild(author);

	div.appendChild(divInfo);

	return div;
}

function playSongEvent(event) {
	const elementPath = event.path;

	const div = elementPath.find((el) => el.classList.contains("song-item"));

	const idSong = div.id.split("-")[1];

	mediaPlayer.handlePlaySong(parseInt(idSong));
	
	mediaPlayerPanel.classList.add("active-media-player");
}





