const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.querySelector('.lap-times');

let startTime = 0;
let running = false;
let interval;
let lapCount = 1;

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(Date.now() - startTime);
}

function start() {
    if (!running) {
        startTime = Date.now() - (startTime ? startTime - Date.now() : 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function reset() {
    stop();
    startTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    lapCount = 1;
}

function lap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapTimes.appendChild(lapItem);
        lapCount++;
    }
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);