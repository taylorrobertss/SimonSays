let seq = [];
let num = 0;
let difficulty = 0;
let humSeq = [];
let currScore = document.getElementById("CurrentScore");
let recScore = document.getElementById("RecordScore");
const ButStart = document.querySelector('.Startbutton');
let high = 0;
let over = false;
const tileCon = document.querySelector('.cont');
let timer;

function resetGame() {
    difficulty = 0;
    seq = [];
    humSeq = [];
    tileCon.classList.add("dontClick");
    document.getElementById("CurrentScore").value = 0;
    document.getElementById("StartLight").style.backgroundColor = "red";
    document.getElementById("RecordScore").value = high;
}

function humanTurn() {
    tileCon.classList.remove('dontClick');

}

function showTiles(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    tile.classList.add('activated');
    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function play(nextSequence) {
    nextSequence.forEach((color, index) => {
        if (document.getElementById("CurrentScore").value < 5) {
            setTimeout(() => {
                showTiles(color);
            }, (index + 1) * 1000);
        }
        if (document.getElementById("CurrentScore").value >= 5 && document.getElementById("CurrentScore").value < 9) {
            setTimeout(() => {
                showTiles(color);
            }, (index + 1) * 800);
        }
        if (document.getElementById("CurrentScore").value >= 9 && document.getElementById("CurrentScore").value < 12) {
            setTimeout(() => {
                showTiles(color);
            }, (index + 1) * 600);
        }
        if (document.getElementById("CurrentScore").value >= 13) {
            setTimeout(() => {
                showTiles(color);
            }, (index + 1) * 400);
        }
    });
}

function flash(element, duration = 500, repeat = 5) {
    element.classList.toggle('activated');

    setTimeout(() => {
        element.classList.toggle('activated');

        if (repeat > 1) {
            setTimeout(() => flash(element, duration, repeat - 1), duration);

        }
    }, duration);

}

function nextStep() {
    const circleT = ['red', 'green', 'blue', 'yellow'];
    const ran = circleT[Math.floor(Math.random() * circleT.length)];
    return ran;
}

function next() {
    difficulty += 1;
    document.getElementById("CurrentScore").value++;
    if (document.getElementById("CurrentScore").value > high) {
        high = document.getElementById("CurrentScore").value;
    }

    tileCon.classList.add('dontClick');

    const nextSequence = [...seq];
    nextSequence.push(nextStep());
    play(nextSequence);

    seq = [...nextSequence];
    setTimeout(() => {
        humanTurn(difficulty);
    }, difficulty * 600 + 1000);

}

function handleClick(tile) {

    const index = humSeq.push(tile) - 1;
    const yellow = document.querySelector(`#C1`);
    const red = document.querySelector(`#C3`);
    const green = document.querySelector(`#C4`);
    const blue = document.querySelector(`#C2`);

    const remainingTaps = seq.length - humSeq.length;
    if (humSeq[index] !== seq[index]) {
        over = true;
        if (over) {

            flash(yellow);
            flash(red);
            flash(green);
            flash(blue);
            resetGame();
            return;
        }
    }
    if (humSeq.length === seq.length) {
        humSeq = [];
        setTimeout(() => {
            next();
        }, 1000);
        return;
    }
}

function startGame() {
    document.getElementById("StartLight").style.backgroundColor = "green";
    setTimeout(() => {
        next();
    }, 3000);
    resetGame();
    document.getElementById("StartLight").style.backgroundColor = "green";
}



ButStart.addEventListener('click', startGame);

tileCon.addEventListener('click', e => {

    const { tile } = e.target.dataset;
    if (tile) handleClick(tile);
})