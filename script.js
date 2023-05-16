//Script Mars Rover

console.log("program start");
const roverEmoji = '\u{1F6F8}';
const rockEmoji = '\u{26F0}';
const heightInputField = document.querySelector("#height-input");
const widthInputField = document.querySelector("#width-input");
const startButton = document.querySelector("#start-button");
const fieldContainer = document.querySelector("#field-container");
let rowNumber;
let columnNumber;
let roverCoordinates;
let rocksCoordinates = [];

const randomCoordinates = () => {
    const randomRow = getRandomNumber(rowNumber);
    const randomColumn = getRandomNumber(columnNumber);
    return `${randomRow}-${randomColumn}`;
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max)) + 1;
}

const placeItem = (coordinate, itemEmoji) => {
    const position = document.getElementById(coordinate);
    position.innerText = itemEmoji;
}

const placeRocks = () => {
    for (let j = 1; j <= columnNumber; j++) {
        newCoordinate = randomCoordinates();
        while (rocksCoordinates.includes(newCoordinate) || newCoordinate === roverCoordinates) {
            newCoordinate = randomCoordinates();
        }
        rocksCoordinates.push(newCoordinate);
    }
    rocksCoordinates.forEach(coordinate => {    
        placeItem(coordinate, rockEmoji) 
    });
}

const createField = () => {
    rocksCoordinates = [];
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
    roverCoordinates = randomCoordinates();
    placeItem(roverCoordinates, roverEmoji);
    placeRocks();
}

const moveRover = (direction) => {
    const directions = {
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0]
    };
  
    const [rowChange, colChange] = directions[direction];
    const [currentRow, currentCol] = roverCoordinates.split("-");
  
    const newRow = Number(currentRow) + rowChange;
    const newCol = Number(currentCol) + colChange;
  
    if (newRow < 1 || newRow > rowNumber || newCol < 1 || newCol > columnNumber) {
      return;
    }
  
    const newPosition = `${newRow}-${newCol}`;
  
    document.getElementById(roverCoordinates).innerText = "";
    roverCoordinates = newPosition;
    placeItem(roverCoordinates, roverEmoji);
};

startButton.addEventListener("click", createField);
document.addEventListener("keydown", (event) => moveRover(event.key));

// const moveRover = (direction) => {
//     const parts = roverCoordinates.split("-");
//     if (direction === "ArrowRight") {
//         if (Number(parts[1]) === columnNumber) {
//             return; //console.log("sei al limite destro!");
//         }
//         else{
//             const newPosition = parts[0] + "-" + String(Number(parts[1])+1);
//             document.getElementById(roverCoordinates).innerText = "";
//             roverCoordinates = newPosition;
//             placeItem(roverCoordinates, roverEmoji);
//         }
//     }
//     else if (direction === "ArrowLeft") {
//         if (Number(parts[1]) === 1) {
//             return; //console.log("sei al limite sinistro!");
//         }
//         else{
//             const newPosition = parts[0] + "-" + String(Number(parts[1])-1);
//             document.getElementById(roverCoordinates).innerText = "";
//             roverCoordinates = newPosition;
//             placeItem(roverCoordinates, roverEmoji);
//         }
//     }
//     else if (direction === "ArrowUp") {
//         if (Number(parts[0]) === 1) {
//             return; //console.log("sei al limite superiore!");
//         }
//         else{
//             const newPosition = String(Number(parts[0])-1) + "-" + parts[1];
//             document.getElementById(roverCoordinates).innerText = "";
//             roverCoordinates = newPosition;
//             placeItem(roverCoordinates, roverEmoji);
//         }
//     }
//     else if (direction === "ArrowDown") {
//         if (Number(parts[0]) === rowNumber) {
//             return; //console.log("sei al limite inferiore!");
//         }
//         else{
//             const newPosition = String(Number(parts[0])+1) + "-" + parts[1];
//             document.getElementById(roverCoordinates).innerText = "";
//             roverCoordinates = newPosition;
//             placeItem(roverCoordinates, roverEmoji);
//         }
//     }
// }