let choiceDialog = document.getElementById("choiceDialog");
let twoPlayerNameDialog = document.getElementById("twoPlayerNameDialog");
let main = document.getElementById("main");
let boardCells = document.querySelectorAll(".boardCell");
let modeHeading = document.querySelector(".main .mode h1");

let player1Score = document.getElementById("player1Score");
let tieScore = document.getElementById("tieScore");
let player2Score = document.getElementById("player2Score");

let xORo = 'X';
let whoWon = '';
let arr = ['a','a','a','a','a','a','a','a','a'];
let winMoves = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
let count = 0;
let playMode = "onePlayer";
let defaultScore = {
    player1:0,
    tied:0,
    player2:0
}
let player1name = "";
let player2name = "";
let onePlayer = {
    player1:0,
    tied:0,
    player2:0
};
let twoPlayer = {
    player1:0,
    tied:0,
    player2:0
};


window.addEventListener("DOMContentLoaded",()=>{
    if (playMode === "onePlayer") {
        player1Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${onePlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>COMPUTER (O)</h3><h1>${onePlayer.player2}</h1>`;
    }else{
        player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${twoPlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>${player2name} (O)</h3><h1>${twoPlayer.player2}</h1>`;
    }
})

const resetFun = () => {
    arr = ['a','a','a','a','a','a','a','a','a'];
    // console.log(arr);
    xORo = 'X';
    // console.log(xORo);
    count = 0;
    boardCells.forEach((ele)=>{
        ele.innerHTML = "";
    })
}
// main.style.display = "flex";
const choiceDialogOpen = () => {
    choiceDialog.showModal();
    main.style.display = "none";
}
choiceDialogOpen();
const twoPlayerNameDialogOpen = () => {
    main.style.display = "none";
    twoPlayerNameDialog.showModal();
}
const play = (e) => {
    e.preventDefault();
    choiceDialog.close();
    main.style.display = "flex";
    // console.log(e.target.playMode.value);
    playMode = e.target.playMode.value;
    // alert(playMode);
    if (e.target.playMode.value === "twoPlayer") {

        twoPlayerNameDialogOpen();
        modeHeading.innerHTML = `Two Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user-group"></i>2p</span>`;
        // let scores = JSON.parse(localStorage.getItem("twoPlayer"));
        player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${twoPlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>${player2name} (O)</h3><h1>${twoPlayer.player2}</h1>`;
    }else{
        modeHeading.innerHTML = `One Player <span onclick="choiceDialogOpen()"> <i class="fa-solid fa-user"></i>1p</span>`;
        // let scores = JSON.parse(localStorage.getItem("onePlayer"));
        player1Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${onePlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>COMPUTER (O)</h3><h1>${onePlayer.player2}</h1>`;
    }
}



const twoPlayerNameSubmit = (e) => {
    e.preventDefault();
    console.log("player1",e.target.player1name.value);
    console.log("player2",e.target.player2name.value);
    main.style.display = "flex";
    twoPlayerNameDialog.close();
    // let scores = JSON.parse(localStorage.getItem("onePlayer"));
    
    if ((e.target.player1name.value === player1name && e.target.player2name.value === player2name)||(e.target.player1name.value === player2name && e.target.player2name.value === player1name)) {
        
    }else{
        player1name = e.target.player1name.value;
        player2name = e.target.player2name.value;
        twoPlayer = {
            player1:0,
            tied:0,
            player2:0
        };
    }
    player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
        tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${twoPlayer.tied}</h1>`;
        player2Score.innerHTML = `<h3>${player2name} (O)</h3><h1>${twoPlayer.player2}</h1>`;
    boardCells.forEach(ele=>ele.innerHTML = '');
   
}

boardCells.forEach((ele,index)=>{
    ele.addEventListener("click",()=>{
        ele.innerHTML = xORo;
        arr[index] = xORo;
        if (xORo == 'X') {
            xORo = 'O';
        }else{
            xORo = 'X';
        }
        count++;
      setTimeout(()=>{
        let res = result();
        if (count==9 && !res) {
            alert("tied");
            xORo = 'X';
            resetFun();
            // alert("tied");
            if (playMode === "onePlayer") {
                onePlayer.tied++;
                tieScore.innerHTML = `<h3>TIE (X)</h3><h1>${onePlayer.tied}</h1>`;
            }else{
                twoPlayer.tied++;
                tieScore.innerHTML = `<h3>TIE</h3><h1>${twoPlayer.tied}</h1>`;
            }
        }
      },500)
        // console.log(arr);
        // console.log(whoWon);
    })
})

const result = () => {
   return ( winMoves.some(ele => {
        if(arr[ele[0]]=='X' && arr[ele[1]]=='X' && arr[ele[2]]=='X'){
           
            // console.log("before reset");
            // console.log("after reset");
            // whoWon = 'X';
            console.log("x won");
            // arr = ['a','a','a','a','a','a','a','a','a'];
            if (playMode === "onePlayer") {
                onePlayer.player1++;
                player1Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player1}</h1>`;
            }else{
                twoPlayer.player1++;
                player1Score.innerHTML = `<h3>${player1name} (X)</h3><h1>${twoPlayer.player1}</h1>`;
            }
            alert("x won");
            resetFun();
            // boardCells.forEach(ele=>ele.innerHTML = '');
            return true;
        }
        if(arr[ele[0]]=='O' && arr[ele[1]]=='O' && arr[ele[2]]=='O'){
           
            // whoWon = 'O';
            // console.log("o won");
            
            // arr = ['a','a','a','a','a','a','a','a','a'];
            if (playMode === "onePlayer") {
                onePlayer.player2++;
                player2Score.innerHTML = `<h3>YOU (X)</h3><h1>${onePlayer.player2}</h1>`;
            }else{
                twoPlayer.player2++;
                player2Score.innerHTML = `<h3>${player2name} (X)</h3><h1>${twoPlayer.player2}</h1>`;
            }
            alert("o won");
            resetFun();
            // boardCells.forEach(ele=>ele.innerHTML = '');
            return true;
        }
    })
   )
}


