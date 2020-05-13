////////////USER INTERFACE////////////

// DOM Objects:
// Greet Container Div:
export var greetContainerDiv = document.getElementById("greetContainer");

// Start Game Div:
export var startGameDiv = document.getElementById("startGame");
// and it's button
export var playBtn = document.getElementById("play");
// and it's event handler
playBtn.addEventListener("click", function() {
    greetContainerDiv.classList.add("dissolve-disappear");
    setTimeout(function() {
        greetContainerDiv.style.top = "-150px"; //reposition the greet container
        greetContainerDiv.classList.remove("dissolve-disappear"); //remove the animation class
        greetContainerDiv.classList.add("scroll-down-from-top"); //add the next animation class
        startGameDiv.style.display = "none"; //remove the current start game div
        tokenChoiceDiv.style.display = "block"; //and show the next token choice div
    }, 2000); // 2 seconds to give enought time for the dissolve disappear animation to finish
});

// Token Choice Div
export var tokenChoiceDiv = document.getElementById("tokenChoice");
// and it's buttons
export var chooseNoughtsBtn = document.getElementById("chooseNoughts");
export var chooseCrossesBtn = document.getElementById("chooseCrosses");
// and their event handlers
chooseNoughtsBtn.addEventListener("click", function() {
    playerToken = "O";
    computerToken = "X";
    dissolveTokenChoice();
    setTimeout(function() {
        tokenChoiceDiv.style.display = "none";
        dissolveReappearWhoGoesFirst();
    }, 2000);
});
chooseCrossesBtn.addEventListener("click", function() {
    playerToken = "X";
    computerToken = "O";
    dissolveTokenChoice();
    setTimeout(function() {
        tokenChoiceDiv.style.display = "none";
        dissolveReappearWhoGoesFirst();
    }, 2000);
});

// Who Goes First Div:
export var whoGoesFirstDiv = document.getElementById("whoGoesFirst");
// and it's buttons
export var playerStartBtn = document.getElementById("playerStart");
export var computerStartBtn = document.getElementById("computerStart");
// and their event handlers
playerStartBtn.addEventListener("click", function() {
    scrollDownGreetDiv();
    whoStarts(true);
});
computerStartBtn.addEventListener("click", function() {
    scrollDownGreetDiv();
    whoStarts(false);
});

// Announce Winner Div:
export var announceWinnerDiv = document.getElementById("announceWinner");

// Ask For Rematch Div"
export var askForReMatchDiv = document.getElementById("askForReMatch")
// and it's buttons
export var playAgainBtn = document.getElementById("playAgain");
export var noPlayAgainBtn = document.getElementById("noPlayAgain");
// and their event handlers
playAgainBtn.addEventListener("click", function() {
    greetContainerDiv.classList.remove("scroll-down-from-top");
    greetContainerDiv.classList.add("scroll-down-from-center");
    setTimeout(function() {
        askForReMatchDiv.style.display = "none";
    }, 1800);
    replay();
});
noPlayAgainBtn.addEventListener("click", function() {
    intialiseBoard();
    askForReMatchDiv.style.display = "none";
    goodByeDiv.style.display = "block";
    greetContainerDiv.style.display = "none";
    goodByeDiv.classList.add("dissolve-reappear");
    setTimeout(function () {
        goodByeDiv.classList.remove("dissolve-reappear");
        goodByeDiv.classList.add("dissolve-disappear");
    }, 3000);
    setTimeout(function () {
        goodByeDiv.classList.remove("dissolve-disappear");
        goodByeDiv.style.display = "none";
        startGameDiv.style.display = "block";
        greetContainerDiv.style.display = "block";
        greetContainerDiv.style.top = "260px";
        greetContainerDiv.classList.add("dissolve-reappear");
    }, 5000);
    setTimeout(function() {
        // greetContainerDiv.style.top = "-150px";
        // tokenChoiceDiv.style.display = "block";
        // startGameDiv.style.display = "none";
        // greetContainerDiv.classList.remove("dissolve-reappear");
        // greetContainerDiv.classList.add("scroll-down-from-top");
    }, 7000);
});

// Goodbye Div
export var goodByeDiv = document.getElementById("goodBye");



// Functions:
export function dissolveTokenChoice() { //dissolve div
    tokenChoiceDiv.classList.add("dissolve-disappear");
}
export function dissolveReappearWhoGoesFirst() { //bring back the div
    whoGoesFirstDiv.style.display = "block";
    whoGoesFirstDiv.classList.add("dissolve-reappear");
}

export function scrollDownGreetDiv() { // scroll down drop div
    greetContainerDiv.classList.remove("scroll-down-from-top");
    greetContainerDiv.classList.add("scroll-down-from-center");
}

export function announceWinner(message) {  // Announce winner ui
    whoGoesFirstDiv.style.display = "none";
    announceWinnerDiv.style.display = "block";
    announceWinnerDiv.firstElementChild.innerHTML = message;
    greetContainerDiv.classList.remove("scroll-down-from-center");
    greetContainerDiv.classList.add("scroll-down-from-top");
    setTimeout(function() {
        announceWinnerDiv.classList.add("dissolve-disappear");
        askForReMatch();
    }, 1800);
}

export function askForReMatch() { // rematch UI
    setTimeout(function() {
        announceWinnerDiv.style.display = "none";
        askForReMatchDiv.style.display = "block";
        askForReMatchDiv.classList.add("dissolve-reappear");
    }, 2000);   
}

export function replay() {
    intialiseBoard();
    if(isPlayerLastToStart) { //if player started last time
        whoStarts(false); //computer starts
    } else {
        whoStarts(true); //otherwise players starts
    }
}

export function intialiseBoard() {
    squareIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // reset square ids
    for(xo of xoElements) {
        xo.innerHTML = "";
        xo.classList.remove("X"); //remove classes
        xo.classList.remove("O"); //from each square
    }
}