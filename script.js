import { greetContainerDiv, startGameDiv, playBtn,
         tokenChoiceDiv, chooseNoughtsBtn, chooseCrossesBtn,
         whoGoesFirstDiv, playerStartBtn, computerStartBtn,
         announceWinnerDiv, askForReMatchDiv, playAgainBtn,
         noPlayAgainBtn, goodByeDiv, dissolveTokenChoice,
         dissolveReappearWhoGoesFirst, scrollDownGreetDiv, announceWinner,
         askForReMatch, replay, intialiseBoard } from './script1.js';
////////////GAME LOGIC////////////
/*
greetContainerDiv
playBtn;
startGameDiv;tokenChoiceDiv;
chooseCrossesBtn;
computersSquareChoice;
chooseNoughtsBtn;
whoGoesFirstDiv;playerStartBtn;
computerStartBtn;
announceWinnerDiv;
askForReMatchDiv;
playAgainBtn;
noPlayAgainBtn;
goodByeDiv;
dissolveReappearWhoGoesFirst;
dissolveTokenChoice;
scrollDownGreetDiv;
askForReMatch;
replay;
intialiseBoard;
*/
var isComputerTurn; // Used to determine whose turn itcurrently is
var squareIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Number for each square
var playerToken; // For storing wether player has chosen noughts or crosses
var computerToken;
var squareButtons = document.getElementsByTagName("button"); // HTML collection of each square objects of the board
// Event listener for each square that is clicked by the user or computer
for(squareButton of squareButtons) {
    squareButton.addEventListener("click", function() {
        //if computers turn:
        if(isComputerTurn) { // variable value determined by user decision -
            if(squareIsFree(computersSquareChoice)) { // check square is free
                makeMove(computersSquareChoice); // call this function to complete the move
                isComputerTurn = false; // pass branch to user on next call of this click()
                if(isAWinner()) { // logic for if a winner is found
                    announceWinner("Unlucky, You Lose!"); // call UI and display
                } else if(squareIDs.length == 0) {
                    announceWinner("It's A Draw!"); // otherwise if no moves left tell UI its a draw
                } // other wise wait for user move now
            }
        } else { // if players turn
            playersSquareChoice = this; // get this square
            if(squareIsFree(playersSquareChoice)) { //check square is free
                makeMove(playersSquareChoice); // call this functionto complete themove
                isComputerTurn = true; // pass branch to computer on next call of this click()
                if(isAWinner()) { //logic for if a window is found
                    announceWinner("Congratulations, You Won!"); // call UI and display
                } else if(squareIDs == 0) {
                    announceWinner("It's a Draw!"); // otherwise if no moves left tell UI its a draw
                } else {
                    passPlayToComputer(); // otherwise make computer choose anothersquare
                }
            }
        }
    });
}
//functions for the square event handler above for when it is clicked:

// First, Decide who goes first user or computer
//var isPlayerLastToStart; // determines who went first in the last game

function whoStarts(isPlayerToStart) { // called and given value by the UI
    if(!isPlayerToStart) { // computers turn
        isPlayerLastToStart = false;
        isComputerTurn = true;
        setTimeout(function() {
            passPlayToComputer(); // generate computers move
        }, 600); //delay to give time for UI animation to fade away
    } else { // users turn - wait for user to press click on a square and call the above event handler
        isPlayerLastToStart = true;
        isComputerTurn = false;
    }
}

// If computer move this is called to find a valid square
function passPlayToComputer() {
    generateValidSquare(); // generate next square for computer
    setTimeout(function() {
        computersSquareChoice.click(); // call click event on computers square
    }, 1000); // create a slight delay between user move and computers move
}
// Generate valid square
function generateValidSquare() {
    var randomIndex = Math.floor(Math.random() * (squareIDs.length - 1));
    if(randomIndex >= 0) {
        randomNumStr = squareIDs[randomIndex].toString();
    }
    computersSquareChoice = document.getElementById(randomNumStr);
}
// check to see if the square on board is available used in square event handler above
function squareIsFree(squareID) {
    var isFree = squareIDs.includes(parseInt(squareID.id));
    return isFree;
}

//function to drawShape and void the square to stop the square being selected again
function makeMove(playersSquareChoice) {
    drawShape(playersSquareChoice); // pick the square put x or o
    voidSquare(playersSquareChoice); // and remove the square from array so it cant be picked agin
}
// pick the square and draw depending on whose turn it is
function drawShape(squareButton) {
    var child = squareButton.firstElementChild;
    if(isComputerTurn) {
        child.classList.add(computerToken); // add X css selector for style to element
        child.innerHTML = computerToken; // computerToken is determined by the UI when user decides wether they want to be noughts or crosses
    } else {
        child.classList.add(playerToken); // add O css selector for style to element
        child.innerHTML = playerToken; // // player Token is determined by the UI when user decides wether they want to be noughts or crosses
    }
}

// Make the square unavailable
function voidSquare(squareID) {
    var indexOfSquare = squareIDs.indexOf(parseInt(squareID.id));
    squareIDs.splice(indexOfSquare, 1);
}

//array for storing all p elements in each square where X or O is put
var xoElements = document.getElementsByClassName("XO");
//function used for determining when someone has completed a row of their token - noughts or crosses
function isAWinner() { // used in square event handler
    if(squareIDs.length < 5) { // only needs to be checked after 5 moves have been made
        var xoArray = [];
        for(xo of xoElements) {
            xoArray.push(xo.innerHTML);
        } // check all rows
        var row1 = (xoArray[0] + xoArray[1] + xoArray[2]);
        var row2 = (xoArray[3] + xoArray[4] + xoArray[5]);
        var row3 = (xoArray[6] + xoArray[7] + xoArray[8]);
        var col1 = (xoArray[0] + xoArray[3] + xoArray[6]);
        var col2 = (xoArray[1] + xoArray[4] + xoArray[7]);
        var col3 = (xoArray[2] + xoArray[5] + xoArray[8]);
        var diag1 = (xoArray[0] + xoArray[4] + xoArray[8]);
        var diag2 = (xoArray[6] + xoArray[4] + xoArray[2]);
        if( checkIsLine(row1) || checkIsLine(row2) || checkIsLine(row3) || // use checkIsLine to get boolwan value
            checkIsLine(col1) || checkIsLine(col2) || checkIsLine(col3) ||
            checkIsLine(diag1) || checkIsLine(diag2)) {
            return true;
        } else {
            return false;
        }
    }
}

function checkIsLine(line) { //takes a line from the board and checks to see if win line is found
    var strXLine = "XXX";
    var strOLine = "OOO";
    var isLine;
    if(line == strXLine) {
        isLine = true;
    } else if(line == strOLine) {
        isLine = true;
    } else {
        isLine = false;
    }
    return isLine;
}
////////////      ////////////
















/////////TODO/////////
//make the board unclickable until the game is ready
//add effect on buttons and remove the focus highlight
//add a play button to start the game