// constants
//const maxTurns = 9;

//state variables
var currentBoard;
var whoseTurn; //1 is x or -1 is o 
var playerLetter;
var winner;

//cached elements
boardEl = document.querySelector('.board');
resetBtn = document.querySelector('button');
boardSpaces = document.querySelectorAll('div');
messageEl = document.querySelector('h2');
playerTurnEl = document.querySelector('h3');

//event listeners
boardEl.addEventListener('click', boardClickEventHandler);
resetBtn.addEventListener('click', resetButtonEventHandler);

//functions
function init() {
    winner = false;
    messageEl.textContent = "";
    currentBoard = [];
    for (let i=0; i<3;i++){
        let rows = [];
        for (let j=0;j<3;j++){
            rows.push(0);
        }
        currentBoard.push(rows);
    }
    whoseTurn = 1;
    render();
    playerLetter = (whoseTurn === 1) ? 'O':'X';
    playerTurnEl.textContent = `${playerLetter} goes first`;
}


function boardClickEventHandler(evt) {
    //handle if clicked already market box or outside of box
    if (evt.target.tagName == 'section') {return;}
    if (evt.target.classList.contains('x') || 
        evt.target.classList.contains('o') ||
        winner) {return;}
    
    //update current board
    let row = parseInt(evt.target.dataset.row);
    let col = parseInt(evt.target.dataset.column);
    currentBoard[row][col] = whoseTurn;
    
    //update player turn
    checkWinner();
    whoseTurn = whoseTurn * -1;
    render();
}

// Move Model state to UI
function render() {
    //turn current board on screen (-1 = x player, 1 = o polayer)
    boardSpaces.forEach(function(boardSpace){
        let row = boardSpace.dataset.row;
        let col = boardSpace.dataset.column;
        if (currentBoard[row][col] === 0) {
            boardSpace.removeAttribute('class');
        } else if (currentBoard[row][col] === 1) {
            boardSpace.setAttribute('class','o');
        } else if (currentBoard[row][col] === -1) {
            boardSpace.setAttribute('class','x');
        }
    });
    playerLetter = (whoseTurn === 1) ? 'O':'X';
    playerTurnEl.textContent = `${playerLetter}'s turn`;
}

function checkWinner() {
    //sum rows/columns/diagonals and pushes them to an array to be check for winner
    //also check's for Cat game
    let allBoxesFilled = true;
    let sums = [];
    let col0Sum = 0;
    let col1Sum = 0;
    let col2Sum = 0;
    currentBoard.forEach(function(row){
        let rowSum = 0;
        //sums columns
        col0Sum = col0Sum + row[0];
        col1Sum = col1Sum + row[1];
        col2Sum = col2Sum + row[2];
        row.forEach(function(rowNums){
            //check if any empty boxes left
            if (rowNums == 0 && allBoxesFilled) {allBoxesFilled = false;}
            //sums rows
            rowSum = rowSum+rowNums;
        });
        sums.push(rowSum);
    });
    sums.push(col0Sum);
    sums.push(col1Sum);
    sums.push(col2Sum);
    
    //sum diagonals
    let cross1 = currentBoard[0][0] + currentBoard[1][1] + currentBoard[2][2];
    let cross2 = currentBoard[2][0] + currentBoard[1][1] + currentBoard[0][2];
    sums.push(cross1);
    sums.push(cross2);
    
    //display winner message
    for (let i = 0; i < sums.length; i++) {
        if (sums[i] < -2) {
            messageEl.textContent = `X wins. Congratulations!!!!`;
            winner = true;
            break;
        } else if ( sums[i] > 2) {
            messageEl.textContent = `O wins. Congratulations!!!!`;
            winner = true;
            break;
        } 
    }
    if (allBoxesFilled && !winner) {
        messageEl.textContent = `Cat's Game. Try Again?`;
        playerTurnEl.textContent = "";
    }
}

function resetButtonEventHandler(evt) {
    init();
}

init();
