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
    printPoss();
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

    if (document.getElementById('startGame').innerText == ("Resume Game" || "Start Game")) {
        document.getElementById('startGame').innerText = "Pause Game";
    } else {
        document.getElementById('startGame').innerText = "Resume Game";
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

    // console.log('Possession Total: ' + possTotal);
    // console.log('Possession Home: ' + ((homePt / possTotal) * 100) + ' ( ' + homePt + ' )');
    // console.log('Possession Away: ' + ((awayPt / possTotal) * 100) + ' ( ' + awayPt + ' )');
}