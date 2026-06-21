let seconds = 0;
let minutes = 0;
let hours = 0;

let stability = 100;

let clickPower = 1;

let upgrades = {
    pocketWatch: false,
    ancientClock: false
};

const secondsText =
document.getElementById("seconds");

const minutesText =
document.getElementById("minutes");

const hoursText =
document.getElementById("hours");

const stabilityText =
document.getElementById("stability");

function convertTime(){

    while(seconds >= 60){

        seconds -= 60;

        minutes++;
    }

    while(minutes >= 60){

        minutes -= 60;

        hours++;
    }
}

function updateUI(){
    showFloatingText();

    secondsText.textContent =
    Math.floor(seconds);

    minutesText.textContent =
    Math.floor(minutes);

    hoursText.textContent =
    Math.floor(hours);

    stabilityText.textContent =
    Math.floor(stability);

    document
    .getElementById("production")
    .textContent =
    clickPower + " per click";

    const pocket =
    document.getElementById(
        "pocketWatchShop"
    );

    const clock =
    document.getElementById(
        "ancientClockShop"
    );

    if(
        upgrades.pocketWatch &&
        pocket
    ){
        pocket.style.display =
        "none";
    }

    if(
        upgrades.ancientClock &&
        clock
    ){
        clock.style.display =
        "none";
    }
}

const gatherBtn =
document.getElementById(
    "gatherBtn"
);

gatherBtn.addEventListener(
    "click",
    () => {

        seconds += clickPower;

        convertTime();

        updateUI();

        gatherBtn.classList.add(
            "clicked"
        );

        setTimeout(() => {

            gatherBtn.classList.remove(
                "clicked"
            );

        },100);
    }
);

function buyPocketWatch(){

    if(
        seconds >= 25 &&
        !upgrades.pocketWatch
    ){

        seconds -= 25;

        clickPower += 1;

        upgrades.pocketWatch =
        true;

        updateUI();
    }
}

function buyAncientClock(){

    if(
        seconds >= 57 &&
        !upgrades.ancientClock
    ){

        seconds -= 57;

        clickPower += 5;

        upgrades.ancientClock =
        true;

        updateUI();
    }
}

function saveGame(){

    const saveData = {

        seconds,
        minutes,
        hours,
        stability,
        clickPower,
        upgrades
    };

    localStorage.setItem(
        "timekeeperSave",
        JSON.stringify(saveData)
    );
}


function showFloatingText(){

    const text =
    document.createElement(
        "div"
    );

    text.className =
    "floatText";

    text.textContent =
    "+" + clickPower;

    const rect =
    gatherBtn.getBoundingClientRect();

    text.style.left =
    rect.left + 40 + "px";

    text.style.top =
    rect.top + "px";

    document.body.appendChild(
        text
    );

    setTimeout(() => {

        text.remove();

    },1000);
}

function loadGame(){

    const save =
    JSON.parse(
        localStorage.getItem(
            "timekeeperSave"
        )
    );

    if(!save) return;

    seconds =
    save.seconds || 0;

    minutes =
    save.minutes || 0;

    hours =
    save.hours || 0;

    stability =
    save.stability || 100;

    clickPower =
    save.clickPower || 1;

    upgrades =
    save.upgrades || upgrades;
}

function resetSave(){

    localStorage.removeItem(
        "timekeeperSave"
    );

    location.reload();
}

setInterval(
    saveGame,
    10000
);

loadGame();

updateUI();
