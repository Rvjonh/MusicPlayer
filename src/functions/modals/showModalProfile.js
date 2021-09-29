//silpme function to expand a modal...

let modal = document.getElementById("profile-modal");
let buttonModal = document.getElementById("button-profile-modal");
let closeButton = document.getElementById("close-button-profile-modal");


export default function addExpandEventProfile(){

    modal.style.display = "flex";
    buttonModal.addEventListener("click", handleShowModal);
    closeButton.addEventListener("click", handleShowModal);

}

function handleShowModal(e){
    modal.classList.toggle("profile-modal-expanded");
}