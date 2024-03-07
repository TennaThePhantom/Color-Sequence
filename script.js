// global Variables
const colorRed = document.querySelector(".red");
const colorBlue = document.querySelector(".blue");
const colorYellow = document.querySelector(".yellow");
const colorGreen = document.querySelector(".green");

const startButton = document.getElementById("startButton");
const startMenu = document.querySelector(".start-screen");
const container = document.querySelector(".container");
let userFirstColorClicked = false;
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
			}, 1000);
		}
	});
}

// the first choice of user to see if game continues or not
function firstUserClick() {
	const handleFirstClick = (click) => {
		const userColor = click.target.className;
		let userFirstClickedHappen = false;
		if (userFirstClickedHappen === false) {
			if (userColor === "green") {
				userChoice.push(userColor);
			} else if (userColor === "red") {
				userChoice.push(userColor);
			} else if (userColor === "blue") {
				userChoice.push(userColor);
			} else if (userColor === "yellow") {
				userChoice.push(userColor);
			} else {
				console.log("Error");
			}
			colors.forEach((color) => {
				color.removeEventListener("click", handleFirstClick);
			});
			userFirstClickedHappen = true;

			if (userChoice[0] == colorSequence[0]) {
				generateMoreColors = true;
				pickColorRandomly(generateMoreColors);
				userChoice = [];
				setTimeout(() => {
					container.removeEventListener("mouseover", startScreen());
				}, 10);
			} else {
				generateMoreColors = false;
				pickColorRandomly(generateMoreColors);
			}
		}
	};
	for (const color of colors) {
		color.addEventListener("click", handleFirstClick);
	}
}

// gets the first color for colorSequence
function firstColorPick() {
	const min = 0;
	const max = 3;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomColor = colors[randomFirstColor];
	let colorClassName = randomColor.className;
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
	const handleMouseOut = () => {
		for (const color of colors) {
			color.style.pointerEvents = "none";
		}
	};

	let colorDelay = 2500;
	let hoverDelay = 3000;
	if (colorSequence.length < 2) {
		hoverDelay = 6000;
	} else if (colorSequence.length >= 2 && colorSequence <= 5) {
		hoverDelay = 4000;
	} else {
		hoverDelay = 3000;
	}
	let hoverDelayMultiplier = colorSequence.length;
	let colorDelayMultiplier = 1;
	let pickAnotherColor = false;
	let colorCount = 1;
	if (generateMoreColors === true) {
		setTimeout(() => {
			userClickingContinuous();
		}, hoverDelay * hoverDelayMultiplier);
		if (pickAnotherColor === false) {
			container.addEventListener("mouseout", handleMouseOut);
			colorPicker();
			pickAnotherColor = true;
		}
		if (pickAnotherColor === true) {
			for (const color of colorSequence) {
				setTimeout(() => {
					activeColor(color);
					colorCount += 1;
				}, colorDelay * colorDelayMultiplier); // loop through each color with delay
				colorDelayMultiplier++;
			}
		}
	}
}

// This will continue picking colors randomly
function colorPicker() {
	const min = 0;
	const max = 3;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomColor = colors[randomFirstColor];
	let colorClassName = randomColor.className;
	colorSequence.push(colorClassName);
}

// actives whatever color is picked
function activeColor(color) {
	switch (color) {
		case "red":
			playRandomAudio();
			setTimeout(() => {
				colorRed.classList.add("bright-up-red");
			}, 100);
			setTimeout(() => {
				colorRed.classList.remove("bright-up-red");
			}, 2500);
			break;
		case "blue":
			playRandomAudio();
			setTimeout(() => {
				colorBlue.classList.add("bright-up-blue");
			}, 100);
			setTimeout(() => {
				colorBlue.classList.remove("bright-up-blue");
			}, 2500);
			break;
		case "green":
			playRandomAudio();
			setTimeout(() => {
				colorGreen.classList.add("bright-up-green");
			}, 100);
			setTimeout(() => {
				colorGreen.classList.remove("bright-up-blue");
			}, 2500);
			break;
		case "yellow":
			playRandomAudio();
			setTimeout(() => {
				colorYellow.classList.add("bright-up-yellow");
			}, 100);
			setTimeout(() => {
				colorYellow.classList.remove("bright-up-yellow");
			}, 2500);
			break;
		default:
			break;
	}
}

function userClickingContinuous() {
	const handleMouseOut = () => {
		for (const color of colors) {
			color.style.pointerEvents = "auto";
		}
	};

	container.addEventListener("mouseout", handleMouseOut);

	container.addEventListener("click", handleGameClicks);
}

function handleGameClicks(event) {
	const userColor = event.target.className;
	switch (userColor) {
		case "red":
			userChoice.push(userColor);
			checkUserClick();
			break;
		case "green":
			userChoice.push(userColor);
			checkUserClick();
			break;
		case "blue":
			userChoice.push(userColor);
			checkUserClick();
			break;
		case "yellow":
			userChoice.push(userColor);
			checkUserClick();
			break;
		default:
			break;
	}
	continueGame();
}

function checkUserClick() {
	// Iterate over each color clicked by the user
	for (let i = 0; i < userChoice.length; i++) {
		// Check if the user's click matches the color sequence at the corresponding index
		if (userChoice[i] !== colorSequence[i]) {
			return false;
		}
	}
}

function continueGame() {
	if (userChoice.length === colorSequence.length) {
		container.removeEventListener("click", handleGameClicks);
		userChoice = [];
		pickColorRandomly(true);
	}
}
startScreen();
