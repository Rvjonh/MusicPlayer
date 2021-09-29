//animation to make bigger the button when any is clicked ...
let buttons = document.querySelectorAll(".button");

export default function animationButtons() {

	buttons.forEach((button) => {
		button.addEventListener("click", (e) => {
			button.classList.add("animation-make-bigger-button");
			setTimeout(() => {
				button.classList.remove("animation-make-bigger-button");
			}, 1000 / 4);
		});
	});
}

/*
    this is in the _media-player.scss in line 175...
    or close to .button stylies ... for buttons...

.animation-make-bigger-button{
    animation: make-bigger-button .25s;
}
@keyframes make-bigger-button {
    from{
        transform: scale(1);
    }
    to{
        transform: scale(1.5);
    }
}

*/
