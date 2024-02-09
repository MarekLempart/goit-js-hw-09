// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const dateTimePicker = document.getElementById('datetime-picker');
// const startButton = document.querySelector('[data-start]');
// const timerFields = document.querySelectorAll('.timer .value');

// let countdownInterval;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];
//     if (selectedDate < new Date()) {
//       alert('Please choose a date in the future');
//     } else {
//       startButton.disabled = false;
//     }
//   },
// };

// flatpickr(dateTimePicker, options);

// startButton.addEventListener('click', () => {
//   const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i');
//   const currentDate = new Date();
//   let timeDifference = selectedDate - currentDate;

//   if (timeDifference <= 0) {
//     alert('Please choose a future date.');
//     return;
//   }

//   countdownInterval = setInterval(() => {
//     const remainingTime = convertMs(timeDifference);
//     updateTimer(remainingTime);

//     if (timeDifference <= 0) {
//       clearInterval(countdownInterval);
//     }

//     timeDifference -= 1000;
//   }, 1000);

//   startButton.disabled = true;
// });

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function updateTimer({ days, hours, minutes, seconds }) {
//   timerFields[0].textContent = addLeadingZero(days);
//   timerFields[1].textContent = addLeadingZero(hours);
//   timerFields[2].textContent = addLeadingZero(minutes);
//   timerFields[3].textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//   return value < 10 ? `0${value}` : value;
// }

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Znajdź elementy interfejsu za pomocą selektorów CSS
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.timer .value');

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i');
  const currentDate = new Date();
  let timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    window.alert('Please choose a future date.');
    return;
  }

  countdownInterval = setInterval(() => {
    const remainingTime = convertMs(timeDifference);
    updateTimer(remainingTime);

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      window.alert('Countdown finished.');
    }

    timeDifference -= 1000;
  }, 1000);

  startButton.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
