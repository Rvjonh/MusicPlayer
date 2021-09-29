export default window.addEventListener("load", main);

import songs from '/src/functions/data.js';
import loadSongs from '/src/functions/loadSongs.js';

import animationButtons from '/src/functions/animationButtons.js';
import addAnimationFrameImg from '/src/functions/animationFrameImg.js';
import animationBarVolumeAppears from '/src/functions/animationBarVolumeAppears.js';
import {animationMusicMove} from '/src/functions/animationMusicMove.js';
import * as shortcuts from '/src/functions/keyboardShortcuts.js';
import * as fullScreen from '/src/functions/fullscreen.js';

import addExpandEvent from '/src/functions/modals/showModalShortcut.js';
import addExpandEventProfile from '/src/functions/modals/showModalProfile.js';

function main(){

    loadSongs([...songs]);
    animationButtons();
    addAnimationFrameImg();
    animationBarVolumeAppears();
    animationMusicMove();
    shortcuts.addKeyboardShortcuts();
    fullScreen.addEventFullScreen();

    addExpandEvent();
    addExpandEventProfile();
}