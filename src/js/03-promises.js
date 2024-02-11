function generateRandomColor() {
  const r = Math.floor(Math.random() * 256); // Składowa czerwona (0-255)
  const g = Math.floor(Math.random() * 256); // Składowa zielona (0-255)
  const b = Math.floor(Math.random() * 256); // Składowa niebieska (0-255)
  return `rgb(${r},${g},${b})`; // Format RGB
}

function updateBackgroundColor() {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

// Aktualizacja tła co sekundę
setInterval(updateBackgroundColor, 1000);

// const colors = [
//   '#FF5733',
//   '#FFBD33',
//   '#33FF57',
//   '#33BDFF',
//   '#5733FF',
//   '#FF33BD',
// ]; // Kolory zdefiniowane na kole kolorów

// let currentIndex = 0;

// function getNextColor() {
//   const nextIndex = (currentIndex + 1) % colors.length;
//   return colors[nextIndex];
// }

// function updateBackgroundColor() {
//   const currentColor = colors[currentIndex];
//   const nextColor = getNextColor();

//   document.body.style.background = `linear-gradient(to right, ${currentColor}, ${nextColor})`;

//   currentIndex = (currentIndex + 1) % colors.length;
// }

// // Aktualizacja tła co sekundę
// setInterval(updateBackgroundColor, 1000);

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const delay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  for (let i = 1; i <= amount; i += 1) {
    const currentDelay = delay + (i - 1) * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
});
