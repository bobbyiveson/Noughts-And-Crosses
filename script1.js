////////////USER INTERFACE////////////

// DOM Objects:
// Message Container Div:
export var msgContainerDiv = document.getElementById("msgContainer");
// Start Game Div:
export var playGameDiv = document.getElementById("playGame");
// and it's button
export var playBtn = document.getElementById("play");
// and it's event handler
playBtn.addEventListener("click", function() {
    msgContainerDiv.classList.add("dissolve-disappear");
    setTimeout(function() {
        setChildDisplayToNone(); // set all child elements display to non
        msgContainerDiv.classList.remove("dissolve-disappear");
        msgContainerDiv.classList.add("scroll-down-from-top");
        tokenChoiceDiv.style.display = "block"; //and show the next token choice div
    }, 2000); // 2000 seconds to give enought time for the dissolve disappear animation to finish
    msgContainerDiv.classList.remove("scroll-down-from-top");
});

function init() { // first initialise the UI
    msgContainerDiv.style.display = "block";
    playGameDiv.style.display = "block";
}

init();

// Token Choice Div
export var tokenChoiceDiv = document.getElementById("tokenChoice");
// and it's buttons
export var chooseNoughtsBtn = document.getElementById("chooseNoughts");
export var chooseCrossesBtn = document.getElementById("chooseCrosses");
// and their event handlers and variables
export var playerToken; 
export var computerToken;
// add class to the element and automatically delay switching the display to "none" until animation is over
function dissolveDisappear(element) {
    element.classList.add("dissolve-disappear");
    setTimeout(function() {
        element.style.display = "none";
        element.classList.remove("dissolve-disappear");
    }, 2000); // create function to get delay -> animation duration + delay
}
// add class to element and set delay for when dissolve animation should start
function dissolveAppear(element, delay) {
    setTimeout(function() {
        element.style.display = "block";
        element.classList.add("dissolve-reappear");
    }, delay); // maybe set this auto based on animation duration + delay of dissolve disappear
}

chooseNoughtsBtn.addEventListener("click", function() {
    playerToken = "O";
    computerToken = "X";
    dissolveDisappear(tokenChoiceDiv);
    dissolveAppear(whoPlaysFirstDiv, 2000);
});
chooseCrossesBtn.addEventListener("click", function() {
    playerToken = "X";
    computerToken = "O";
    dissolveDisappear(tokenChoiceDiv);
    dissolveAppear(whoPlaysFirstDiv, 2000);
});

// Who Plays First Div:
export var whoPlaysFirstDiv = document.getElementById("whoPlaysFirst");
// and it's buttons
export var playerStartBtn = document.getElementById("playerStart");
export var computerStartBtn = document.getElementById("computerStart");

// and their event handlers and variables
export var playerStarts;
playerStartBtn.addEventListener("click", function() {
    dropToBottom(1300);
    playerStarts = true;
    boardReady = true;
    setTimeout(function() {
        whoPlaysFirstDiv.classList.remove("dissolve-reappear");
    }, 1300);
});
computerStartBtn.addEventListener("click", function() {
    dropToBottom(1300);
    playerStarts = false;
    boardReady = true;
    setTimeout(function() {
        whoPlaysFirstDiv.classList.remove("dissolve-reappear");
    }, 1300);
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
    askForReMatchDiv.classList.remove("dissolve-reappear");
    dropToBottom(1300);
    boardReady = true;
});
noPlayAgainBtn.addEventListener("click", function() {
    askForReMatchDiv.classList.remove("dissolve-reappear");
    dissolveDisappear(askForReMatchDiv);
    dissolveAppear(goodByeDiv, 2000);
    setTimeout(function() {
        dropToBottom(1300);
        setTimeout(function() {
            goodByeDiv.classList.remove("dissolve-reappear");
            init();
        }, 2000);
    }, 5000);
    boardReady = false;
});

// Goodbye Div
var goodByeDiv = document.getElementById("goodBye");


// Functions:
export function announceWinner(message) {  // Announce winner ui
    boardReady = false;
    dropToCenter();
    announceWinnerDiv.style.display = "block";
    announceWinnerDiv.firstElementChild.innerHTML = message;
    setTimeout(function() {
        askForReMatch();
    }, 2200);
}

export function askForReMatch() { // rematch UI
    announceWinnerDiv.classList.add("dissolve-disappear");
    setTimeout(function() {
        announceWinnerDiv.style.display = "none";
        announceWinnerDiv.classList.remove("dissolve-disappear");
        askForReMatchDiv.style.display = "block";
        askForReMatchDiv.classList.add("dissolve-reappear");
    }, 2000);   
    msgContainerDiv.classList.remove("scroll-down-from-top");
}

export var xoElements = document.getElementsByClassName("XO");
export var boardReady;

// msgContainerDiv functions

function dropToCenter() {
    //msgContainerDiv.classList.remove("scroll-down-from-center");
    msgContainerDiv.style.display = "block";
    msgContainerDiv.classList.add("scroll-down-from-top");
}

function dropToBottom(delay) {
    msgContainerDiv.classList.add("scroll-down-from-center");
    setTimeout(function() {
        setChildDisplayToNone();
        msgContainerDiv.style.display = "none";
        msgContainerDiv.classList.remove("scroll-down-from-center");
    }, delay);
}

function setChildDisplayToNone() {
    var children = msgContainerDiv.children;
    for(var child of children) {
        if(child.style.display == "block") {    
            child.style.display = "none";
        }
    }
}