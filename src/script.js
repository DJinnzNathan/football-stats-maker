var time, sec = 0, min = 0, active = false;
var possessionTotal = 0, possessionHome = 0;

function startTimer() {
    time = setTimeout(add, 1000)
}

function stopTimer() {
    clearInterval(time);
}

function add() {
    sec++;

    if (sec == 60) {
        min++;
        sec = 0;
    }
    addPoss();
    printData();
    startTimer();
}

function printData() {
    printTime();
    printOnTitle();
    printPoss();
}

function printTime() {
    document.getElementById('min').innerText = min;
    document.getElementById('sec').innerText = ((sec < 10) ? '0' + sec : sec);
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

    if (document.getElementById('startGame').innerText == ("⏸️" || "⏯️")) {
        document.getElementById('startGame').innerText = "▶️";
    } else {
        document.getElementById('startGame').innerText = "⏸️";
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

function addPoss() {
    if (!document.getElementById('possessionStatus').checked) {
        possessionHome++;
    }
    possessionTotal++;
    printPoss();
}

function printPoss() {
    let possTotal = possessionTotal;
    let homePt = possessionHome;
    let awayPt = possessionTotal - possessionHome;

    let homePoss = Math.round((homePt / possTotal) * 100);
    let awayPoss = 100 - homePoss;

    document.getElementById('possHome').innerText = homePoss;
    document.getElementById('possAway').innerText = awayPoss;

    document.getElementById('possBar').value = homePoss;

    console.log('Possession: HOME ' + homePoss + '% - ' + awayPoss + '% AWAY');
}

function printOnTitle() {
    document.title = min + ':' + ((sec < 10) ? '0' + sec : sec);
}

function setupSecondLeg() {
    sec = 0;
    min = 45;
    printTime();
}