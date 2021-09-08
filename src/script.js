var time, sec = 0, min = 0, active = false;

function startTimer() {
    time = setTimeout(add, 1000)
}

function stopTimer() {
    time = time;
}

function add() {
    sec++;

    if (sec == 60) {
        min++;
        sec = 0;
    }
    printTime();
    startTimer();
}

function printTime() {
    document.getElementById('min').innerText = String(min);
    document.getElementById('sec').innerText = ((sec < 10) ? '0' + String(sec) : String(sec));
}

function toggleTimer() {
    if (!active) {
        startTimer();
        active = true;
    } else {
        stopTimer();
        active = false;
    }
}

function toggleIconStatus() {

    if (document.getElementById('startGame').innerText == "Start Game") {
        document.getElementById('startGame').innerText = "Pause Game";
    } else {
        document.getElementById('startGame').innerText = "Start Game";
    }

    if (document.getElementById('gameStatus').className == "spin") {
        document.getElementById('gameStatus').classList.remove("spin");
    } else {
        document.getElementById('gameStatus').classList.add("spin");
    }
}

function toggleGame() {
    toggleIconStatus();
    toggleTimer();
}