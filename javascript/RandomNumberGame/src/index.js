import "./styles.css";

const slider = document.getElementById("slider"),
  startBtn = document.getElementById("playBtn"),
  selected = document.getElementById("selected"),
  result = document.getElementById("result");

let slideNum = document.getElementById("slideNum");
let guessNum = document.getElementById("guessNum");
let maxNum = 10;

// slider의 값이 maxNum 값에 실시간으로 반영되도록 함
slider.oninput = function showSlideValue() {
  slideNum.innerHTML = this.value;
  maxNum = this.value;
};

// 키보드로 maxNum 이상의 숫자가 입력되는 것 방지
guessNum.onkeyup = function () {
  if (this.value > maxNum) this.value = null;
};

function handleStart(event) {
  event.preventDefault();
  // guessNum의 max value를 slider에서 지정한 값으로 설정
  guessNum.setAttribute("max", maxNum); // set max value

  // machine이 내는 값 설정(최소 최대 포함)
  const randNum = Math.floor(Math.random() * (Math.floor(maxNum) + 1));

  selected.innerText = `You chose: ${guessNum.value}, the machine choose: ${randNum}`;

  // 결과
  if (guessNum.value === JSON.stringify(randNum)) {
    result.innerText = "You won!";
  } else {
    result.innerText = "You lose!";
  }
}

function init() {
  startBtn.addEventListener("click", handleStart);
}

init();
