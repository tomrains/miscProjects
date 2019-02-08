var row1 = ["1", "2", "3", "4", "5", "6", "7", "8"];
var row2 = ["9", "10", "11", "12", "13", "14", "15", "16"]; 
var row3 = ["17", "18", "19", "20", "21", "22", "23", "24"]; 
var row4 = ["25", "26", "27", "28", "29", "30", "31", "32"]; 
var row5 = ["33", "34", "35", "36", "37", "38", "39", "40"]; 
var row6 = ["41", "42", "43", "44", "45", "46", "47", "48"]; 
var row7 = ["49", "50", "51", "52", "53", "54", "55", "56"]; 
var row8 = ["57", "58", "59", "60", "61", "62", "63", "64"]; 

var move = true;
var whitesMove = true;

//set up the teams
var blackPieces = [blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing];
var WhitePieces = [whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing];

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
  //find current selected (if there is one) so we can toggle off
  var selected = document.querySelector("td.selected");
  if (selected != null) {
    selected.classList.toggle("selected");
  }
  //if whitesMove is true, and it's white piece, then let it toggle
  if (whitesMove && whitePieces.indexOf(el.innerHTML) != -1) {
    el.classList.toggle("selected");
  }
} // last curly in selectedPiece function

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
  else if (selected.innerHTML == whiteBishop || selected.innerHTML == blackBishop) {
    moveBishop(selected, el);
  }
  else if (selected.innerHTML == whiteKing || selected.innerHTML == blackKing) {
    moveKing(selected, el);
  }
  else if (selected.innerHTML == whiteQueen || selected.innerHTML == blackQueen) {
    moveQueen(selected, el);
  }
  else if (selected.innerHTML == whiteKnight || selected.innerHTML == blackKnight) {
    moveKnight(selected, el);
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
  //check to see if in same row or same column, respectively
  if (!((((selected.id-1) / 8 >> 0) == ((el.id-1) / 8 >> 0)) || (((selected.id - el.id) % 8) == 0))) {
    move = false;
    return;
  //now need to stop it from jumping over pieces
  }
  if ((((selected.id-1) / 8) >> 0) == (((el.id-1) / 8) >> 0)) { //if in same row
    var small = Math.min(selected.id, el.id);
    var large = Math.max(selected.id, el.id);
    for (let i = small + 1; i < large; i++) {
      if (document.getElementById(i).innerHTML != "") {
        move = false;
        return;
      }
    }
  }
  if (((selected.id - el.id) % 8) == 0) { //if in same column
    var small = Math.min(selected.id, el.id);
    var large = Math.max(selected.id, el.id);
    for (let i = small + 8; i < large; i+=8) {
      if (document.getElementById(i).innerHTML != "") {
        move = false;
        return;
      }
    }
  }
}//last curly in moveRook function

//note; could probably write an "invalid move" function : move=false, return?

function moveBishop (selected, el) {
  let small = Math.min(selected.id, el.id);
  let large = Math.max(selected.id, el.id);
  if (!((large - small) % 7 == 0 || (large - small) % 9 == 0)) {
    move = false;
    return;
  }
  //make sure bishops move properly
  if ((large - small) % 7 == 0) { //if the difference is 7
    if (((small - 1) % 8) == 0 || (large % 8) == 0) {
      move = false;
      return true;
    }
    for (let i = small; i < large; i += 7) {
      // if equal to side ones
      if ( ((i % 8) == 0 || ((i - 1) % 8) == 0) && i != large && i != small) {
        move = false;
        return;
      }
      if (document.getElementById(i).innerHTML != "" && i != small && i != large) {
        move = false;
        return;
      }
    }
  }
  else if ((large - small) % 9 == 0) { // if the difference is 9
    if (((large - 1) % 8) == 0 || (small % 8) == 0) {
      move = false;
      return true;
    }
    for (let i = small; i < large; i += 9) {
      // if equal to side ones
      if ( ((i % 8) == 0 || ((i - 1) % 8) == 0 ) && i != large && i != small) {
        move = false;
        return;
      }
      if (document.getElementById(i).innerHTML != "" && i != small && i != large) {
        move = false;
        return;
      }
    }
  }
} // last curly in moveBishop function

function moveKing(selected, el) {
  var leftSideKingMoves = [8, 7, -1, -8, -9];
  var rightSideKingMoves = [9, 8, 1, -7, -8];
  var regularKingMoves = [-9, -8, -7, -1, 1, 7, 8, 9];
  var kingMovement = selected.id - el.id;
  if ((selected.id - 1) % 8 == 0) {//on left
    if (leftSideKingMoves.indexOf(kingMovement) == -1) {
      move = false;
      return;
    }
  }
  else if (selected.id % 8 == 0) {//on right
    if (rightSideKingMoves.indexOf(kingMovement) == -1) {
      move = false;
      return;
    }
  }
  else { // if in middle
    if (regularKingMoves.indexOf(kingMovement) == -1) {
      move = false;
      return;
    }
  }
} // last curly of moveKing function

function moveQueen(selected, el) {
  moveRook(selected, el);
  if (move) {
    return;
  }
  move = true;
  moveBishop(selected, el);
}

function moveKnight(selected, el) {
  var knightMovement = selected.id - el.id;
  var leftKnight = [15, 6, -10, -17];
  var secondLeftKnight = [17, 15, 6, -10, -15, -17];
  var secondRightKnight = [-17, -15, -6, 10, 15, 17];
  var rightKnight = [17, 10, -6, -15];
  var centerKnight = [17, 15, -17, -15, 10, 6, -10, -6];
  if ((selected.id - 1) % 8 == 0) { //if on left
    if (leftKnight.indexOf(knightMovement) == -1) {
      move = false;
      return;
    }
  }
  else if ((selected.id - 2) % 8 == 0) { // if 2nd to left
    if (secondLeftKnight.indexOf(knightMovement) == -1) {
      move = false;
      return;
    }
  }
  else if ((selected.id - 7) % 8 == 0) { // if 2nd to right
    if (secondRightKnight.indexOf(knightMovement) == -1) {
      move = false;
      return;
    }
  }
  else if (selected.id % 8 == 0) { //if on right
    if (rightKnight.indexOf(knightMovement) == -1) {
      move = false;
      return;
    } 
  }
  else { //if in the middle
    if (centerKnight.indexOf(knightMovement) == -1) {
      move = false;
      return;
    }
  }
} // last curly of moveKnight function



setBoard();

/*had slight epiphany that basically you let every piece move ... you put the moves through a function ..
to see if it's an illegal move. if it is, you tell it that it cant move - yay! */
