const colorRed = document.querySelector(".red");
const colorBlue = document.querySelector(".blue");
const colorYellow = document.querySelector(".yellow");
const colorGreen = document.querySelector(".green");

const colors = [colorRed, colorBlue, colorYellow, colorGreen];
let colorSequence = [];
let userChoice = [];

const audiosList = [
	"Sounds-effects/Beap-sound1.mp3",
	"Sounds-effects/Beap-sound2.mp3",
	"Sounds-effects/Beap-sound3.mp3",
	"Sounds-effects/Beap-sound4.mp3",
	"Sounds-effects/Beap-sound5.mp3",
	"Sounds-effects/Beap-sound6.mp3",
];

const createNewAudio = (audioPath) => {
	return new Audio(audioPath);
};

const playAudio = (audio) => audio.play();

function getRandomAudio() {
	const randomIndex = Math.floor(Math.random() * audiosList.length);
	return audiosList[randomIndex];
}

function playRandomAudio() {
	const randomAudioPath = getRandomAudio();
	const audio = createNewAudio(randomAudioPath);
	playAudio(audio);
}

// disables hover effect for a certain time

function disableHoverEffect(timer) {
	for (const color of colors) {
		color.style.pointerEvents = "none";
	}

	setTimeout(() => {
		for (const color of colors) {
			color.style.pointerEvents = "auto";
		}
	}, timer);
}

let activeGame = false;

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
		activeGame = true;

		if (activeGame === true) {
			disableHoverEffect(3000);
			setTimeout(() => {
				playRandomAudio();
				firstColorPick();
				firstUserClick();
				console.log(colorSequence);
			}, 1000);
		}
	});
}

// the first choice of user to see if game continues or not
function firstUserClick() {
	for (const color of colors) {
		color.addEventListener("click", (click) => {
			const userColor = click.target.className;
			if (userColor === "green") {
				console.log("green");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "red") {
				console.log("red");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "blue") {
				console.log("blue");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "yellow") {
				console.log("blue");
				userChoice.push(userColor);
				console.log(userChoice);
			} else {
				console.log("Error");
			}
		});
	}
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
			setTimeout(() => {
				colorGreen.classList.remove("bright-up-green");
			}, 2500);
			break;
		case "red":
			colorRed.classList.add("bright-up-red");
			setTimeout(() => {
				colorRed.classList.remove("bright-up-red");
			}, 2500);
			break;
		case "blue":
			colorBlue.classList.add("bright-up-blue");
			setTimeout(() => {
				colorBlue.classList.remove("bright-up-blue");
			}, 2500);

			break;
		case "yellow":
			colorYellow.classList.add("bright-up-yellow");
			setTimeout(() => {
				colorYellow.classList.remove("bright-up-yellow");
			}, 2500);

			break;
		default:
			break;
	}
}

/*
if person gets the first color correct this function actives to add another color to colorSequence array
*/
function pickColorRandomly() {}
