import "./styles.css";

let select = document.querySelector("select");

const COUNTRY_LS = "country";

// select handler
function handleSubmit(event) {
  // index에 따라 value 가져오기
  const currentValue = select.options[select.selectedIndex].value;
  // save at local storage
  localStorage.setItem(COUNTRY_LS, currentValue);
}

function loadCountry() {
  const loaded = localStorage.getItem(COUNTRY_LS);
  if (loaded === null) {
    // form은 "change"를 사용함
    select.addEventListener("change", handleSubmit);
  } else {
    select.value = loaded;
  }
}

function init() {
  loadCountry();
}

init();
