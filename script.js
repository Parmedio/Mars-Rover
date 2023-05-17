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

const getRandomNumber = (num) => {
    return Math.floor(Math.random() * (num)) + 1;
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

const clearAll = () => {
    rocksCoordinates = [];
    energyCoordinates = [];
    gatheredEnergy = 0;
    fieldContainer.style.display = "block";
    fieldContainer.replaceChildren();
}

const createField = () => {
    clearAll();
    
    rowNumber = isNaN(parseInt(heightInputField.value)) ? 6 : parseInt(heightInputField.value);
    columnNumber = isNaN(parseInt(widthInputField.value)) ? 10 : parseInt(widthInputField.value);
    
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
    const parts = roverCoordinates.split("-");
    const currentRow = Number(parts[0]);
    const currentCol = Number(parts[1]);
    let newRow = currentRow;
    let newCol = currentCol;
  
    switch (direction) {
      case "ArrowRight":
        newCol = currentCol === columnNumber ? 1 : currentCol + 1;
        break;
      case "ArrowLeft":
        newCol = currentCol === 1 ? columnNumber : currentCol - 1;
        break;
      case "ArrowUp":
        newRow = currentRow === 1 ? rowNumber : currentRow - 1;
        break;
      case "ArrowDown":
        newRow = currentRow === rowNumber ? 1 : currentRow + 1;
        break;
      default:
        return;
    }
  
    const newPosition = newRow + "-" + newCol;

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