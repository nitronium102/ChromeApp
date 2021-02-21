// querySelectorAll : array
// querySelector : first thing만 get
const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// 이름을 local storage에 저장하기 (USER_LS : text 형식)
function saveName(text){
  localStorage.setItem(USER_LS, text);
}

// 폼 제출 handler
function handleSubmit(event){
  event.preventDefault(); // 데이터를 다른 곳으로 보내는 것 방지
  const currentValue = input.value; 
  paintGreetings(currentValue); // currentValue를 화면에 표시
  saveName(currentValue); // currentValue 저장
}

// 사용자에게 이름을 물어보기 
function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit); // 폼 제출
}

// 화면에 새로운 값 표시
function paintGreetings(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

// local storage에 있는 name값 가져오기
function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    // she is not
    askForName();
  } else {
    // she is
    paintGreetings(currentUser);
  }
}

function init(){
  loadName();
}

init();