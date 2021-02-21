const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

// local storage에 'toDos'라는 이름으로 저장
const TODOS_LS = 'toDos';

// todo 리스트 형태로 저장
let toDos = [];

function deleteToDo(event){
  // html에서 지우기
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  // local storage에서 지우기
  // filter : array의 모든 아이템을 통해 함수를 실행하고 true인 아이템만 가지고 새로운 array 만든다
  // > filterFn이 체크가 된 item들의 array를 준다
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  }); 
  toDos = cleanToDos; // toDos 업데이트
  saveToDos();
}

// todo 리스트를 local storage에 저장
function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // JSON.stringify : 자바스크립트 object를 string으로 바꿔준다.
}

// 화면에 표시
function paintToDo(text){
  // html에 무언가를 생성
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  // span과 delBtn을 li안에 넣기
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId // empty일 경우 +1 하면 1 된다!
  };
  toDos.push(toDoObj); // 하나 넣어놓는다
  saveToDos(); // push한 이후에 호출해야 함(그 전에는 비어있다)
}

function handleSubmit(event){
  event.preventDefault(); // 새로고침 방지
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintToDo(currentValue);
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null){
    // string > javascript 형식으로 변환
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach : array 내부에 있는 것들마다 함수 실행
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text); // 화면에 나타낸다
    });
    //todoInput.value=""; // 엔터 눌렀을 때 todo 생성(submit)
  } 
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();