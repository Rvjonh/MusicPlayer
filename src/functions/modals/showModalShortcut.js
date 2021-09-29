//silpme function to expand a modal...

let modal = document.getElementById("shortcuts-modal");
let buttonModal = document.getElementById("button-shortcuts-modal");
let closeButton = document.getElementById("close-button-shortcuts-modal");

export default function addExpandEvent(){

    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgentData) ) {
        modal.style.display = "flex";
        buttonModal.addEventListener("click", handleShowModal);
        closeButton.addEventListener("click", handleShowModal);
    }
}

function handleShowModal(e){
    modal.classList.toggle("shortcut-modal-expanded");
}