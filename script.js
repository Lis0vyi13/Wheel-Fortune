const wheel = document.querySelector("#wheel");
const spin = document.querySelector("#spin");
const glyph = document.querySelector("#glyph");
const spinWrapper = document.querySelector("#spin-wrapper");
const prizes = document.querySelectorAll(".sector");
const prizesDegrees = [45, 90, 135, 180, 225, 270, 315, 360];
const root = document.documentElement;
const result = document.querySelector(".result");
const preloader = document.querySelector(".preloader");
const audio = new Audio("audio/tick-tock.mp3");
let value = 0;
window.addEventListener("load", function (e) {
  preloader.classList.remove("active");
});
changeSpinWrapperSize();

function changeSpinWrapperSize() {
  const spinStyles = getComputedStyle(spin);
  spinWrapper.style.width = spinStyles.width;
  spinWrapper.style.height = spinStyles.height;
}

function rotateWheel(degrees) {
  wheel.style.transform = `rotate(${-degrees}deg)`;
  spin.style.transform = `translate(-50%, -50%) rotate(${-degrees}deg)`;
  glyph.classList.add("glyph-animation");
}

function getPrizeIndex(wheelDegree) {
  const value = wheelDegree % 360;
  for (const prize of prizesDegrees) {
    if (value == prize) {
      value += 3;
      rotateWheel(value);
      return prizesDegrees.indexOf(prize) + 1;
    }
    if (value < prize) return prizesDegrees.indexOf(prize);
  }
}

spin.addEventListener("click", function (e) {
  value += Math.ceil(Math.random() * 3600 * 2);
  rotateWheel(value);
  audio.play();
  spin.classList.add("pointer-events-none");
});

function hideResult() {
  if (result.classList.contains("active")) {
    result.classList.remove("active");
    root.style.setProperty("--anim", "");
  }
}

wheel.addEventListener("transitionend", function (e) {
  const index = getPrizeIndex(value + 22.5);
  const prize = prizes[index].getAttribute("data-prize");
  if (glyph.classList.contains("glyph-animation")) glyph.classList.remove("glyph-animation");
  spin.classList.remove("pointer-events-none");
  result.classList.add("active");
  result.innerHTML = `<span id="close">✖</span> Congratulations! <br> You won: <span>${prize}</span>`;
  root.style.setProperty("--anim", "decreaseHeight 6s linear");
  document.querySelector("#close").addEventListener("click", hideResult);
  setTimeout(hideResult, 6000);
  return;
});
