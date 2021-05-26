/*=============================
CACHED DOM NODES
 ===================*/
 const body = document.querySelector("body");
 const board = document.querySelector("#board");
 const buttons = document.querySelectorAll(".button");
 const row1 = document.querySelectorAll(".row1");  //caches rows 1-6 of circles on board
 const row2 = document.querySelectorAll(".row2");
 const row3 = document.querySelectorAll(".row3");
 const row4 = document.querySelectorAll(".row4");
 const row5 = document.querySelectorAll(".row5");
 const row6 = document.querySelectorAll(".row6");
 const startGame = document.querySelector("#startGame")
 const modal = document.querySelector(".modal");
 const modalBeginButton = document.querySelector("#modalButton");
 const player1Input = document.querySelector("#inputModal1");
 const player2Input = document.querySelector("#inputModal2");
 const player1Display = document.querySelector("#player1");
 const player2Display = document.querySelector("#player2");
 const gameInfo = document.querySelector("#gameInfo");
 const playerTurn = document.querySelector("#playerTurn");
 const reset = document.querySelector("#reset");
/*=======================
GLOBAL VARS
====================*/
boardArray = [];
  boardArray[0] = row6;  // puts all of the rows of circles into one array
  boardArray[1] = row5;
  boardArray[2] = row4;
  boardArray[3] = row3;
  boardArray[4] = row2;
  boardArray[5] = row1;

turn = "red";
win = false;
let numRows = 6;
let numColumns= 6;
player1Name = '';
player2Name = '';
/*===========================
GAMEPLAY FUNCTIONS
=============================*/
function changeColumnColor(column){  //changes color of topmost uncolored circle div in column to red or yellow, when corresponding button is clicked.
  for(const row of boardArray){
    if (row[column].className.includes("white")){ //if circle div includes class white change the color to the color of "turn"
      row[column].classList.add(turn);
      row[column].classList.remove("white");
      break;
    }
  }
  changeTurn();// changes turn everytime button is clicked and color is played
  winCondition(); //checks for win evertyime button is clicked(changeColumnColor is attached to the event listeners)
  setPlayerTurn(); //sets display of whos turn it is in upper left corner
}

function changeTurn() { //changes turn
  if (turn === 'red'){
    turn = 'yellow';
  }else{
    turn = 'red';
  }
}

function winCondition(){ //checks for win condition (4 in a row) using functions below
  winCheckRow();
  winCheckColumn();
  winCheckLeftDiagonal();
  winCheckRightDiagonal();
  if (win === true){
    if (turn === 'red'){
      alert(`${player2Name} wins. Press reset to play again`);
    }else{
      alert(`${player1Name} wins. Press reset to play again`);
    }
  }
}

function winCheckRow(){ //checks for 4 in a row of either color along rows
   let winRedCounter = 0;
  let winYellowCounter = 0;

  for(const row of boardArray){
    for(const column of row){
      if (column.className.includes("red")){
        winRedCounter += 1;
        winYellowCounter = 0;
      } else if(column.className.includes("yellow")) {
        winYellowCounter += 1;
        winRedCounter = 0;
      } else if (column.className.includes("white")) {
        winYellowCounter = 0;
        winRedCounter = 0;
      }
      if (winRedCounter >= 4 || winYellowCounter >= 4){
        win = true;
      }

    }
    winYellowCounter = 0;
    winRedCounter = 0;
  }
}

function winCheckColumn(){ //checks for 4 in a row along columns
    let winRedCounter = 0;
    let winYellowCounter = 0;

    for(let i = 0; i < numRows; i++){
      for(let j = 0; j < numColumns; j++){
        //console.log("j is " + j);
        //console.log("i is " + i);
        //console.log(`winRedCounter is ${winRedCounter}`);
        //console.log(`winYellowCounter is ${winYellowCounter}`);
        if (boardArray[j][i].className.includes("red")){
          winRedCounter += 1;
          winYellowCounter = 0;
        }else if (boardArray[j][i].className.includes("yellow")){
          winYellowCounter += 1;
          winRedCounter = 0;
        }else if (boardArray[j][i].className.includes("white")){
          winYellowCounter = 0;
          winRedCounter = 0;
        }
        if (winRedCounter >= 4 || winYellowCounter >= 4){
          win = true;
        }

      }
      winYellowCounter = 0;
      winRedCounter = 0;
    }
}

function winCheckLeftDiagonal(){ // checks for 4 in a row along diagonals facing left (\\)
  let length = boardArray.length;
  let diagonalLines = (length + length) - 1;
  let midPoint = (diagonalLines / 2) + 1;
  let itemsInDiagonal = 0;
  let rowIndex = 0;
  let columnIndex = 0;
  let winRedCounter = 0;
  let winYellowCounter = 0;

  for (let i = 1; i <= diagonalLines; i++) {

    if (i <= midPoint) {
      itemsInDiagonal++;
      for (let j = 0; j < itemsInDiagonal; j++) {
        rowIndex = (i - j) - 1;
        columnIndex = j;
        //console.log("row is" + rowIndex);
        //console.log("column is" + columnIndex);
        //console.log(`winRedCounter is ${winRedCounter}`);
        //console.log(`winYellowCounter is ${winYellowCounter}`);
        if (boardArray[rowIndex][columnIndex].className.includes("red")){
          winRedCounter += 1;
          winYellowCounter = 0;
        }else if (boardArray[rowIndex][columnIndex].className.includes("yellow")){
          winYellowCounter += 1;
          winRedCounter = 0;
        }else if (boardArray[rowIndex][columnIndex].className.includes("white")){
          winYellowCounter = 0;
          winRedCounter = 0;
        }
        if (winRedCounter >= 4 || winYellowCounter >= 4){
          win = true;
        }
      }
    } else {
        itemsInDiagonal--;
        for (let j = 0; j < itemsInDiagonal; j++) {
          rowIndex = (length - 1) - j;
          columnIndex = (i - length) + j;
          //console.log("row is" + rowIndex);
          //console.log("column is" + columnIndex);
          //console.log(`winRedCounter is ${winRedCounter}`);
          //console.log(`winYellowCounter is ${winYellowCounter}`);
          if (boardArray[rowIndex][columnIndex].className.includes("red")){
            winRedCounter += 1;
            winYellowCounter = 0;
          }else if (boardArray[rowIndex][columnIndex].className.includes("yellow")){
            winYellowCounter += 1;
            winRedCounter = 0;
          }else if (boardArray[rowIndex][columnIndex].className.includes("white")){
            winYellowCounter = 0;
            winRedCounter = 0;
          }
          if (winRedCounter >= 4 || winYellowCounter >= 4){
            win = true;
          }
        }
      }
      winRedCounter = 0;
      winYellowCounter = 0;
    }
}

function rowIndexSwitch(rowIndex){ //mirrors the row index in order to check the right diagonals instead of left when used in winCheckRightDiagonal.
 rowIndex = 5 - rowIndex;
 return rowIndex;
}

function winCheckRightDiagonal(){ //checks for 4 in a row along diagonals facing right (//). This is the same code as winCheckLeftDiagonal except for rowIndexSwitch.
  let length = boardArray.length;
  let diagonalLines = (length + length) - 1;
  let midPoint = (diagonalLines / 2) + 1;
  let itemsInDiagonal = 0;
  let rowIndex = 0;
  let columnIndex = 0;
  let winRedCounter = 0;
  let winYellowCounter = 0;

  for (let i = 1; i <= diagonalLines; i++) {

    if (i <= midPoint) {
      itemsInDiagonal++;
      for (let j = 0; j < itemsInDiagonal; j++) {
        rowIndex = (i - j) - 1;
        rowIndex = rowIndexSwitch(rowIndex);
        columnIndex = j;
        //console.log("row is" + rowIndex);
      //  console.log("column is" + columnIndex);
      //  console.log(`winRedCounter is ${winRedCounter}`);
      //  console.log(`winYellowCounter is ${winYellowCounter}`);
        if (boardArray[rowIndex][columnIndex].className.includes("red")){
          winRedCounter += 1;
          winYellowCounter = 0;
        }else if (boardArray[rowIndex][columnIndex].className.includes("yellow")){
          winYellowCounter += 1;
          winRedCounter = 0;
        }else if (boardArray[rowIndex][columnIndex].className.includes("white")){
          winYellowCounter = 0;
          winRedCounter = 0;
        }
        if (winRedCounter >= 4 || winYellowCounter >= 4){
          win = true;
        }
      }
    } else {
        itemsInDiagonal--;
        for (let j = 0; j < itemsInDiagonal; j++) {
          rowIndex = (length - 1) - j;
          rowIndex = rowIndexSwitch(rowIndex);
          columnIndex = (i - length) + j;
        //  console.log("row is" + rowIndex);
        //  console.log("column is" + columnIndex);
        //  console.log(`winRedCounter is ${winRedCounter}`);
        //  console.log(`winYellowCounter is ${winYellowCounter}`);
          if (boardArray[rowIndex][columnIndex].className.includes("red")){
            winRedCounter += 1;
            winYellowCounter = 0;
          }else if (boardArray[rowIndex][columnIndex].className.includes("yellow")){
            winYellowCounter += 1;
            winRedCounter = 0;
          }else if (boardArray[rowIndex][columnIndex].className.includes("white")){
            winYellowCounter = 0;
            winRedCounter = 0;
          }
          if (winRedCounter >= 4 || winYellowCounter >= 4){
            win = true;
          }
        }
      }
      winRedCounter = 0;
      winYellowCounter = 0;
    }
}
/*=============================
STYLE FUNCTIONS
===============================*/
const toggleClass = (node, className) => {
  node.classList.toggle(className)
}
function setPlayerNames() {
  player1Name = player1Input.value;
  player2Name = player2Input.value;
  if (player1Input.value != null && player2Input.value != null){
    player1Display.innerHTML = `Player1: ${player1Name}`;
    player2Display.innerHTML = "Player2: " + player2Name;
  }
}

function setPlayerTurn(){
  if (turn === 'red'){
    playerTurn.innerHTML = `${player1Name}'s turn`
  } else if (turn === 'yellow'){
    playerTurn.innerHTML = `${player2Name}'s turn`
  }

}

function resetGame() {
  win = "false";
  turn = "red";
  for(const row of boardArray){
    for(const column of row){
      column.classList.add("white");
      column.classList.remove("red");
      column.classList.remove("yellow");
    }
  }
}
/*=============================
EVENT LISTENERS
===============================*/
buttons[0].addEventListener('click',function(){
  changeColumnColor(0);
});
buttons[1].addEventListener('click',function(){
  changeColumnColor(1);
});
buttons[2].addEventListener('click',function(){
  changeColumnColor(2);
});
buttons[3].addEventListener('click',function(){
  changeColumnColor(3);
});
buttons[4].addEventListener('click',function(){
  changeColumnColor(4);
});
buttons[5].addEventListener('click',function(){
  changeColumnColor(5);
});
startGame.addEventListener('click', function(){
  toggleClass(startGame, "open");
  toggleClass(modal, "open");
});
modalBeginButton.addEventListener('click', function(){
  toggleClass(board, "open");
  toggleClass(modal, "open");
  toggleClass(gameInfo, "open");
  setPlayerNames();
  setPlayerTurn();
  body.style.background = "url('https://thumbs.dreamstime.com/b/planks-dark-old-wood-texture-background-170515350.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
});
reset.addEventListener('click',function(){
resetGame()
});
