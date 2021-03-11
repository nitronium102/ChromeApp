import "./styles.css";

const clockContainer = document.querySelector(".eve-clock"),
  clockTitle = clockContainer.querySelector("h2");

// You're gonna need this
function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const today = new Date();

  const gap = (xmasDay - today) / 1000; // seconds
  let left = 0;
  const days = parseInt(gap / 60 / 60 / 24);
  left = gap % (60 * 60 * 24);
  const hours = parseInt(left / 60 / 60);
  left = gap % (60 * 60);
  const minutes = parseInt(left / 60);
  left = gap % 60;
  const seconds = parseInt(left);

  clockTitle.innerText = `${days < 10 ? `0${days}` : days}d ${
    hours < 10 ? `0${hours}` : hours
  }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
    seconds < 10 ? `0${seconds}` : seconds
  }s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
