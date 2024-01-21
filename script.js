const colorRed = document.querySelector(".red");
const colorBlue = document.querySelector(".blue");
const colorYellow = document.querySelector(".yellow");
const colorGreen = document.querySelector(".green");

const colors = [colorRed, colorBlue, colorYellow, colorGreen];
let colorSequence = [];

let activeBrighter = false;

// this removes the start menu before you start
function startScreen() {
	const startButton = document.getElementById("startButton");
	const startMenu = document.querySelector(".start-screen");
	const container = document.querySelector(".container");

	const handleMouseOut = () => {
		for (const color of colors) {
			color.style.pointerEvents = "none";
		}
	};

	container.addEventListener("mouseout", handleMouseOut);

	startButton.addEventListener("click", () => {
		startMenu.style.display = "none";
		container.style.opacity = "1";
		container.removeEventListener("mouseout", handleMouseOut);
		for (const color of colors) {
			color.style.pointerEvents = "auto";
		}
		activeBrighter = true;

		if (activeBrighter === true) {
			firstColorPick();
			console.log(colorSequence);
		}
	});
}

startScreen();

// gets the first color for colorSequence
function firstColorPick() {
	const min = 0;
	const max = 3;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomColor = colors[randomFirstColor];
	let colorClassName = randomColor.className;
	console.log("The first color is " + colorClassName);
	colorSequence.push(colorClassName);
	switch (colorClassName) {
		case "green":
			colorGreen.classList.add("bright-up-green");
			break;
		case "red":
			colorRed.classList.add("bright-up-red");
			break;
		case "blue":
			colorBlue.classList.add("bright-up-blue");

			break;
		case "yellow":
			colorYellow.classList.add("bright-up-yellow");

			break;
		default:
			break;
	}
}

/*
if person gets the first color correct this function actives to add another color to colorSequence array
*/
function pickColorRandomly() {}
