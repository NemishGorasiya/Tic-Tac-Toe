let choiceDialog = document.getElementById("choiceDialog");
let twoPlayerNameDialog = document.getElementById("twoPlayerNameDialog");
let main = document.getElementById("main");
let boardCells = document.querySelectorAll(".boardCell");
let modeHeading = document.querySelector(".main .mode h1");
let resultDialog = document.getElementById("resultDialog");

let player1Score = document.getElementById("player1Score");
let tieScore = document.getElementById("tieScore");
let player2Score = document.getElementById("player2Score");

let boardDiv = document.getElementById("board");

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
let computerFirst = true;
let twoPlayerStart = 'X';
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

function disableClick(){
  boardDiv.style.pointerEvents = "none";
}
function enableClick() {
  boardDiv.style.pointerEvents = "auto";
}

const resetFun = () => {
  arr = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
  // xORo = "X";
  // console.log(xORo);
  count = 0;
  boardCells.forEach((ele) => {
    ele.innerHTML = "";
  });
  computerFirst = (playMode === "onePlayer") ? !computerFirst : computerFirst;
  if(computerFirst && playMode === "onePlayer"){
    computerMove();
    count=1;
  }
  if(!computerFirst && playMode === "onePlayer"){
    xORo = 'O';
  }
  updateData();
};
function computerMove(){
  let bestMoveIndex = findBestMove(arr, "o");
                // console.log(bestMoveIndex);
                setTimeout(()=>{ 
                  xORo = "O";
                  if (bestMoveIndex != -1) {
                    bestMoveIndex=0;
                      boardCells[bestMoveIndex].innerHTML = xORo;
                  }
                  arr[bestMoveIndex] = xORo.toLowerCase();
                  // console.log("after", arr);
                    checkResult(arr);
                  count++;
                },500)
}
const resetScore = () => {
    onePlayer = {
      player1: 0,
      tied: 0,
      player2: 0,
    };
    twoPlayer = {
      player1: 0,
      tied: 0,
      player2: 0,
    };
    xORo = 'X';
    computerFirst = true;
    twoPlayerStart = 'X';
    updateData();
    resetFun();
}
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
  resetScore();
  if (e.target.playMode.value === "twoPlayer") {
    twoPlayerNameDialogOpen();
    modeHeading.innerHTML = `Two Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user-group"></i>2p</span><span onclick="resetScore()"><i class="fa-solid fa-rotate"></i>Reset</span>`;
  } else {
    modeHeading.innerHTML = `One Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user"></i>1p</span><span onclick="resetScore()"><i class="fa-solid fa-rotate"></i>Reset</span>`;
  }
};
const resultDialogClose = () => {
    resultDialog.style.display = "none";
    main.style.display = "flex";
    enableClick();
    resetFun();
}
const twoPlayerNameSubmit = (e) => {
  e.preventDefault();
  main.style.display = "flex";
  twoPlayerNameDialog.close();
  player1name = e.target.player1name.value;
  player2name = e.target.player2name.value;
  resetScore();
  boardCells.forEach((ele) => (ele.innerHTML = ""));
};

boardCells.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    if (playMode === "twoPlayer") {
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
        if (xORo == "O") {
          xORo = "X";
          ele.innerHTML = xORo;
          arr[index] = xORo.toLowerCase();
          count++;
         let res = checkResult(arr);
            // console.log("before", arr);
            if(res!== 1 && res!==-1 && res !==0){
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
          
        }else{

        }
      }
    }
  });
});


function updateData() {
  // console.log(onePlayer);
  // console.log(twoPlayer);
    if (playMode === "onePlayer") {
        player1Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE</h3><h1>${onePlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>COMPUTER (O)</h3><h1>${onePlayer.player2}</h1>`;
      } else {
        player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE</h3><h1>${twoPlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>${player2name} (O)</h3><h1>${twoPlayer.player2}</h1>`;
      }
}

function openResultDialog(x){
  // console.log("called");
    if (resultDialog !== null) {
        setTimeout(()=>{
            resultDialog.style.display = "block";
            main.style.display = "none";
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
          if (playMode === "twoPlayer") {
            if(twoPlayerStart === 'X') {
              xORo = 'O';
              twoPlayerStart = 'O';
            }else{
              xORo = 'X';
              twoPlayerStart = 'X';
            }
          }
          updateData();
    }
}
function lineThrough(){
  if (arr[0]===arr[1] && arr[1]==arr[2]) {
    boardDiv.classList.add("firstHorizontal");
  }else if(arr[3]===arr[4] && arr[4]==arr[5]){
    boardDiv.classList.add("middleHorizontal");
  }else if(arr[6]===arr[7] && arr[7]==arr[8]){
    boardDiv.classList.add("thirdHorizontal");
  }else if(arr[0]===arr[3] && arr[3]==arr[6]){
    boardDiv.classList.add("firstVertical");
  }else if(arr[1]===arr[4] && arr[4]==arr[7]){
    boardDiv.classList.add("middleVertical");
  }else if(arr[2]===arr[5] && arr[5]==arr[8]){
    boardDiv.classList.add("thirdVertical");
  }else if(arr[0]===arr[4] && arr[4]==arr[8]){
    boardDiv.classList.add("secondDiagonal");
  }else if(arr[2]===arr[4] && arr[4]==arr[6]){
    boardDiv.classList.add("firstDiagonal");
  }
  setTimeout(()=>{
    if (arr[0]===arr[1] && arr[1]==arr[2]) {
      boardDiv.classList.remove("firstHorizontal");
    }else if(arr[3]===arr[4] && arr[4]==arr[5]){
      boardDiv.classList.remove("middleHorizontal");
    }else if(arr[6]===arr[7] && arr[7]==arr[8]){
      boardDiv.classList.remove("thirdHorizontal");
    }else if(arr[0]===arr[3] && arr[3]==arr[6]){
      boardDiv.classList.remove("firstVertical");
    }else if(arr[1]===arr[4] && arr[4]==arr[7]){
      boardDiv.classList.remove("middleVertical");
    }else if(arr[2]===arr[5] && arr[5]==arr[8]){
      boardDiv.classList.remove("thirdVertical");
    }else if(arr[0]===arr[4] && arr[4]==arr[8]){
      boardDiv.classList.remove("secondDiagonal");
    }else if(arr[2]===arr[4] && arr[4]==arr[6]){
      boardDiv.classList.remove("firstDiagonal");
    }
  },500);
}
function checkResult(board){
    if (isGameOver(board)) {
      disableClick();
        // console.log("in the over");
        // updateData();
        // setTimeout(resetFun,500);
        if (isWinner(board, "o")) {
            // console.log("O won");
            lineThrough();
            openResultDialog("O");
          return 1; // Computer wins
        } else if (isWinner(board, "x")) {
            // console.log("X won");
            lineThrough();
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
let winMove;
function isWinner(board, player) {
  return winMoves.some((combination) =>
    combination.every((index) => board[index] === player)
  );
}

