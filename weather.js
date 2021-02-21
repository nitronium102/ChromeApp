const weather = document.querySelector(".js-weather");

const API_KEY = "1b3aaf7dd19dcd83e23d21b440f2b4d0";
const COORDS = 'coords';

function getWeather(latitude, longitude){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    const temporature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temporature} @ ${place}`;
  });
  // then : data가 완전히 들어온 다음 함수 호출
}

function handleGeoError(){
  console.log("can't access geo location");
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // key와 객체 이름 같게 설정
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords(){
  // navigator API
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords===null){
    askForCoords(); // 좌표를 요청
  } else {
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();