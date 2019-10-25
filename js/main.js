// constants
const maxTurns = 9;

//state variables
var currentBoard;
var whoseTurn; //1 is x or -1 is o 


//cached elements
boardEl = document.querySelector('.board');
resetBtn = document.querySelector('button');
boardSpaces = document.querySelectorAll('div');
messageEl = document.querySelector('h2');

//event listeners
boardEl.addEventListener('click', boardClickEventHandler);
resetBtn.addEventListener('click', resetButtonEventHandler);



//functions
function init() {
    messageEl.textContent = "";
    currentBoard = [];
    for (let i=0; i<3;i++){
        let intermediateBoard = [];
        for (let j=0;j<3;j++){
            intermediateBoard.push(0);
        }
        currentBoard.push(intermediateBoard);
    }
    whoseTurn = 1;
    render();
}

function boardClickEventHandler(evt) {
    if (evt.target.tagName == 'section') {return;}
    if (evt.target.classList.contains('x') || evt.target.classList.contains('o')) {return;}
    
    //update current board
    let row = parseInt(evt.target.dataset.row);
    let col = parseInt(evt.target.dataset.column);
    currentBoard[row][col] = whoseTurn;
    
    //update player turn
    whoseTurn = whoseTurn * -1;
    render();
}

function render() {
    //turn current board on screen (-1 = x, 1 = o)
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

    //sum rows/columns/diagonals and pushes them to an array to be check for winner
    //check rows
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

    //
    checkWinner(sums);
}

function checkWinner(sums) {
    sums.forEach(function(num){
        if (num < -2) {
        messageEl.textContent = `X wins. Congratulations!!!!`;
        // display reset
        return;
    } else if ( num > 2) {
        messageEl.textContent = `O wins. Congratulations!!!!`;
        //display reset
        return;
    }
    });
}

function resetButtonEventHandler(evt) {
    init();
}

init();
