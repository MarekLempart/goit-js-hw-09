const startBut = document.querySelector('[data-start]');
const stopBut = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

startBut.addEventListener('click', () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBut.disabled = true;
  stopBut.disabled = false;
});

stopBut.addEventListener('click', () => {
  clearInterval(intervalId);
  startBut.disabled = false;
  stopBut.disabled = true;
});
