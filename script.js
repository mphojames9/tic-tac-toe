const tiles = document.querySelectorAll('.tile');
const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
let turn = PLAYER_ONE;

const boardState = Array(tiles.length);
boardState.fill(null);

//elements
const strike = document.getElementById('strike');
const gameOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('play-again');
const clickSound = new Audio ("sounds/click.wav");
const gameOverSound = new Audio ("sounds/gameover.wav");

//Adding eventListener to each tile
tiles.forEach((tile)=>tile.addEventListener('click', tileClick));

function setHoverText(){
    //remove any existing hover text
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;
    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    })
}

setHoverText()
function tileClick(e){
    if (gameOverArea.classList.contains('visible')){
        return;
    }

    const tile = e.target;
    const tileNumber = tile.dataset.index
    if(tile.innerText !=""){
        return;
    }
// Player one's turn
    if (turn === PLAYER_ONE){
        tile.innerText = PLAYER_ONE;
        boardState [tileNumber-1] = PLAYER_ONE;
        turn = PLAYER_TWO;
    }
// player two's turn
    else{
        tile.innerText = PLAYER_TWO;
        boardState [tileNumber-1] = PLAYER_TWO;
        turn = PLAYER_ONE
    }
    clickSound.play();
    setHoverText();
    checkWinner();
}

function checkWinner() {
    for (const winningCombination of winningCombinations) {
        const { combo, strikeClass } = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];


    if(tileValue1 != null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3) {
            strike.classList.add(strikeClass);
            gameOverScreen (tileValue1);
            return;
        }

// I am going to define a draw function
const allTileFilledIn = boardState.every((tile) =>tile !== null);
if (allTileFilledIn){
    gameOverArea.className = "visible";
    gameOverText.innerText = 'Draw Game'};
}};


//Winning function
function gameOverScreen(winnerText){
    if (winnerText != null);
    {
        text = `Winner is ${winnerText}!`;
    }
    gameOverSound.play();
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
}



//setting winning combinations

const winningCombinations = [
    //Rows
    { combo: [1,2,3], strikeClass: "strike-row-1"},
    { combo: [4,5,6], strikeClass: "strike-row-2"},
    { combo: [7,8,9], strikeClass: "strike-row-3"},

    //Colunms
    { combo: [1,4,7], strikeClass:"strike-column-1"},
    { combo: [2,5,8], strikeClass:"strike-column-2"},
    { combo: [3,6,9], strikeClass:"strike-column-3"},

    //diagonals
    {combo: [1,5,9], strikeClass: "strike-diagonal-1"},
    {combo: [3,5,7], strikeClass: "strike-diagonal-2"},
]

//Play again or restart button
playAgain.addEventListener('click', function() {
    location.reload();
});

