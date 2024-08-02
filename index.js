// index.js

let timer;
let [minutes, seconds, milliseconds] = [0, 0, 0];
let isRunning = false;
let laps = [];

const minutesDisplay = document.querySelector('.mins');
const secondsDisplay = document.querySelector('.sec');
const millisecondsDisplay = document.querySelector('.millisec');

const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

const lapUpdate = document.querySelector('.lapupdate');

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 2)}`;
        laps.push(lapTime);
        updateLapDisplay();
    }
});

stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    [minutes, seconds, milliseconds] = [0, 0, 0];
    updateDisplay();
    laps = [];
    updateLapDisplay();
});

function updateTime() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds / 10, 2); 
}

function updateLapDisplay() {
    lapUpdate.innerHTML = laps.map((lap, index) => `<h4>Lap ${index + 1}: ${lap}</h4>`).join('');
}

function pad(unit, length = 2) {
    return String(unit).padStart(length, '0');
}
