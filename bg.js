const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  body.style.backgroundImage = `url("images/${imgNumber + 1}.jpg")`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "100% 100%";
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
