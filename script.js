const colorRed = document.querySelector(".red");
const colorBlue = document.querySelector(".blue");
const colorYellow = document.querySelector(".yellow");
const colorGreen = document.querySelector(".green");

const colors = [colorRed, colorBlue, colorYellow, colorGreen];
let colorSequence = [];


// gets the first color for colorSequence
function firstColorPick() {
	const min = 0;
	const max = 3;
	let randomFirstColor = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomColor = colors[randomFirstColor];
    let colorClassName = randomColor.className;
	console.log("The first color is " + colorClassName);
    colorSequence.push(colorClassName);
}
firstColorPick();

/*
if person gets the first color correct this function actives to add another color to colorSequence array
*/
function pickColorRandomly(){

}
console.log(colorSequence)