import "./styles.css";

const numbers = document.querySelectorAll("button.number"),
  operators = document.querySelectorAll("button.operator"),
  equals = document.querySelector("button.equals"),
  clear = document.querySelector("button.clear"),
  show = document.querySelector(".show");

let result = 0;
let isOper = false;
let isNum = false;
let numCheck = false; // 반복연산 여부 체크
let operator;

function showNumber(number) {
  // 연산자 누르기 전
  if (isOper === false) {
    if (show.value === "0") {
      show.value = number;
    } else {
      show.value += number;
    }
    isNum = true; // 첫 번째 숫자 눌림
  }
  // 연산자 누른 후
  else {
    if (numCheck === false) {
      show.value = number;
      numCheck = true;
    } else {
      show.value += number;
    }
  }
}

function handleCalc() {
  const num = parseFloat(show.value);
  console.log(num);
  if (isNum === true && numCheck === true && isOper === true) {
    switch (operator) {
      case "+":
        result = parseFloat(result) + num;
        break;
      case "-":
        result = parseFloat(result) - num;
        break;
      case "*":
        result = parseFloat(result) * num;
        break;
      case "/":
        result = parseFloat(result) / num;
        break;
      default:
        break;
    }
    numCheck = false;
    show.value = result;
  }
}

function handleClear() {
  isNum = false;
  isOper = false;
  numCheck = false;
  result = 0;
  show.value = "0";
}

function handleOperator(oper) {
  const num = parseFloat(show.value);
  if (isNum === true) {
    if (isOper === false) {
      // 첫 번째
      result += num;
      operator = oper; // 연산자 뭔지 할당
      isOper = true;
    } else if (isOper === true) {
      // 두 번째
      handleCalc();
      operator = oper; // 연산자 뭔지 할당
    }
  }
}

function init() {
  numbers.forEach((eachNum) => {
    eachNum.addEventListener("click", () => {
      const number = eachNum.innerText;
      showNumber(number);
    });
  });
  operators.forEach((eachOper) => {
    eachOper.addEventListener("click", () => {
      const oper = eachOper.innerText;
      handleOperator(oper);
    });
  });
  equals.addEventListener("click", handleCalc);
  clear.addEventListener("click", handleClear);
}

init();
