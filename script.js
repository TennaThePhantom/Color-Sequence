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
				console.log(colorSequence);
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
				console.log("First clicked User Pick Green");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "red") {
				console.log("First clicked User Pick Red");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "blue") {
				console.log("First clicked User Pick Blue");
				userChoice.push(userColor);
				console.log(userChoice);
			} else if (userColor === "yellow") {
				console.log("First clicked User Pick Yellow");
				userChoice.push(userColor);
				console.log(userChoice);
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
	const min = 1;
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
	let colorDelay = 2500;
	let colorDelayMultiplier = 1;
	let pickAnotherColor = false;
	let colorCount = 1;
	if (generateMoreColors === true) {
		setTimeout(() => {
			userClickingContinuous();
		}, 6000);
		if (pickAnotherColor === false) {
			colorPicker();
			colorPicker();
			pickAnotherColor = true;
			console.log(colorSequence);
		}
		if (pickAnotherColor === true) {
			for (const color of colorSequence) {
				setTimeout(() => {
					console.log(colorCount);
					console.log("The color is " + color);
					activeColor(color);
					colorCount += 1;
				}, colorDelay * colorDelayMultiplier); // loop through each color with delay
				colorDelayMultiplier++;
			}
		}
	} else {
		console.log("Game Over"); // will add pop up screen
	}
}

// This will continue picking colors randomly
function colorPicker() {
	const min = 1;
	const max = 1;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomColor = colors[randomFirstColor];
	let colorClassName = randomColor.className;
	console.log("The color that was picked is " + colorClassName);
	colorSequence.push(colorClassName);
}

// actives whatever color is picked
function activeColor(color) {
	switch (color) {
		case "red":
		case "green":
		case "blue":
		case "yellow":
			playRandomAudio();
			setTimeout(() => {
				colorBlue.classList.add(`bright-up-${color}`);
			}, 100);
			setTimeout(() => {
				colorBlue.classList.remove(`bright-up-${color}`);
			}, 2500);
			break;
		default:
			// Handle other cases if needed
			break;
	}
}

// if the user gets pass the first level this happens

// if user gets all the color in correct pattern they go to next level < 1
// if user clicks the wrong color in the pattern game over < 2

function userClickingContinuous() {
	const handleMouseOut = () => {
		for (const color of colors) {
			color.style.pointerEvents = "auto";
		}
	};

	container.addEventListener("mouseout", handleMouseOut);

	for (const color of colors) {
		color.addEventListener("click", (click) => {
			const userColor = click.target.className;
			switch (userColor) {
				case "red":
					console.log("User picked Red");
					userChoice.push(userColor);
					break;
				case "green":
					console.log("User Pick Green");
					userChoice.push(userColor);
					break;
				case "blue":
					userChoice.push(userColor);
					console.log("User pick Blue");
					break;
				case "yellow":
					userChoice.push(userColor);
					console.log("User pick yellow");
					break;
				default:
					break;
			}
			if (colorSequence.length <= userChoice.length) {
				for (
					let colorInArray = 0;
					colorInArray < colorSequence.length;
					colorInArray++
				) {
					if (userChoice[colorInArray] !== colorSequence[colorInArray]) {
						console.log("You clicked the wrong color at the wrong index ");
					}
				}
			}
		});
	}
}

startScreen();
