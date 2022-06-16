const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
    switch (operator) {
        case "add": return add(a, b);
        case "substract": return substract(a, b);
        case "multiply": return multiply(a, b);
        case "divide": return divide(a, b);
    }
}

console.log(operate("add", 2, 3))

const display = document.querySelector(".display");
const leftPads = Array.from(document.querySelectorAll(".numbers > div"));
const clear = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operators = Array.from(document.querySelectorAll(".operators > div"))
const equal = document.querySelector(".equal");
const deleteIcon = deleteButton.querySelector("img");

const numbers = leftPads.filter((pad) => {
    return !(pad.classList.contains("dot") || pad.classList.contains("equal"));
})

let displayNumber = [];
let a = 0;
let b = 0;
let canEdit = true;
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (displayNumber.length >= 9) return;
        let clicked = e.target.textContent;

        if (!canEdit) {
            displayNumber = [parseInt(clicked)];
            canEdit = true;
        } else {
            displayNumber.push(parseInt(clicked));
        }

        display.textContent = displayNumber.join("");
    })
})

clear.addEventListener("click", () => {
    a = 0;
    b = 0;
    displayNumber = [];
    display.textContent = 0;
})

deleteButton.addEventListener("click", (e) => {

    if (displayNumber.length <= 1 || !canEdit) {
        display.textContent = 0;
        canEdit = true;
        displayNumber = [];
        return;
    }
    let clicked = e.target.textContent;
    displayNumber.pop(parseInt(clicked));
    display.textContent = displayNumber.join("");
})

function toggleFilter() {
    deleteIcon.classList.toggle("filter-lightblue");
    deleteIcon.classList.toggle("filter-orange");
}

deleteIcon.addEventListener("mouseenter", () => toggleFilter())
deleteIcon.addEventListener("mouseout", () => toggleFilter())

function toNum(array) {
    if (array.length > 9) array.slice(0, 8);
    return Number(array.join(""))
}

let operation;
operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (a == 0) {
            a = toNum(displayNumber);
            displayNumber = [];
            operation = (e.currentTarget.id)
        } else {
            b = toNum(displayNumber);
            displayNumber = [];
            a = operate(operation, a, b);
            display.textContent = crop(a);
            operation = (e.currentTarget.id)
        }
    })
})

function crop(a) {
    return (String(a).length > 9) ? String(a).slice(0, 9) : String(a);
}

equal.addEventListener("click", () => {
    b = toNum(displayNumber);
    a = operate(operation, a, b);
    display.textContent = crop(a);
    displayNumber = [...String(a).split("")];
    canEdit = false;
    a = 0;
})

