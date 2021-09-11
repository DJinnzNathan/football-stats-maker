let root = document.documentElement;
let time, sec = 0, min = 0, active = false;
let possessionTotal = 0, possessionHome = 0;
let shotsHomeTotal = 0, shotsHome = 0;
let shotsAwayTotal = 0, shotsAway = 0;
let foulsHome = 0, foulsAway = 0;
let yellowCardHome = 0, yellowCardAway = 0;
let redCardHome = 0, redCardAway = 0;

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
    document.title = min + ':' + ((sec < 10) ? '0' + sec : sec);
    document.getElementById('heading').innerText = min + ':' + ((sec < 10) ? '0' + sec : sec);
}

function toggleTimer() {
    if (!active) {
        startTimer();
        active = true;
    } else {
        stopTimer();
        active = false;
        resetBG();
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

function togglePossession() {
    var poss = document.getElementById('possessionStatus').checked;
    if (poss) {
        document.getElementById('possessionStatus').checked = false;
        if (active) document.body.style.backgroundColor = 'var(--home)';
    } else {
        document.getElementById('possessionStatus').checked = true;
        if (active) document.body.style.backgroundColor = 'var(--away)';
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

function addFouls(isHome) {
    (isHome) ? foulsHome++ : foulsAway++;
    document.getElementById('foulsHome').innerText = foulsHome;
    document.getElementById('foulsAway').innerText = foulsAway;

    let homeFouls = Math.round((foulsHome / (foulsHome + foulsAway)) * 100);
    document.getElementById('foulsBar').value = homeFouls;

    console.log(foulsHome + ' : ' + foulsAway);
}

function addYellowCard(isHome) {
    (isHome) ? yellowCardHome++ : yellowCardAway++;
    console.log(yellowCardHome + ' : ' + yellowCardAway);
}

function addRedCard(isHome) {
    (isHome) ? redCardHome++ : redCardAway++;
    console.log(redCardHome + ' : ' + redCardAway);
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

function setupSecondLeg() {
    sec = 0;
    min = 45;
    printTime();
}

function addShot(isHome, isOnGoal) {
    if (isHome) {
        shotsHomeTotal++;
        if (isOnGoal) shotsHome++;
    } else {
        shotsAwayTotal++;
        if (isOnGoal) shotsAway++;
    }
    console.log('Shots: ');
    console.log('HOME ' + shotsHomeTotal + ' (' + shotsHome + ')');
    console.log('AWAY ' + shotsAwayTotal + ' (' + shotsAway + ')');
    printShots();
}

function printShots() {

    document.getElementById('shotsTotalHome').innerText = shotsHomeTotal;
    document.getElementById('shotsTotalAway').innerText = shotsAwayTotal;

    document.getElementById('shotsTotalBar').value = (shotsHomeTotal / (shotsHomeTotal + shotsAwayTotal)) * 100;

    document.getElementById('shotsHome').innerText = shotsHome;
    document.getElementById('shotsAway').innerText = shotsAway;

    document.getElementById('shotsBar').value = (shotsHome / (shotsHome + shotsAway)) * 100;
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'h') {
        document.getElementById('possessionStatus').checked = false;
    }
    if (event.key === 'a') {
        document.getElementById('possessionStatus').checked = true;
    }
    if (event.key === 'r') {
        resetBG();
    }
    if (event.key === 'p') {
        toggleGame();
    }
    if (event.key === 't') {
        togglePossession();
    }
});

function changeColor(obj) {
    root.style.setProperty('--away', '#' + obj.value);
}

function resetBG() {
    document.body.style.backgroundColor = 'var(--bg)';
}