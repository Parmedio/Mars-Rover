//Script Mars Rover

console.log("program start");
const roverEmoji = '\u{1F6F8}';
const rockEmoji = '\u{26F0}';
const energyEmoji = '\u{26A1}';
const heightInputField = document.querySelector("#height-input");
const widthInputField = document.querySelector("#width-input");
const startButton = document.querySelector("#start-button");
const fieldContainer = document.querySelector("#field-container");
let rowNumber;
let columnNumber;
let roverCoordinates;
let rocksCoordinates = [];
let energyCoordinates = [];
let gatheredEnergy = 0;

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
    for (let r = 1; r <= columnNumber; r++) {
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

const placeEnergy = () => {
    for (let c = 1; c <= rowNumber; c++) {
        newCoordinate = randomCoordinates();
        while (rocksCoordinates.includes(newCoordinate) || energyCoordinates.includes(newCoordinate) || newCoordinate === roverCoordinates) {
            newCoordinate = randomCoordinates();
        }
        energyCoordinates.push(newCoordinate);
    }
    energyCoordinates.forEach(coordinate => {    
        placeItem(coordinate, energyEmoji) 
    });
}

const createField = () => {
    rocksCoordinates = [];
    energyCoordinates = [];
    gatheredEnergy = 0;
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
    placeEnergy();
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

    let newRow = Number(currentRow) + rowChange;
    let newCol = Number(currentCol) + colChange;


    switch (true) {
        case newRow < 1:
            newRow = rowNumber;
            break;
        case newRow > rowNumber:
            newRow = 1;
            break;
        case newCol < 1:
            newCol = columnNumber;
            break;
        case newCol > columnNumber:
            newCol = 1;
            break;
        default:
            break;
    }
 
    const newPosition = `${newRow}-${newCol}`;

    if (rocksCoordinates.includes(newPosition)) {
        return;
    }

    if (energyCoordinates.includes(newPosition)) {
        energyCoordinates.splice(energyCoordinates.indexOf(newPosition), 1);
        gatheredEnergy++;
        console.log(`so far you gathered ${gatheredEnergy} energy units`);
    }

    document.getElementById(roverCoordinates).innerText = "";
    roverCoordinates = newPosition;
    placeItem(roverCoordinates, roverEmoji);
};

startButton.addEventListener("click", createField);
document.addEventListener("keydown", (event) => moveRover(event.key));