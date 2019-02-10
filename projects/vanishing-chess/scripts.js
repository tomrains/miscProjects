var move = true;
var whitesMove = true;
var kingCapture = false;
var whitePawnAttacking = false;
var blackPawnAttacking = false;
var whitePawnBecomesQueen = false;
var blackPawnBecomesQueen = false;
var whiteInCheck = false;
var blackInCheck = false;

var blackRook = '<img src="images/black-rook.png">';
var blackKnight = '<img src="images/black-knight.png">';
var blackBishop = '<img src="images/black-bishop.png">';
var blackQueen = '<img src="images/black-queen.png">';
var blackKing = '<img src="images/black-king.png">';
var blackPawn = '<img src="images/black-pawn.png">';
var whiteRook = '<img src="images/white-rook.png">';
var whiteKnight = '<img src="images/white-knight.png">';
var whiteBishop = '<img src="images/white-bishop.png">';
var whiteQueen = '<img src="images/white-queen.png">';
var whiteKing = '<img src="images/white-king.png">';
var whitePawn = '<img src="images/white-pawn.png">';

var blackPieces = [blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing];
var whitePieces = [whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing];

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

setBoard();

function selectedPiece(el) {
  //disallow moves from empty squares
  if (el.innerHTML == "") {
    return;
  }
  //find current selected (if there is one)
  var selected = document.querySelector("td.selected");
  //disallow any pieces from capturing a king, but lets you toggle to move a king
  if (selected) {
    if (blackPieces.indexOf(selected.innerHTML) != -1 && el.innerHTML == whiteKing) {
      kingCapture = true;
      return;
    }
    if (whitePieces.indexOf(selected.innerHTML) != -1 && el.innerHTML == blackKing) {
      kingCapture = true;
      return;
    }
  }
  //setting variable for previous selected and el, in case move must be reverted
  let previousSelected = selected;
  let previousEl = el;
  //if selected is white and el is black, return (to allow capture)
  if (selected) {
    if (whitePieces.indexOf(selected.innerHTML) != -1 && blackPieces.indexOf(el.innerHTML) != -1) {
      if (selected.innerHTML == whitePawn) {
        whitePawnAttacking = true;
      }
      return;
    }
    //if selected is black and el is white, return (to allow capture)
    if (blackPieces.indexOf(selected.innerHTML) != -1 && whitePieces.indexOf(el.innerHTML) != -1) {
      if (selected.innerHTML == blackPawn) {
        blackPawnAttacking = true;
      }
      return;
    }
  }
  if (selected != null) {
    selected.classList.toggle("selected");
  }
  //if whitesMove is true, and it's white piece, then let it toggle
  if ( (whitesMove && whitePieces.indexOf(el.innerHTML) != -1) || (!whitesMove && blackPieces.indexOf(el.innerHTML) != -1) ) {
    el.classList.toggle("selected");
  }
} // last curly in selectedPiece function

//the border isnt leaving after it moves -- need to see if order matters on these bad boys' onclicks
function allowMove(el) {
  //find selected square
  var selected = document.querySelector("td.selected");
  //if selected equal to el, then don't try to move the piece
  if (selected == el || selected == null) {
    return;
  }
  if (kingCapture) {
    kingCapture = false;
    return;
  }
  whatPieceIsIt(selected, el);
  //if move has been declared invalid, then reset move to true, and exit this function
  if (!move) {
    move = true;
    return;
  }
  if (whitePawnBecomesQueen) {
    selected.innerHTML = "";
    el.innerHTML = whiteQueen;
    selected.classList.toggle("selected");
    whitePawnBecomesQueen = false;
    move = true;
    //need to loop in the checkInCheck bit here eventually
    whitesMove = false;
    return;
  }
  if (blackPawnBecomesQueen) {
    selected.innerHTML = "";
    el.innerHTML = blackQueen;
    selected.classList.toggle("selected");
    blackPawnBecomesQueen = false;
    move = true;
    //need to loop in the checkInCheck bit here eventually
    whitesMove = true;
    return;
  }
  //grab piece inside square
  var piece = selected.innerHTML;
  //replace piece inside selected square with blank stuff
  selected.innerHTML = "";
  //change html of selected square to piece
  el.innerHTML = piece;
  //remove border from selected square
  selected.classList.toggle("selected");
  //toggle the kings' location class
  
  // see if in check. if so, disallow move.
  if (whitesMove) {
    isWhiteInCheck(selected, el);
  }
  else {
    isBlackInCheck(selected, el);
  }
  
  if (whitesMove && whiteInCheck) {
    selected.innerHTML = previousSelected.innerHTML;
    el.innerHTML = previousEl.innerhtml;
    return;
  }
  
  if (!whitesMove && blackInCheck) {
    selected.innerHTML = previousSelected.innerHTML;
    el.innerHTML = previousEl.innerhtml;
    return;
  }
  
  if (el.innerHTML == whiteKing) {
    selected.classList.toggle("hasWhiteKing");
    el.classList.toggle("hasWhiteKing");
  }
  else if (el.innerHTML == blackKing) {
    selected.classList.toggle("hasBlackKing");
    el.classList.toggle("hasBlackKing");
  }
  move = true; // that might be unnecessary
  //toggle the whitePiece of blackPiece class (could deffo turn this into a function to call, and define it elsewhere)
  if (whitesMove) {
    selected.classList.toggle("whitePiece");
    el.classList.toggle("whitePiece");
  }
  else {
    selected.classList.toggle("blackPiece");
    el.classList.toggle("blackPiece");
  }
  isWhiteInCheck(selected, el);
  if (whiteInCheck) {
    if (!whitesMove) {
      temp = document.getElementsByClassName("hasWhiteKing");
      kingInCheck = temp[0];
      kingInCheck.classList.toggle("whiteInCheck");
    }
  }
  isBlackInCheck(selected, el);
  if (blackInCheck) {
    if (whitesMove) {
      temp = document.getElementsByClassName("hasBlackKing");
      kingInCheck = temp[0];
      kingInCheck.classList.toggle("blackInCheck");
    }
  }
  //add functionality to where if you WERE in check and now you're not, toggle.
  
  //at beginning, know if the current mover is in check.
  //if it is, then implement a checker to make sure they are not in check after move. if so, disallow.
    
  //at end of turn ...
    //if opposing team in check, make sure to turn on their inCheck function
  
  //at some point, i guess when you move out of check, then you need to toggle to the correct check
  
  if (whitesMove) {
    whitesMove = false;
  }
  else {
    whitesMove = true;
  }
} //last curly of allow move function

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

// if it's a left or right side pawn, can only capture a certain way
// if it's a center pawn, it has two choices. if it's not one of these, then disallow move

function whitePawnAttack(selected, el) {
  if ((selected.id - 1) % 8 == 0) { //if a left side pawn
    if ((selected.id - el.id) != 7) {
      move = false;
      return;
    }
  }
  if (selected.id % 8 == 0) { // if a right side pawn
    if ((selected.id - el.id) != 9) {
      move = false;
      return;
    }
  }
  else { //is a center pawn
    if (!((selected.id - el.id) == 7 || (selected.id - el.id) == 9)) {
      move = false;
      return;
    }
  }
}

function blackPawnAttack(selected, el) { //same as whitePawnAttack, just with negatives
  if ((selected.id - 1) % 8 == 0) { //if a left side pawn
    if ((selected.id - el.id) != -9) {
      move = false;
      return;
    }
  }
  if (selected.id % 8 == 0) { // if a right side pawn
    if ((selected.id - el.id) != -7) {
      move = false;
      return;
    }
  }
  else { //is a center pawn
    if (!((selected.id - el.id) == -7 || (selected.id - el.id) == -9)) {
      move = false;
      return;
    }
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
  var kingHasMoved = true;
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

function isWhiteInCheck(selected, el) {
  //so this needs to also check to see if YOuR king is in check. could easily make two functions that do similar things
  //okay, i'm going to add black and white classes. might have them do something just so i can see them (for now)
  //for every piece in opposing teams array (get them by the values in those maybe? not sure)
  //try to move on the king. if any of them returns move as true, immediately return function and inCheck = true. else its false.
  
  //see if your king is in check (and eventually would disallow this move! for that reason might need to move it earlier)
  //go through all their pieces and see if they can attack where your king is
  //<<here>>//
  
  selected = el;
  temp = document.getElementsByClassName("hasWhiteKing");
  //so el will be where the white king is
  el = temp[0];
  var blackPiecesLeft = document.getElementsByClassName("blackPiece");
  
  //see if pieces can attack successfully
  for (let i = 0; i < blackPiecesLeft.length; i++) {
    piecesAttack(blackPiecesLeft[i], el);
    if (move) {
      whiteInCheck = true;
      return;
    }
  }
  //if not, set move back to true
  move = true;
} // last curly of isWhiteInCheck function


function isBlackInCheck(selected, el) {
  selected = el;
  temp = document.getElementsByClassName("hasBlackKing");
  //so el will be where the black king is
  el = temp[0];
  var whitePiecesLeft = document.getElementsByClassName("whitePiece");
  //see if pieces can attack successfully
  for (let i = 0; i < whitePiecesLeft.length; i++) {
    piecesAttack(whitePiecesLeft[i], el);
    if (move) {
      blackInCheck = true;
      return;
    }
  }
  move = true;
}

function whatPieceIsIt(selected, el) {
  if (whitePawnAttacking) {
    whitePawnAttack(selected, el);
    if (el.id < 9) {
      whitePawnBecomesQueen = true;
    }
    whitePawnAttacking = false;
  }
  else if (blackPawnAttacking) {
    blackPawnAttack(selected, el);
    if (el.id > 56) {
      blackPawnBecomesQueen = true;
    }
    blackPawnAttacking = false;
  }
  else if (selected.innerHTML == whitePawn || selected.innerHTML == blackPawn) {
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
} //last curly of whatPieceIsIt function

function piecesAttack(selected, el) {
  if (selected.innerHTML == whitePawn) {
    whitePawnAttack(selected, el);
  }
  else if (selected.innerHTML == blackPawn) {
    blackPawnAttack(selected, el);
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
}
