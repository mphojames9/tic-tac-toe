const tiles = document.querySelectorAll(".tile");
const player_X = "X";
const player_O = "O";
const gameOverSec = document.querySelector(".gameOver");
const game = document.querySelector(".game");
const results = document.querySelector(".WinnerText");
let turn = player_X;

const boardState = Array(tiles.length);
boardState.fill(null);

function startGame(){
    tiles.forEach(tile => tile.addEventListener('click', tileClick))    
}

function tileClick(e) {
    if(gameOverSec.classList.contains("visible")){
        return;
    }else{
    const id = e.target.id
    if(!boardState[id-1]){
        boardState[id-1] = turn;
        e.target.innerText = turn;
        if(checkWinner() !==false){
                results.innerHTML = `Player ${turn} wins`;
                gameOverSec.classList.add("visible");
                game.style.opacity = "0.07";
                return;
        }

        turn = turn == player_X ? player_O : player_X;
        const allTilesFilledIn = boardState.every((tile) => tile !== null);
        if(allTilesFilledIn){
            results.innerHTML = "It's a Tie";
            gameOverSec.classList.add("visible");
            game.style.opacity = "0.07";
    }}
}}


const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
]

function checkWinner(){
        for (const condition of winningCombinations){
            let [a,b,c] = condition;
            if(boardState[a] && (boardState[a] == boardState[b] && boardState[a] == boardState[c])){
                return[a,b,c]
            }
        }
        return false;
    };


function reset(){
    location.reload();
}

startGame();