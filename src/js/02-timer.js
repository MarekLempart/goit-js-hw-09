import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// import { Report } from 'notiflix/build/notiflix-report-aio';

const startButton = (document.querySelector('[data-start]').disabled = true);
const inputField = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      // Report.Failure('Error', 'Please choose a date in the future', 'OK');
      document.querySelector('[data-start]').disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

let countdownInterval;
flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', startTimer);

// function startTimer() {
//   const selectedDate = new Date(
//     document.getElementById('datetime-picker').value
//   );
//   const currentDate = new Date();

//   if (selectedDate <= currentDate) {
//     Notiflix.Notify.failure('Please choose a date in the future');
//     // Report.Failure('Error', 'Please choose a date in the future', 'OK');
//     return;
//   }
//   updateTimer(selectedDate - currentDate);
//   countdownInterval = setInterval(() => {
//     updateTimer(selectedDate - new Date());
//   }, 1000);

//   document.querySelector('[data-start]').disabled = true;
// }

function startTimer() {
  const selectedDate = new Date(inputField.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  inputField.disabled = true;
  updateTimer(selectedDate - currentDate);
  countdownInterval = setInterval(() => {
    updateTimer(selectedDate - new Date());
  }, 1000);

  document.querySelector('[data-start]').disabled = true;
}

function updateTimer(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);

  if (timeDiff < 0) {
    clearInterval(countdownInterval);
    // Report.Success('Success', 'Countdown finished!', 'OK');
    Notiflix.Notify.success('Countdown finished!');
  }
}

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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
