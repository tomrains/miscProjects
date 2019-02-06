var chess_board = [["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""]]; 

var move = true;

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
  //if selected equal to el, then don't try to move the piece
  if (selected == el || selected == null) {
    return;
  }
  if (selected.innerHTML == whitePawn || selected.innerHTML == blackPawn) {
    movePawn(selected, el);
  }
  else if (selected.innerHTML == whiteRook || selected.innerHTML == blackRook) {
    moveRook(selected, el);
  }
  //if move has been declared invalid, then reset move to true, and exit this function
  if (!move) {
    move = true;
    return;
  }
  //grab piece inside square
  var piece = selected.innerHTML;
  //replace piece inside selected square with blank stuff (could see this not working)
  selected.innerHTML = "";
  //change html of selected square to piece
  el.innerHTML = piece;
  //remove border from selected square
  selected.classList.toggle("selected");
  move = true;
}

function movePawn(selected, el) {
  //disallow pawns with pieces directly in front of them to move
  if (el.innerHTML != "") {
    move = false;
    return;
  }
  //could combine the next two else ifs ... they have the same initial condition!
  //disallow opening pawns jumping over another
  //first bit tests if it's a jump over
  if (+selected.id - +el.id == 16 || +el.id - +selected.id == 16) {
    var squareID = (+selected.id + +el.id) / 2;
    var square = document.getElementById(squareID);
    if (square.innerHTML != "") {
      move = false;
      return;
    }
  }
  //if there is a double jump 
  if (+selected.id - +el.id == 16 || +el.id - +selected.id == 16) {
    //if black pawn is not on home row
    if (selected.innerHTML == blackPawn && (selected.id < 9 || selected.id > 16)) {
      move = false;
      return;
    }
    //if white pawn is not on home row
    if (selected.innerHTML == whitePawn && (selected.id < 49 || selected.id > 56)) {
      move = false;
      return;
    }
  }
//allow black pawn to move forward 1 or 2 squares if on opening position
  else if (selected.innerHTML == blackPawn && selected.id >= 9 && selected.id <= 16) {
    if (el.id - selected.id != 8 && el.id - selected.id != 16) {
      move = false;
      return;
    }
  }
  //allow pawns in non-starting spot to only move forward one space
  else if (selected.innerHTML == blackPawn && el.id - selected.id != 8) {
    move = false;
    return;
    }
  //creating movement logic for white pawns
  else if (selected.innerHTML == whitePawn && selected.id >= 49 && selected.id <= 56) {
    if (selected.id - el.id != 8 && selected.id - el.id != 16) {
      move = false;
      return;
    }
  }
  //allow pawns in non-starting spot to only move forward one space
  else if (selected.innerHTML == whitePawn && selected.id - el.id != 8) {
    move = false;
    return;
    }
}
  
function moveRook(selected, el) {
  return;
}

setBoard();
