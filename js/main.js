const linksTheme = document.querySelectorAll(".theme-link");
const screen = document.getElementsByClassName("result")[0];
let currentNumber = "";
let prevNumber = "";
let sign = "";

const bodyEl = document.getElementsByTagName("body")[0];
console.log(bodyEl);
linksTheme.forEach((item) => {
  item.addEventListener("click", () => {
    linksTheme.forEach((item) => {
      item.classList.remove("chosen-theme");
    });
    item.classList.add("chosen-theme");
    if (item.id === "themeTwo") {
      bodyEl.classList.add("second-theme");
      bodyEl.classList.remove("third-theme");
    } else if (item.id === "themeThree") {
      bodyEl.classList.add("third-theme");
      bodyEl.classList.remove("second-theme");
    } else {
      bodyEl.classList.remove("second-theme");
      bodyEl.classList.remove("third-theme");
    }
  });
});

const buttons = document.querySelectorAll("button");
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    const text = item.innerHTML;
    if (type === "equal") {
      calculate();
    } else if (type === "delete") {
      deleteFn();
    } else if (type === "operate") {
      operate(text);
    } else if (type === "reset") {
      resetFn();
    } else {
      pushNumber(text);
    }
    updateScreen(type);
  });
});

function pushNumber(num) {
  currentNumber = currentNumber + num;
}

function resetFn() {
  currentNumber = "";
  prevNumber = "";
  sign = "";
}

function deleteFn() {
  if (!currentNumber.toString()) return;
  currentNumber = currentNumber.toString().slice(0, -1);
}

function operate(text) {
  if (!currentNumber.toString()) return;
  prevNumber = currentNumber;
  currentNumber = "";
  sign = text;
}

function calculate() {
  let result = 0;
  const prev = Number(prevNumber);
  const current = Number(currentNumber);
  switch (sign) {
    case "×":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    default:
      return;
  }
  currentNumber = result;
  sign = "";
  prevNumber = "";
}

function updateScreen(type) {
  if (type === "operate") {
    screen.innerText = prevNumber;
  } else {
    screen.innerText = currentNumber;
  }
}
