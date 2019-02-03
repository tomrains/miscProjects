var chess_board = [["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""]]; 

//All black pieces
var blackRook = '<img src="images/black-rook.png">';
var blackKnight = '<img src="images/black-knight.png">';
var blackBishop = '<img src="images/black-bishop.png">';
var blackQueen = '<img src="images/black-queen.png">';
var blackKing = '<img src="images/black-king.png">';
var blackPawn = '<img src="images/black-pawn.png">';

//All white pieces
var whiteRook = '<img src="images/white-rook.png">';
var whiteKnight = '<img src="images/white-knight.png">';
var whiteBishop = '<img src="images/white-bishop.png">';
var whiteQueen = '<img src="images/white-queen.png">';
var whiteKing = '<img src="images/white-king.png">';
var whitePawn = '<img src="images/white-pawn.png">';

function setBoard() {
  document.getElementById("1").innerHTML = blackRook;
  document.getElementById("2").innerHTML = blackKnight;
  document.getElementById("3").innerHTML = blackBishop;
  document.getElementById("4").innerHTML = blackQueen;
  document.getElementById("5").innerHTML = blackKing;
  document.getElementById("6").innerHTML = blackBishop;
  document.getElementById("7").innerHTML = blackKnight;
  document.getElementById("8").innerHTML = blackRook;
  document.getElementById("9").innerHTML = blackPawn;
  document.getElementById("10").innerHTML = blackPawn;
  document.getElementById("11").innerHTML = blackPawn;
  document.getElementById("12").innerHTML = blackPawn;
  document.getElementById("13").innerHTML = blackPawn;
  document.getElementById("14").innerHTML = blackPawn;
  document.getElementById("15").innerHTML = blackPawn;
  document.getElementById("16").innerHTML = blackPawn;
  document.getElementById("49").innerHTML = whitePawn;
  document.getElementById("50").innerHTML = whitePawn;
  document.getElementById("51").innerHTML = whitePawn;
  document.getElementById("52").innerHTML = whitePawn;
  document.getElementById("53").innerHTML = whitePawn;
  document.getElementById("54").innerHTML = whitePawn;
  document.getElementById("55").innerHTML = whitePawn;
  document.getElementById("56").innerHTML = whitePawn;
  document.getElementById("57").innerHTML = whiteRook;
  document.getElementById("58").innerHTML = whiteKnight;
  document.getElementById("59").innerHTML = whiteBishop;
  document.getElementById("60").innerHTML = whiteQueen;
  document.getElementById("61").innerHTML = whiteKing;
  document.getElementById("62").innerHTML = whiteBishop;
  document.getElementById("63").innerHTML = whiteKnight;
  document.getElementById("64").innerHTML = whiteRook;
}

function movePawn(selected, el) {
//allow black pawn to move forward 1 or 2 squares if on opening position
  if (selected.innerHTML == blackPawn && selected.id >= 9 && selected.id <= 16) {
    if (el.id - selected.id != 8 && el.id - selected.id != 16) {
    return;
    }
  }
  //allow pawns in non-starting spot to only move forward one space
  else if (selected.innerHTML == blackPawn && el.id - selected.id != 8) {
    return;
    }
  //creating movement logic for white pawns
  else if (selected.innerHTML == whitePawn && selected.id >= 49 && selected.id <= 56) {
    if (selected.id - el.id != 8 && selected.id - el.id != 16) {
    return;
    }
  }
  //allow pawns in non-starting spot to only move forward one space
  else if (selected.innerHTML == whitePawn && selected.id - el.id != 8) {
    return;
    }
}

function selectedPiece(el) {
  //disallow moves from empty squares
  if (el.innerHTML == "") {
    return;
  }
  var selected = document.querySelector("td.selected");
  if (selected != null) {
    selected.classList.toggle("selected");
  }
  el.classList.toggle("selected");
}

//the border isnt leaving after it moves -- need to see if order matters on these bad boys' onclicks
function allowMove(el) {
  //find selected square
  var selected = document.querySelector("td.selected");
  //if pawn, run the movePawn function
  if (el.innerHTML == whitePawn || selected.innerHTML == blackPawn) {
    movePawn(selected, el);
  }
  //grab piece inside square
  var piece = selected.innerHTML;
  //replace piece inside selected square with blank stuff (could see this not working)
  selected.innerHTML = "";
  //change html of selected square to piece
  el.innerHTML = piece;
  //remove border from selected square
  selected.classList.toggle("selected");
}

//pawn movement forward
//if you select a piece that has pawn ... pawn can only move to square exactly 8 more (except in starting position)
// so if black pawn on square 9 - 16, can move two forward or one forward
//else can only move one forward
//would need to put allowance move inside allowMove function

setBoard();
