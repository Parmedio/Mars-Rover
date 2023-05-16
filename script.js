//Script Mars Rover

console.log("program start")

const heightInputField = document.querySelector("#height-input");
const widthInputField = document.querySelector("#width-input");
const startButton = document.querySelector("#start-button");
const fieldContainer = document.querySelector("#field-container");

const createField = () => {
    fieldContainer.style.display = "block";
    fieldContainer.replaceChildren();
    console.log("start button pushed");

    const rowNumber = isNaN(parseInt(heightInputField.value)) ? 6 : parseInt(heightInputField.value);
    const columnNumber = isNaN(parseInt(widthInputField.value)) ? 9 : parseInt(widthInputField.value);

    for (let i = 1; i <= rowNumber; i++) {
        const row = document.createElement("div");
        row.setAttribute("id", `r${i}`);
        row.setAttribute("class", "row");
        for (let j = 1; j <= columnNumber; j++) {
            const column = document.createElement("div");
            column.setAttribute("id", `c${j}`);
            column.setAttribute("class", "col");
            row.appendChild(column);
        }
        fieldContainer.appendChild(row);
    }
}

startButton.addEventListener("click", createField);