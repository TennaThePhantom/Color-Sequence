// global Variables
const colorRed = document.querySelector(".red");
const colorBlue = document.querySelector(".blue");
const colorYellow = document.querySelector(".yellow");
const colorGreen = document.querySelector(".green");

const colors = [colorRed, colorBlue, colorYellow, colorGreen];
let colorSequence = [];
let userChoice = [];
let activeGame = false;

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

		// starts game(for now)
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
				console.log("User Pick Green");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "red") {
				console.log("User Pick Red");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "blue") {
				console.log("User Pick Blue");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "yellow") {
				console.log("User Pick Yellow");
				userChoice.push(userColor);
				console.log(userChoice);
			} else {
				console.log("Error");
			}
			if (userChoice[0] == colorSequence[0]) {
				generateMoreColors = true;
				pickColorRandomly(generateMoreColors);
			} else {
				generateMoreColors = false;
				pickColorRandomly(generateMoreColors);
			}
		});
	}
}

// gets the first color for colorSequence
function firstColorPick() {
	const min = 0;
	const max = 1;
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
function pickColorRandomly(generateMoreColors) {
	colorDelay = 2500;
	colorDelayMultiplier = 1;
	pickAnotherColor = false;
	previousColor = null;
	previousColorCount = 0;
	colorCount = 1;
	if (generateMoreColors === true) {
		if (pickAnotherColor === false) {
			colorPicker();
			pickAnotherColor = true;
			console.log(colorSequence);
		}
		if (pickAnotherColor === true) {
			for (const color of colorSequence) {
				setTimeout(() => {
					console.log(colorCount);
					console.log("The color is " + color);
					if (color === previousColor) {
						previousColor = true;
						previousColorCount += 1;
						activeColor(color, previousColor, previousColorCount);
					} else {
						previousColor = false;
						activeColor(color, previousColor, previousColorCount);
						playRandomAudio();
					}
					previousColor = color;
					colorCount += 1;
				}, 2500 * colorDelayMultiplier); // loop through each color with delay
				colorDelayMultiplier++;
			}
		}
	} else {
		console.log("Game Over");
	}
}

// This will continue picking colors randomly
function colorPicker() {
	const min = 0;
	const max = 1;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomColor = colors[randomFirstColor];
	let colorClassName = randomColor.className;
	console.log("The color that was picked is " + colorClassName);
	colorSequence.push(colorClassName);
}

function activeColor(color, previousColor, previousColorCount) {
	const colorName = color;
	if (previousColor === false) {
		switch (colorName) {
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
	if (previousColor === true) {
		// working
		const previousColorName = colorName;
		const newColorName = `${previousColorName}${previousColorCount}`;
		const lastColorIndex = colorSequence.length - 1;

		switch (colorName) {
			case "red":
			case "green":
			case "yellow":
			case "blue":
				colorSequence[lastColorIndex] = newColorName;
				console.log("The new colorSequence Array " + colorSequence);
				break;
			default:
				break;
		}
		if (
			colorSequence[lastColorIndex] === `red${previousColorCount}` ||
			colorSequence[lastColorIndex] === `green${previousColorCount}` ||
			colorSequence[lastColorIndex] === `yellow${previousColorCount}` ||
			colorSequence[lastColorIndex] === `blue${previousColorCount}`
		) {
			console.log("checking for last color with number works " + newColorName);
		}
	}
}

startScreen();
