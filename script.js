let choiceDialog = document.getElementById("choiceDialog");
let twoPlayerNameDialog = document.getElementById("twoPlayerNameDialog");
let main = document.getElementById("main");
let boardCells = document.querySelectorAll(".boardCell");
let modeHeading = document.querySelector(".main .mode h1");
let resultDialog = document.getElementById("resultDialog");

let player1Score = document.getElementById("player1Score");
let tieScore = document.getElementById("tieScore");
let player2Score = document.getElementById("player2Score");



let xORo = "X";
let whoWon = "";
let arr = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
let winMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let count = 0;
let playMode = "onePlayer";

let player1name = "";
let player2name = "";
let onePlayer = {
  player1: 0,
  tied: 0,
  player2: 0,
};
let twoPlayer = {
  player1: 0,
  tied: 0,
  player2: 0,
};


const resetFun = () => {
  arr = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
  xORo = "X";
  count = 0;
  boardCells.forEach((ele) => {
    ele.innerHTML = "";
  });
};

const resetScore = () => {
  if (playMode === "onePlayer") {
    onePlayer = {
      player1: 0,
      tied: 0,
      player2: 0,
    };
  }else{
    twoPlayer = {
      player1: 0,
      tied: 0,
      player2: 0,
    };
  }
  updateData();
  resetFun();
}
// main.style.display = "flex";
const choiceDialogOpen = () => {
  choiceDialog.showModal();
  main.style.display = "none";
};
choiceDialogOpen();
const twoPlayerNameDialogOpen = () => {
  main.style.display = "none";
  twoPlayerNameDialog.showModal();
};
const play = (e) => {
  e.preventDefault();
  choiceDialog.close();
  main.style.display = "flex";
  playMode = e.target.playMode.value;
  if (e.target.playMode.value === "twoPlayer") {
    twoPlayerNameDialogOpen();
    modeHeading.innerHTML = `Two Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user-group"></i>2p</span><span onclick="resetScore()"><i class="fa-solid fa-rotate"></i>Reset</span>`;
  } else {
    modeHeading.innerHTML = `One Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user"></i>1p</span><span onclick="resetScore()"><i class="fa-solid fa-rotate"></i>Reset</span>`;
  }
  updateData();
};
const resultDialogClose = () => {
    resultDialog.style.display = "none";
    main.style.display = "flex";
    resetFun();
}
const twoPlayerNameSubmit = (e) => {
  e.preventDefault();
  main.style.display = "flex";
  twoPlayerNameDialog.close();
  
  if (
      (e.target.player1name.value === player1name &&
        e.target.player2name.value === player2name) ||
        (e.target.player1name.value === player2name &&
            e.target.player2name.value === player1name)
            ) {
            } else {
                player1name = e.target.player1name.value;
                player2name = e.target.player2name.value;
                twoPlayer = {
                    player1: 0,
                    tied: 0,
                    player2: 0,
                };
            }
            updateData();
  boardCells.forEach((ele) => (ele.innerHTML = ""));
};

boardCells.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    if (playMode == "twoPlayer") {
      if (arr[index] === "a") {
        ele.innerHTML = xORo;
        arr[index] = xORo.toLowerCase();
        if (xORo == "X") {
          xORo = "O";
        } else {
          xORo = "X";
        }
        count++;
        checkResult(arr);
      }
    } else {
      if (arr[index] === "a") {
        if (count == 0 || xORo == "O") {
          xORo = "X";
          ele.innerHTML = xORo;
          arr[index] = xORo.toLowerCase();
          count++;
          checkResult(arr);
            // console.log("before", arr);
            if(count < 9){

                let bestMoveIndex = findBestMove(arr, "o");
                // console.log(bestMoveIndex);
                setTimeout(()=>{
                     
                  xORo = "O";
                  if (bestMoveIndex != -1) {
                      boardCells[bestMoveIndex].innerHTML = xORo;
                  }
                  arr[bestMoveIndex] = xORo.toLowerCase();
                  // console.log("after", arr);
                    checkResult(arr);
                  count++;
                },500)
            }
          
        }
      }
    }
  });
});


function updateData() {
    if (playMode === "onePlayer") {
        player1Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${onePlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>COMPUTER (O)</h3><h1>${onePlayer.player2}</h1>`;
      } else {
        player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${twoPlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>${player2name} (O)</h3><h1>${twoPlayer.player2}</h1>`;
      }
}

function openResultDialog(x){
    if (resultDialog !== null) {
        setTimeout(()=>{
            resultDialog.style.display = "block";
            main.style.display = "none";
            updateData();
        },700);
        if(x === "O"){
            if (playMode === "onePlayer") {
                onePlayer.player2++;
            }else{
                twoPlayer.player2++;
            }
            resultDialog.innerHTML = `<img src="./Assets/${playMode === "onePlayer" ? "oops.png":"congrats.gif"}" alt="" srcset="">
            <h2>${playMode === "onePlayer" ? "Computer" : player2name} won the match</h2>
            <button onclick="resultDialogClose()">Start New Game</button>`;
        }else if(x === "X"){
            if (playMode === "onePlayer") {
                onePlayer.player1++;
            }else{
                twoPlayer.player1++;
            }
            resultDialog.innerHTML = `<img src="./Assets/congrats.gif" alt="" srcset="">
            <h1>Hurre!</h1>
            <h2>${playMode === "onePlayer" ? "You" : player1name} won the match</h2>
            <button onclick="resultDialogClose()">Start New Game</button>`;
        }else{
            if (playMode === "onePlayer") {
                onePlayer.tied++;
            }else{
                twoPlayer.tied++;
            }
            resultDialog.innerHTML = `<img src="./Assets/tie.png" alt="" srcset="">
            <button onclick="resultDialogClose()">Start New Game</button>`;
        }
    }
}
function checkResult(board){
    if (isGameOver(board)) {
        // console.log("in the over");
        updateData();
        // setTimeout(resetFun,500);
        if (isWinner(board, "o")) {
            // console.log("O won");
            openResultDialog("O");
          return 1; // Computer wins
        } else if (isWinner(board, "x")) {
            // console.log("X won");
            openResultDialog("X");
          return -1; // Player wins
        } else {
            // console.log("Tied");
            openResultDialog("Tie");
          return 0; // It's a tie
        }
      }
}

function findBestMove(board, player) {
  if (isGameOver(board)) {
    if (isWinner(board, "o")) {
      return 1; 
    } else if (isWinner(board, "x")) {
      return -1;
    } else {
      return 0; 
    }
  }

  let bestMove;
  let bestScore = player === "o" ? -Infinity : Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "a") {

      board[i] = player;

      let score = findBestMove(board, player === "o" ? "x" : "o");

      board[i] = "a";

      if (player === "o") {
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  }

  if (player === "o") {
    return bestMove;
  } else {
    return bestScore;
  }
}

function isGameOver(board) {
  return !board.includes("a") || isWinner(board, "x") || isWinner(board, "o");
}

function isWinner(board, player) {
  return winMoves.some((combination) =>
    combination.every((index) => board[index] === player)
  );
}

