//Script Mars Rover

console.log("program start");

const randomStart = () => {
    const randomRow = getRandomNumber(rowNumber);
    const randomColumn = getRandomNumber(columnNumber);
    return `${randomRow}-${randomColumn}`;
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
}


const roverEmoji = '\u{1F6F8}';
const heightInputField = document.querySelector("#height-input");
const widthInputField = document.querySelector("#width-input");
const startButton = document.querySelector("#start-button");
const fieldContainer = document.querySelector("#field-container");
let rowNumber;
let columnNumber;
let roverCoordinates = "1-2";

console.log(randomStart());

const placeRover = (coordinate) => {
    const position = document.getElementById(coordinate);
    position.innerText = roverEmoji;
}

const createField = () => {
    fieldContainer.style.display = "block";
    fieldContainer.replaceChildren();
    console.log("start button pushed");
    
    rowNumber = isNaN(parseInt(heightInputField.value)) ? 5 : parseInt(heightInputField.value);
    columnNumber = isNaN(parseInt(widthInputField.value)) ? 8 : parseInt(widthInputField.value);
    
    for (let i = 1; i <= rowNumber; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for (let j = 1; j <= columnNumber; j++) {
            const column = document.createElement("div");
            column.setAttribute("id", `${i}-${j}`);
            column.setAttribute("class", "col");
            row.appendChild(column);
        }
        fieldContainer.appendChild(row);
    }
    placeRover(roverCoordinates);
}

const moveRover = (direction) => {
    const parts = roverCoordinates.split("-");
    if (direction === "ArrowRight") {
        if (Number(parts[1]) === columnNumber) {
            console.log("sei al limite destro!");
        }
        else{
            const newPosition = parts[0] + "-" + String(Number(parts[1])+1);
            document.getElementById(roverCoordinates).innerText = "";
            roverCoordinates = newPosition;
            placeRover(roverCoordinates);
        }
    }
    else if (direction === "ArrowLeft") {
        if (Number(parts[1]) === 1) {
            console.log("sei al limite sinistro!");
        }
        else{
            const newPosition = parts[0] + "-" + String(Number(parts[1])-1);
            document.getElementById(roverCoordinates).innerText = "";
            roverCoordinates = newPosition;
            placeRover(roverCoordinates);
        }
    }
    else if (direction === "ArrowUp") {
        if (Number(parts[0]) === 1) {
            console.log("sei al limite superiore!");
        }
        else{
            const newPosition = String(Number(parts[0])-1) + "-" + parts[1];
            console.log(newPosition);
            document.getElementById(roverCoordinates).innerText = "";
            roverCoordinates = newPosition;
            placeRover(roverCoordinates);
        }
    }
    else if (direction === "ArrowDown") {
        if (Number(parts[0]) === rowNumber) {
            console.log("sei al limite inferiore!");
        }
        else{
            const newPosition = String(Number(parts[0])+1) + "-" + parts[1];
            console.log(newPosition);
            document.getElementById(roverCoordinates).innerText = "";
            roverCoordinates = newPosition;
            placeRover(roverCoordinates);
        }
    }
}

startButton.addEventListener("click", createField);
document.addEventListener("keydown", (event) => moveRover(event.key));