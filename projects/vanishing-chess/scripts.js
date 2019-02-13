var move = true;
var whitesMove = true;
var kingCapture = false;
var whitePawnAttacking = false;
var blackPawnAttacking = false;
var whitePawnBecomesQueen = false;
var blackPawnBecomesQueen = false;
var whiteInCheck = false;
var blackInCheck = false;
var captureMove = false;
var whiteLoses = false;
var blackLoses = false;
var queenAttackingLikeBishop = false;
var queenAttackingLikeRook = false;
var whiteKingHasMoved = false;
var blackKingHasMoved = false;
var leftWhiteRookHasMoved = false;
var rightWhiteRookHasMoved = false;
var leftBlackRookHasMoved = false;
var rightBlackRookHasMoved = false;

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
  //if selected is white and el is black, return (to allow capture)
  if (selected) {
    if (whitePieces.indexOf(selected.innerHTML) != -1 && blackPieces.indexOf(el.innerHTML) != -1) {
      if (selected.innerHTML == whitePawn) {
        whitePawnAttacking = true;
      }
      captureMove = true;
      return;
    }
    //if selected is black and el is white, return (to allow capture)
    if (blackPieces.indexOf(selected.innerHTML) != -1 && whitePieces.indexOf(el.innerHTML) != -1) {
      if (selected.innerHTML == blackPawn) {
        blackPawnAttacking = true;
      }
      captureMove = true;
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


function allowMove(el) {
  //find selected square
  var selected = document.querySelector("td.selected");
  //if selected equal to el, then don't try to move the piece
  if (selected == el || selected == null) {
    return;
  }
  
  //setting variable for previous selected and el, in case move must be reverted
  var previousSelected = selected.innerHTML;
  var previousEl = el.innerHTML;
  
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
    //probably need to add in the "remove class" thing here for enemy pieces
    whitesMove = false;
    captureMove = false;
    return;
  }
  if (blackPawnBecomesQueen) {
    selected.innerHTML = "";
    el.innerHTML = blackQueen;
    selected.classList.toggle("selected");
    blackPawnBecomesQueen = false;
    move = true;
    //need to loop in the checkInCheck bit here eventually
    //probably need to add in the "remove class" thing here for enemy pieces
    whitesMove = true;
    captureMove = false;
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
  
  //if move was a captured move, turn off the opposing whitePiece or blackPiece class
  if (captureMove) {
    if (whitesMove) {
      el.classList.remove("blackPiece");
    }
    if (!whitesMove) {
      el.classList.remove("whitePiece");
    }
  }
  
  if (el.innerHTML == whiteKing) {
  selected.classList.remove("hasWhiteKing");
  el.classList.add("hasWhiteKing");
  }
  else if (el.innerHTML == blackKing) {
    selected.classList.remove("hasBlackKing");
    el.classList.add("hasBlackKing");
  }
  
  //will need to change above code to go back to not having king if the move isnt allowed
  
  //check to see if pieces in check. pairs with code below (refactor to make new function?)
  if (whitesMove) {
    isWhiteInCheck();
  }
  else {
    isBlackInCheck();
  }
  // see if in check. if so, disallow move.
  if (whitesMove && whiteInCheck) {
    selected.innerHTML = previousSelected;
    el.innerHTML = previousEl;
    //toggle the king locations back!
    if (el.innerHTML == whiteKing) {
      selected.classList.add("hasWhiteKing");
      el.classList.remove("hasWhiteKing");
    }
    else if (el.innerHTML == blackKing) {
      selected.classList.add("hasBlackKing");
      el.classList.remove("hasBlackKing");
    }
    //if move was a captured move, turn off the opposing whitePiece or blackPiece class
    if (captureMove) {
      if (whitesMove) {
        el.classList.add("blackPiece");
      }
      if (!whitesMove) {
        el.classList.add("whitePiece");
      }
    }
    captureMove = false;
    return;
  }
  if (!whitesMove && blackInCheck) {
    selected.innerHTML = previousSelected;
    el.innerHTML = previousEl;
    //toggle the king locations back!
    if (el.innerHTML == whiteKing) {
      selected.classList.add("hasWhiteKing");
      el.classList.remove("hasWhiteKing");
    }
    else if (el.innerHTML == blackKing) {
      selected.classList.add("hasBlackKing");
      el.classList.remove("hasBlackKing");
    }
    //if move was a captured move, turn off the opposing whitePiece or blackPiece class
    if (captureMove) {
      if (whitesMove) {
        el.classList.add("blackPiece");
      }
      if (!whitesMove) {
        el.classList.add("whitePiece");
      }
    }
    captureMove = false;
    return;
  }
  
  if (whitesMove) {
    selected.classList.toggle("whitePiece");
    el.classList.toggle("whitePiece");
  }
  else {
    selected.classList.toggle("blackPiece");
    el.classList.toggle("blackPiece");
  }
  
  //check to see if opposing king in check
  if (!whitesMove) {
    isWhiteInCheck();
    if (whiteInCheck) {
      let temp = document.getElementsByClassName("hasWhiteKing");
      kingInCheck = temp[0];
      kingInCheck.classList.toggle("whiteInCheck");
    }
  }
  if (whitesMove) {
    isBlackInCheck();
    if (blackInCheck) {
      let temp = document.getElementsByClassName("hasBlackKing");
      kingInCheck = temp[0];
      kingInCheck.classList.toggle("blackInCheck");
    }
  }
  
  //unchecks kings that are out of check if need be
  var whiteKingCheckToggled = document.getElementsByClassName("whiteInCheck");
  var blackKingCheckToggled = document.getElementsByClassName("blackInCheck");
  if (!whiteInCheck && whiteKingCheckToggled.length > 0) {
    whiteKingCheckToggled[0].classList.toggle("whiteInCheck");
  }
  if (!blackInCheck && blackKingCheckToggled.length > 0) {
    blackKingCheckToggled[0].classList.toggle("blackInCheck");
  }
  
  //turn off captureMove i
  captureMove = false;
  
  //if king moved, turn that king movement to true
  if (el.innerHTML == whiteKing) {
    whiteKingHasMoved = true;
  }
  else if (el.innerHTML == blackKing) { 
    blackKingHasMoved = true;
  }
  
  //check on the hasMoved variables for rooks
  if (selected.id == 1 && el.innerHTML == blackRook) {
    leftBlackRookHasMoved = true;
  }
  else if (selected.id == 8 && el.innerHTML == blackRook) {
    rightBlackRookHasMoved = true;
  }
  else if (selected.id == 57 && el.innerHTML == whiteRook) {
    leftWhiteRookHasMoved = true;
  }
  else if (selected.id == 64 && el.innerHTML == whiteRook) {
    rightWhiteRookHasMoved = true;
  }
  
  //now that move is done, switch to other team's move
  if (whitesMove) {
    whitesMove = false;
  }
  else {
    whitesMove = true;
  }
  
  //moved isCheckmate here so you can know at end of attacking players' turn
  isCheckmate();
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
  
  //add in castling functionality here
  // i believe it is important to disallow the king from moving here if he is in check...
  //...that way we don't have to reverse it later on like with other moves (switching two == annoying!)
  whitePiecesLeft = document.getElementsByClassName("whitePiece");
  blackPiecesLeft = document.getElementsByClassName("blackPiece");
  if (el.id == 3) {//if black king moving to left, queenside
    if (blackKingHasMoved == false && leftBlackRookHasMoved == false) {
      if (!blackInCheck) {   
        if (document.getElementByID("2").innerHTML == "") && document.getElementByID("3").innerHTML == "" && document.getElementByID("4").innerHTML == "" {
          for (var a = 2; a < 5; a++) { //for each square between them
            for (let b = 0; b < whitePiecesLeft.length; j++) { // for each remaining piece
              piecesAttack(whitePiecesLeft[b], a); //see if the piece can attack any of the squares
              if (move) { //if a piece is able to move there, then exit the king moving at all
                move = false;
                return;
              }
            }
          }
          //add in text here to show what pieces should do when they move
        }
      }
    }
  }
  else if (el.id == 7) {//if black king moving to right, king side
    if (blackKingHasMoved == false && rightBlackRookHasMoved == false) {
      if (document.getElementByID("6").innerHTML == "" && document.getElementByID("7").innerHTML == "") {
        return;
      }
    }
  }
  else if (el.id == 59) {//if white king move to left, queenside
    if (whiteKingHasMoved == false && leftWhiteRookHasMoved == false) {
      if (document.getElementByID("58").innerHTML == "" && document.getElementByID("59").innerHTML == "" && document.getElementByID("60").innerHTML == "") {
        return;
      }
    }
  }
  else if (el.id == 63) {//if white king moving to right, kingside
    if (whiteKingHasMoved == false && rightWhiteRookHasMoved == false) {
      if (document.getElementByID("62").innerHTML == "" && document.getElementByID("63").innerHTML == "") {
        return;
      }
    }
  }
    
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
    queenAttackingLikeRook = true;
    queenAttackingLikeBishop = false;
    return;
  }
  move = true;
  moveBishop(selected, el);
  if (move) {
    queenAttackingLikeBishop = true;
    queenAttackingLikeRook = false;
  }
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

function isWhiteInCheck() {
  let temp = document.getElementsByClassName("hasWhiteKing");
  let whiteKingAttacked = temp[0];
  let blackPiecesLeft = document.getElementsByClassName("blackPiece");
  
  //see if pieces can attack successfully
  for (let i = 0; i < blackPiecesLeft.length; i++) {
    piecesAttack(blackPiecesLeft[i], whiteKingAttacked);
    if (move) {
      whiteInCheck = true;
      return;
    }
  }
  //if not, set move back to true
  whiteInCheck = false;
  move = true;
} // last curly of isWhiteInCheck function


function isBlackInCheck() {
  let temp = document.getElementsByClassName("hasBlackKing");
  let blackKingAttacked = temp[0];
  let whitePiecesLeft = document.getElementsByClassName("whitePiece");
  //see if pieces can attack successfully
  for (let i = 0; i < whitePiecesLeft.length; i++) {
    piecesAttack(whitePiecesLeft[i], blackKingAttacked);
    if (move) {
      blackInCheck = true;
      return;
    }
  }
  blackInCheck = false;
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
  //default should always be set to true (trying to fix check bug)
  move = true;
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
} //last curly for piecesAttack

function isCheckmate() {
  if (whiteInCheck) {
    didWhiteLose();
  }
  if (blackInCheck) {
    didBlackLose();
  }
}

function didWhiteLose() {
  //see if king can move anywhere
  let king = document.getElementsByClassName("hasWhiteKing");
  for (let i = king.id - 9; i < king.id + 9; i++) {
    moveKing(king, i);
    if (move) {
      isWhiteInCheck();
      if (!whiteInCheck) {
        //switch back to being in check
        whiteInCheck = true;
        return;
      }
    }
  }
  //code below finds the attacking piece
  let attackers = [];
  let temp = document.getElementsByClassName("hasWhiteKing");
  let whiteKingAttacked = temp[0];
  let blackPiecesLeft = document.getElementsByClassName("blackPiece");
  //see if pieces can attack successfully
  for (let i = 0; i < blackPiecesLeft.length; i++) {
    piecesAttack(blackPiecesLeft[i], whiteKingAttacked);
    if (move) {
      attackers.push(blackPiecesLeft[i]);
    }
  }
  //now attacking piece(s) have been found
  let whitePiecesLeft = document.getElementsByClassName("whitePiece");
  if (attackers.length < 2) { //if there are multiple attackers, then life goes on.
    let temp = attackers[0];
    //see if pieces can attack successfully
    for (let i = 0; i < whitePiecesLeft.length; i++) {
      piecesAttack(whitePiecesLeft[i], temp);
      if (move) {
        isWhiteInCheck();
        if (!whiteInCheck) {
          whiteInCheck = true;
          attackers = []; //probably need to add this before every return
          return;
        }
      }
    }
  }
  //<<code here will determine if the piece can be blocked//>>
  let attackingPiece = attackers[0];
  if (attackingPiece.innerHTML == blackRook) {
    if (((attackingPiece.id / 8) >> 0) == (((whiteKingAttacked.id-1) / 8) >> 0)) { //if in same row
      var small = Math.min(attackingPiece.id, whiteKingAttacked.id);
      var large = Math.max(attackingPiece.id, whiteKingAttacked.id);
      for (let i = small + 1; i < large; i++) { //for each possible square
        for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece
          canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isWhiteInCheck();
            if (!whiteInCheck) {
              whiteInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
    if (((attackingPiece.id - whiteKingAttacked.id) % 8) == 0) { //if in same column
      var small = Math.min(attackingPiece.id, whiteKingAttacked.id);
      var large = Math.max(attackingPiece.id, whiteKingAttacked.id);
      for (let i = small + 8; i < large; i+=8) { // for each square between the pieces
        for (let j = 0; j < whitePiecesLeft.length; j++) { // for each remaining piece
          canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isWhiteInCheck();
            if (!whiteInCheck) {
              whiteInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
  } //last curly for if attacking piece is a blackRook
  if (attackingPiece.innerHTML == blackBishop) {
    let small = Math.min(attackingPiece.id, whiteKingAttacked.id);
    let large = Math.max(attackingPiece.id, whiteKingAttacked.id);
    if ((large - small) % 7 == 0) { //if the difference is 7
      for (let i = small; i < large; i += 7) {//for each possible square
        for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece}
          canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
           if (move) {
            isWhiteInCheck();
            if (!whiteInCheck) {
              whiteInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
    else if ((large - small) % 9 == 0) { // if the difference is 9
      for (let i = small; i < large; i += 9) {
        for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece}
          canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isWhiteInCheck();
            if (!whiteInCheck) {
              whiteInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    } 
  } //last curly to check for bishop
  if (attackingPiece.innerHTML == blackQueen) { // so you'd have to know how it's attacking first .. like rook or like bishop?
    moveQueen(attackingPiece, king);
    if (queenAttackingLikeBishop) { // the below code is just a copy of the above
      let small = Math.min(attackingPiece.id, whiteKingAttacked.id);
      let large = Math.max(attackingPiece.id, whiteKingAttacked.id);
      if ((large - small) % 7 == 0) { //if the difference is 7
        for (let i = small; i < large; i += 7) {//for each possible square
          for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece}
            canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isWhiteInCheck();
              if (!whiteInCheck) {
                whiteInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
      else if ((large - small) % 9 == 0) { // if the difference is 9
        for (let i = small; i < large; i += 9) {
          for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece}
            canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isWhiteInCheck();
              if (!whiteInCheck) {
                whiteInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
    }
    if (queenAttackingLikeRook) {
      if (((attackingPiece.id / 8) >> 0) == (((whiteKingAttacked.id-1) / 8) >> 0)) { //if in same row
        var small = Math.min(attackingPiece.id, whiteKingAttacked.id);
        var large = Math.max(attackingPiece.id, whiteKingAttacked.id);
        for (let i = small + 1; i < large; i++) { //for each possible square
          for (let j = 0; j < whitePiecesLeft.length; j++) {//for each possible piece
            canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isWhiteInCheck();
              if (!whiteInCheck) {
                whiteInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
      if (((attackingPiece.id - whiteKingAttacked.id) % 8) == 0) { //if in same column
        var small = Math.min(attackingPiece.id, whiteKingAttacked.id);
        var large = Math.max(attackingPiece.id, whiteKingAttacked.id);
        for (let i = small + 8; i < large; i+=8) { // for each square between the pieces
          for (let j = 0; j < whitePiecesLeft.length; j++) { // for each remaining piece
            canPieceBlock(whitePiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isWhiteInCheck();
              if (!whiteInCheck) {
                whiteInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
    }
  }
  whiteLoses = true;
  alert("Checkmate. Black wins!");
} //last curly in didWhiteLose

function didBlackLose() { //this function is JUST like didWhiteLose(), just with colors switched
  //see if king can move anywhere
  let king = document.getElementsByClassName("hasBlackKing");
  for (let i = king.id - 9; i < king.id + 9; i++) {
    moveKing(king, i);
    if (move) {
      isBlackInCheck();
      if (!blackInCheck) {
        //switch back to being in check
        blackInCheck = true;
        attackers = [];
        return;
      }
    }
  }
  //code below finds the attacking piece
  let attackers = [];
  let temp = document.getElementsByClassName("hasBlackKing");
  let blackKingAttacked = temp[0];
  let whitePiecesLeft = document.getElementsByClassName("whitePiece");
  //see if pieces can attack successfully
  for (let i = 0; i < whitePiecesLeft.length; i++) {
    piecesAttack(whitePiecesLeft[i], blackKingAttacked);
    if (move) {
      attackers.push(whitePiecesLeft[i]);
    }
  }
  //now attacking piece(s) have been found
  let blackPiecesLeft = document.getElementsByClassName("blackPiece");
  if (attackers.length < 2) { //if there are multiple attackers, then life goes on.
    let temp = attackers[0];
    //see if pieces can attack successfully
    for (let i = 0; i < blackPiecesLeft.length; i++) {
      piecesAttack(blackPiecesLeft[i], temp);
      if (move) {
        isBlackInCheck();
        if (!blackInCheck) {
          blackInCheck = true;
          attackers = []; //probably need to add this before every return
          return;
        }
      }
    }
  }
  //<<code here will determine if the piece can be blocked//>>
  let attackingPiece = attackers[0];
  if (attackingPiece.innerHTML == whiteRook) {
    if (((attackingPiece.id / 8) >> 0) == (((blackKingAttacked.id-1) / 8) >> 0)) { //if in same row
      var small = Math.min(attackingPiece.id, blackKingAttacked.id);
      var large = Math.max(attackingPiece.id, blackKingAttacked.id);
      for (let i = small + 1; i < large; i++) { //for each possible square
        for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece
          canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isBlackInCheck();
            if (!blackInCheck) {
              blackInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
    if (((attackingPiece.id - blackKingAttacked.id) % 8) == 0) { //if in same column
      var small = Math.min(attackingPiece.id, blackKingAttacked.id);
      var large = Math.max(attackingPiece.id, blackKingAttacked.id);
      for (let i = small + 8; i < large; i+=8) { // for each square between the pieces
        for (let j = 0; j < blackPiecesLeft.length; j++) { // for each remaining piece
          canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isBlackInCheck();
            if (!blackInCheck) {
              blackInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
  } //last curly for if attacking piece is a blackRook
  if (attackingPiece.innerHTML == whiteBishop) {
    let small = Math.min(attackingPiece.id, blackKingAttacked.id);
    let large = Math.max(attackingPiece.id, blackKingAttacked.id);
    if ((large - small) % 7 == 0) { //if the difference is 7
      for (let i = small; i < large; i += 7) {//for each possible square
        for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece}
          canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isBlackInCheck();
            if (!blackInCheck) {
              blackInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    }
    else if ((large - small) % 9 == 0) { // if the difference is 9
      for (let i = small; i < large; i += 9) {
        for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece}
          canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
          if (move) {
            isBlackInCheck();
            if (!blackInCheck) {
              blackInCheck = true;
              attackers = []; //probably need to add this before every return
              return;
            }
          }
        }
      }
    } 
  } //last curly to check for bishop
  if (attackingPiece.innerHTML == whiteQueen) { // so you'd have to know how it's attacking first .. like rook or like bishop?
    moveQueen(attackingPiece, king);
    if (queenAttackingLikeBishop) { // the below code is just a copy of the above
      let small = Math.min(attackingPiece.id, blackKingAttacked.id);
      let large = Math.max(attackingPiece.id, blackKingAttacked.id);
      if ((large - small) % 7 == 0) { //if the difference is 7
        for (let i = small; i < large; i += 7) {//for each possible square
          for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece}
            canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isBlackInCheck();
              if (!blackInCheck) {
                blackInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
      else if ((large - small) % 9 == 0) { // if the difference is 9
        for (let i = small; i < large; i += 9) {
          for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece}
            canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isBlackInCheck();
              if (!blackInCheck) {
                blackInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
    }
    if (queenAttackingLikeRook) {
      if (((attackingPiece.id / 8) >> 0) == (((blackKingAttacked.id-1) / 8) >> 0)) { //if in same row
        var small = Math.min(attackingPiece.id, blackKingAttacked.id);
        var large = Math.max(attackingPiece.id, blackKingAttacked.id);
        for (let i = small + 1; i < large; i++) { //for each possible square
          for (let j = 0; j < blackPiecesLeft.length; j++) {//for each possible piece
            canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isBlackInCheck();
              if (!blackInCheck) {
                blackInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
      if (((attackingPiece.id - blackKingAttacked.id) % 8) == 0) { //if in same column
        var small = Math.min(attackingPiece.id, blackKingAttacked.id);
        var large = Math.max(attackingPiece.id, blackKingAttacked.id);
        for (let i = small + 8; i < large; i+=8) { // for each square between the pieces
          for (let j = 0; j < blackPiecesLeft.length; j++) { // for each remaining piece
            canPieceBlock(blackPiecesLeft[j], i); //see if the piece can move to the square, acting as a block
            if (move) {
              isBlackInCheck();
              if (!blackInCheck) {
                blackInCheck = true;
                attackers = []; //probably need to add this before every return
                return;
              }
            }
          }
        }
      }
    }
  }
  blackLoses = true;
  alert("Checkmate. White wins!");
} //last curly in didBlackLose


function canPieceBlock(blocker, square) {
  if (blocker.innerHTML == whitePawn || blocker.innerHTML == blackPawn) {
    movePawn(blocker, square);
  }
  else if (blocker.innerHTML == whiteRook || blocker.innerHTML == blackRook) {
    moveRook(blocker, square);
  }
  else if (blocker.innerHTML == whiteBishop || blocker.innerHTML == blackBishop) {
    moveBishop(blocker, square);
  }
  else if (blocker.innerHTML == whiteKing || blocker.innerHTML == blackKing) {
    moveKing(blocker, square);
  }
  else if (blocker.innerHTML == whiteQueen || blocker.innerHTML == blackQueen) {
    moveQueen(blocker, square);
  }
  else if (blocker.innerHTML == whiteKnight || blocker.innerHTML == blackKnight) {
    moveKnight(blocker, square);
  } 
}

function castle() {
  //you get here if the king hasn't moved yet and is trying to move to one of these weird squares
  //if castle option 1
  //else if castle option 2
  //else if castle option 3
  //else if castle option 4
  return;
}
