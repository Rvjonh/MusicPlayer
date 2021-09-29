export default addEventBarVolumeAppears;

let buttonVolume = document.getElementById("volume");
let barVolume = document.getElementById("volume-bar");

// the stylies are in _media-player.scss in line 220 approximately
// an example is in the end of this file ...
// it's done in this way to detect the if show the bar in cellphones or not ...

function addEventBarVolumeAppears(){

    // add condition that when is not a cellphone add this methods ...
    // the idea is to preven the show the bar of volume in phones ...
    // because the volume in cellphones is changed with the buttons normally ...


    //by the way
    /*
        A page or script is accessing at least one of navigator.userAgent, navigator.appVersion, 
        and navigator.platform. In a future version of Chrome, the amount of information available
        in the User Agent string will be reduced.

        To fix this issue, replace the usage of navigator.userAgent, navigator.appVersion, 
        and navigator.platform with feature detection, progressive enhancement, or migrate to 
        navigator.userAgentData.
    */

    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgentData) ) {
        /* console.log("It is NOT a mobile ... "); */
        buttonVolume.addEventListener("mouseenter", handleShowBarVolume);
        barVolume.addEventListener("mouseenter", handleShowBarVolume);
        

        buttonVolume.addEventListener("mouseleave", handleHideBarVolume);
        barVolume.addEventListener("mouseleave", handleHideBarVolume);
    }
    
}

function handleShowBarVolume(){
    barVolume.style.display= "flex"
    barVolume.classList.add("animation-appear-volume-bar");
}

function handleHideBarVolume(){
    barVolume.style.display= "none"
    barVolume.classList.remove("animation-appear-volume-bar");
}

/*

.volume.animation-appear-volume-bar volume-bar {
    display: flex;
    animation: 0.25s appear-volume-bar forwards;
}
.animation-appear-volume-bar{
    display: flex;
    animation: 0.25s appear-volume-bar forwards;
}
@keyframes appear-volume-bar {
    from {
        opacity: 0.2;
    }
    to {
        opacity: 1;
    }
}

*/