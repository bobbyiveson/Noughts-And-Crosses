import {playerToken, computerToken, announceWinner, xoElements, 
        playerStarts, computerStartBtn, playAgainBtn,
        noPlayAgainBtn, boardReady} from './script1.js'; 
////////////GAME LOGIC////////////

var isComputerTurn; // Used to determine whose turn itcurrently is
var squareIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Number for each square
var computersSquareChoice;
// Event listener for each square that is clicked by the user or computer
var squareButtons = document.getElementsByClassName("squareBtn"); // HTML collection of each square objects of the board
for(var squareButton of squareButtons) {
    squareButton.addEventListener("click", function() {
        //if computers turn:
        if(boardReady) {
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
                var playersSquareChoice = this; // get this square
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
        }
    });
}
//functions for the square event handler above for when it is clicked:

// First, Decide who goes first user or computer
//var isPlayerLastToStart; // determines who went first in the last game
var playerStartsLast;
function whoStarts(playerStarts) { // called and given value by the UI
    if(!playerStarts) { // computers turn
        playerStartsLast = true;
        isComputerTurn = true;
        setTimeout(function() {
            passPlayToComputer(); // generate computers move
        }, 600); //delay to give time for UI animation to fade away
    } else { // users turn - wait for user to press click on a square and call the above event handler
        playerStartsLast = false;
        isComputerTurn = false;
    }
}

// If computers move this is called to find a valid square
function passPlayToComputer() {
    generateValidSquare(); // generate next square for computer
    setTimeout(function() {
        computersSquareChoice.click(); // call click event on computers square
    }, 1000); // create a slight delay between user move and computers move
}

// Generate valid square
function generateValidSquare() {
    var bestMove = findBestMoveForComputer();
    var randomNumStr;
    //alert(bestMove);
    var randomIndex = Math.floor(Math.random() * (squareIDs.length - 1));
    if(randomIndex >= 0) {
        if(bestMove == -1){
            randomNumStr = squareIDs[randomIndex].toString();
        } else {
            randomNumStr = bestMove;
        }
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

//function used for determining when someone has completed a row of their token - noughts or crosses
function isAWinner() { // used in square event handler
    if(squareIDs.length < 5) { // only needs to be checked after 5 moves have been made
        var xoArray = [];
        for(var xo of xoElements) {
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

function replay() {
    intialiseBoard();
    whoStarts(playerStartsLast);
}

//array for storing all p elements in each square where X or O is put
function intialiseBoard() {
    squareIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // reset square ids
    for(var xo of xoElements) {
        xo.innerHTML = "&nbsp";
        xo.classList.remove("X"); //remove classes
        xo.classList.remove("O"); //from each square
    }
}
noPlayAgainBtn.addEventListener("click", function(){
    intialiseBoard();
});
playAgainBtn.addEventListener("click", function(){
    replay();
});

computerStartBtn.addEventListener("click", function(){
    whoStarts(playerStarts)
});













function findBestMoveForComputer() {
    var bestMoveIndex = orderOfTokenCheck(computerToken, playerToken);
    if(bestMoveIndex == -1) {
        bestMoveIndex = orderOfTokenCheck(playerToken, computerToken);
    }
    //alert(bestMoveIndex);
    return bestMoveIndex;
}

function orderOfTokenCheck(firstTokenCheck, secondTokenCheck) {
    var xoArray = [];
        for(var xo of xoElements) {
            xoArray.push(xo.innerHTML);
        } // check all lines of board and set up string var for each line
        var row0 = (xoArray[0] + xoArray[1] + xoArray[2]);
        var row1 = (xoArray[3] + xoArray[4] + xoArray[5]);
        var row2 = (xoArray[6] + xoArray[7] + xoArray[8]);
        var col0 = (xoArray[0] + xoArray[3] + xoArray[6]);
        var col1 = (xoArray[1] + xoArray[4] + xoArray[7]);
        var col2 = (xoArray[2] + xoArray[5] + xoArray[8]);
        var diag1 = (xoArray[0] + xoArray[4] + xoArray[8]);
        var diag2 = (xoArray[2] + xoArray[4] + xoArray[6]);
    // create a dictionary to store all the above strings
    // key is used to describe the type of line
    var dict = {r0:row0, r1:row1, r2:row2,
                c0:col0, c1:col1, c2:col2,
                d1:diag1, d2:diag2};
    // iterate through each line (key) in the dictionary
    var count;
    for(var key in dict) {
        count = 0; // set counter for checking each line to 0
        for(var letter of dict[key]) { // for each letter of each string in the dict
            if(letter == firstTokenCheck) { // if letter is the same as the computers
                count++; // increase the counter
            } else if(letter == secondTokenCheck) {
                count--;
            }
        }
        if(count == 2) { // once counter is equal to 2
            var lineKeyAndLineStr = key + dict[key]; // return the line of tokens concatenated to the key  
            //alert(lineKeyAndLineStr);
            return calculateBestMoveIndex(lineKeyAndLineStr);
        }
    }
    return -1;
}



// determine the right method to calculate the computers best move index based on the string
// given which contains a) letter for line type ie r -> row, c -> column, d -> diagonal
// b) number for line type number -> row 1, 2, 3, col 1, 2, 3 or diag 1, 2 and c) str containing
// the suitable line given ie X_X, XX_, etc
function calculateBestMoveIndex(lineKeyAndLineStr) {
    var lineType = lineKeyAndLineStr.charAt(0);
    var lineTypeNum = parseInt(lineKeyAndLineStr.charAt(1));
    var lineTokenStr = lineKeyAndLineStr.substring(2);
    var gapIndex = findGapIndexInLine(lineTokenStr);
    var bestMoveResult;
    if(lineType == "r") {
        bestMoveResult = getSquareNumFromRow(lineTypeNum, gapIndex);
    } else if(lineType == "c") {
        bestMoveResult = getSquareNumFromCol(lineTypeNum, gapIndex);
    } else if(lineType == "d") {
        if(lineTypeNum == 1) {
            bestMoveResult = getSquareNumFromDiag1(gapIndex);
        } else if(lineTypeNum == 2) {
            bestMoveResult = getSquareNumFromDiag2(gapIndex);
        }
    }
    return bestMoveResult;
}

//////// code for calculating an index for the computers best move ////////

// used to get the index of a line string which has a gap ie X_X or XX_ or _XX, etc
function findGapIndexInLine(lineTokenStr) {
    var gapIndex;
    for(var letter of lineTokenStr) {
        if(letter != "X" & letter != "O") {
            gapIndex = parseInt(lineTokenStr.indexOf(letter));
            return gapIndex;
        }
    }
}
// calculate the index of game board based on where there is a gap in string line 
// for row type lines 
function getSquareNumFromRow(rowNum, gapIndex) {
    var result = 3 * rowNum + gapIndex;
    return result;
}
// calculate the index of game board based on where there is a gap in string line 
// for col type lines
function getSquareNumFromCol(colNum, gapIndex) {
    return 3 * gapIndex + colNum;
}
// calculate the index of game board based on where there is a gap in string line 
// for diagonal 1 type lines (from top left to bottom right)
function getSquareNumFromDiag1(gapIndex) {
    return 4 * gapIndex;
}
// calculate the index of game board based on where there is a gap in string line 
// for diagonal 2 type lines (from top right to bottom left)
function getSquareNumFromDiag2(gapIndex) {
    return 2 * gapIndex + 2;
}

/////////TODO/////////
//add effect on board buttons and remove the focus highlight
//add mouse pointer on the board buttons
//when pressing the board buttons fast it puts numbers on board
//can I rmeove highlighting on the board when i drag and pull the cursor across
//look into making this responsive for mobile devices