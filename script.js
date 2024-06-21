// Variables to hold time values
let minute = 0;
let second = 0;
let millisecond = 0;
let interval;
let isRunning = false;

// DOM elements
const minuteElement = document.getElementById('minute');
const secondElement = document.getElementById('second');
const millisecondElement = document.getElementById('millisecond');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Start or stop the stopwatch
startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
    } else {
        interval = setInterval(startTimer, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    minute = 0;
    second = 0;
    millisecond = 0;
    updateDisplay();
    lapsContainer.innerHTML = ''; // Clear laps
});

// Add a lap
lapBtn.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = `${formatTime(minute)}:${formatTime(second)}.${formatTime(millisecond)}`;
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
});

// Timer function
function startTimer() {
    millisecond++;
    if (millisecond >= 100) {
        millisecond = 0;
        second++;
    }
    if (second >= 60) {
        second = 0;
        minute++;
    }
    updateDisplay();
}

// Update the display
function updateDisplay() {
    minuteElement.textContent = `${formatTime(minute)} :`;
    secondElement.textContent = `${formatTime(second)} .`;
    millisecondElement.textContent = `${formatTime(millisecond)}`;
}

// Format time to ensure two digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
