//adding the necessary click events to each TD
var allSquares = document.getElementsByTagName("TD");
for (let a = 0; a < allSquares.length; a++) {
  allSquares[a].addEventListener("click", 
    function() {
      selectedPiece(allSquares[a]);
    }
  );
  allSquares[a].addEventListener("click", 
    function() {
      allowMove(allSquares[a]);
    }
  );
}

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
var justCastled = false;
let attackMe;
var castleInProgress = false;
var emptySquares;
var vanishID;

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
var blackHole = '<img src="images/black-hole.png">';

var blackPieces = [blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing];
var whitePieces = [whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing];

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
  
  //if you just completed a castle, everything is already good. ignore rest of function
  if (justCastled) {
    justCastled = false;
    move = true; //move kept being false for some reason
    castleInProgress = false;
    return;
  }
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
    selected.classList.add("empty");
    el.classList.toggle("whitePiece");
    el.classList.remove("empty");
  }
  else {
    selected.classList.toggle("blackPiece");
    selected.classList.add("empty");
    el.classList.toggle("blackPiece");
    el.classList.remove("empty");
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
  
//taking out the below function for now
//   if (captureMove) {
//     vanishSquare();
//   }
  //turn off captureMove
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
  
  //add in castling functionality here
  // i believe it is important to disallow the king from moving here if he is in check...
  //...that way we don't have to reverse it later on like with other moves (switching two == annoying!)
  whitePiecesLeft = document.getElementsByClassName("whitePiece");
  blackPiecesLeft = document.getElementsByClassName("blackPiece");
  if (el.id == 3 && !castleInProgress) {//if black king moving to left, queenside
    if (blackKingHasMoved == false && leftBlackRookHasMoved == false) {
      if (!blackInCheck) {   
        if (document.getElementById("2").innerHTML == "" && document.getElementById("3").innerHTML == "" && document.getElementById("4").innerHTML == "") {
          for (var a = 2; a < 5; a++) { //for each square between them
            castleInProgress = true;
            for (let b = 0; b < whitePiecesLeft.length; b++) { // for each remaining piece
              attackMe = document.getElementById(a);
              piecesAttack(whitePiecesLeft[b], a); //see if the piece can attack any of the squares
              if (move) { //if a piece is able to move there, then exit the king moving at all
                move = false;
                castleInProgress = false;
                return;
              }
            }
          }
          document.getElementById("5").innerHTML = "";
          document.getElementById("5").classList.remove("hasBlackKing");
          document.getElementById("5").classList.remove("blackPiece");
          document.getElementById("5").classList.remove("selected");
          document.getElementById("5").classList.add("empty");
          document.getElementById("1").innerHTML = "";
          document.getElementById("1").classList.remove("blackPiece")
          document.getElementById("1").classList.add("empty");;
          document.getElementById("3").innerHTML = blackKing;
          document.getElementById("3").classList.add("hasBlackKing");
          document.getElementById("3").classList.add("blackPiece");
          document.getElementById("3").classList.remove("empty");
          document.getElementById("4").innerHTML = blackRook;
          document.getElementById("4").classList.add("blackPiece");
          document.getElementById("4").classList.add("empty");
          blackKingHasMoved = true;
          leftBlackRookHasMoved = true;
          isWhiteInCheck();
          if (whiteInCheck) {
            let temp = document.getElementsByClassName("hasWhiteKing");
            kingInCheck = temp[0];
            kingInCheck.classList.toggle("whiteInCheck");
          }
          whitesMove = true;
          justCastled = true;
          isCheckmate();
        }
      }
    }
  }
  if (el.id == 7 && !castleInProgress) {///if black king moving to right, king side
    if (blackKingHasMoved == false && rightBlackRookHasMoved == false) {
      if (!blackInCheck) {   
        if (document.getElementById("6").innerHTML == "" && document.getElementById("7").innerHTML == "") {
          for (var c = 6; c < 8; c++) { //for each square between them
            castleInProgress = true;
            for (let d = 0; d < whitePiecesLeft.length; d++) { // for each remaining piece
              attackMe = document.getElementById(c);
              piecesAttack(whitePiecesLeft[d], attackMe); //see if the piece can attack any of the squares
              if (move) { //if a piece is able to move there, then exit the king moving at all
                move = false;
                castleInProgress = false;
                return;
              }
            }
          }
          document.getElementById("5").innerHTML = "";
          document.getElementById("5").classList.remove("hasBlackKing");
          document.getElementById("5").classList.remove("blackPiece");
          document.getElementById("5").classList.remove("selected");
          document.getElementById("5").classList.add("empty");
          document.getElementById("8").innerHTML = "";
          document.getElementById("8").classList.remove("blackPiece");
          document.getElementById("8").classList.add("empty");
          document.getElementById("7").innerHTML = blackKing;
          document.getElementById("7").classList.add("hasBlackKing");
          document.getElementById("7").classList.add("blackPiece");
          document.getElementById("7").classList.remove("empty");
          document.getElementById("6").innerHTML = blackRook;
          document.getElementById("6").classList.add("blackPiece");
          document.getElementById("6").classList.remove("empty");
          blackKingHasMoved = true;
          leftBlackRookHasMoved = true;
          isWhiteInCheck();
          if (whiteInCheck) {
            let temp = document.getElementsByClassName("hasWhiteKing");
            kingInCheck = temp[0];
            kingInCheck.classList.toggle("whiteInCheck");
          }
          whitesMove = true;
          justCastled = true;
          isCheckmate();
        }
      }
    }
  }  
  if (el.id == 59 && !castleInProgress) {//if white king move to left, queenside
    if (whiteKingHasMoved == false && leftWhiteRookHasMoved == false) {
      if (!whiteInCheck) {   
        if (document.getElementById("58").innerHTML == "" && document.getElementById("59").innerHTML == "" && document.getElementById("60").innerHTML == "") {
          for (var e = 58; e < 61; e++) { //for each square between them
            castleInProgress = true;
            for (let f = 0; f < blackPiecesLeft.length; f++) { // for each remaining piece
              attackMe = document.getElementById(e);
              piecesAttack(blackPiecesLeft[f], attackMe); //see if the piece can attack any of the squares
              if (move) { //if a piece is able to move there, then exit the king moving at all
                move = false;
                castleInProgress = false;
                return;
              }
            }
          }
          document.getElementById("61").innerHTML = "";
          document.getElementById("61").classList.remove("hasWhiteKing");
          document.getElementById("61").classList.remove("whitePiece");
          document.getElementById("61").classList.remove("selected");
          document.getElementById("61").classList.add("empty");
          document.getElementById("57").innerHTML = "";
          document.getElementById("57").classList.remove("whitePiece");
          document.getElementById("57").classList.add("empty");
          document.getElementById("59").innerHTML = whiteKing;
          document.getElementById("59").classList.add("hasWhiteKing");
          document.getElementById("59").classList.add("whitePiece");
          document.getElementById("59").classList.remove("empty");
          document.getElementById("60").innerHTML = whiteRook;
          document.getElementById("60").classList.add("whitePiece");
          document.getElementById("60").classList.remove("empty");
          whiteKingHasMoved = true;
          leftWhiteRookHasMoved = true;
          isBlackInCheck();
          if (blackInCheck) {
            let temp = document.getElementsByClassName("hasBlackKing");
            kingInCheck = temp[0];
            kingInCheck.classList.toggle("blackInCheck");
          }
          whitesMove = false;
          justCastled = true;
          isCheckmate();
        }
      }
    }
  }
//   else if (el.id == 63 && castleInProgress) {//if white king moving to right, kingside
//     if (whiteKingHasMoved == false && rightWhiteRookHasMoved == false) {
//       if (document.getElementById("62").innerHTML == "" && document.getElementById("63").innerHTML == "") {
//         return;
//       }
//     }
//   }
  if (el.id == 63 && !castleInProgress) {//if white king moving to right, kingside
    if (whiteKingHasMoved == false && rightWhiteRookHasMoved == false) {
      if (!whiteInCheck) {   
        if (document.getElementById("62").innerHTML == "" && document.getElementById("63").innerHTML == "") {
          for (var g = 62; g < 64; g++) { //for each square between them
            castleInProgress = true;
            for (let h = 0; h < blackPiecesLeft.length; h++) { // for each remaining piece
              attackMe = document.getElementById(g);
              piecesAttack(blackPiecesLeft[h], attackMe); //see if the piece can attack any of the squares
              if (move) { //if a piece is able to move there, then exit the king moving at all
                move = false;
                castleInProgress = false;
                return;
              }
            }
          }
          document.getElementById("61").innerHTML = "";
          document.getElementById("61").classList.remove("hasWhiteKing");
          document.getElementById("61").classList.remove("whitePiece");
          document.getElementById("61").classList.add("empty");
          document.getElementById("61").classList.remove("selected");
          document.getElementById("64").innerHTML = "";
          document.getElementById("64").classList.remove("whitePiece");
          document.getElementById("64").classList.add("empty");
          document.getElementById("63").innerHTML = whiteKing;
          document.getElementById("63").classList.add("hasWhiteKing");
          document.getElementById("63").classList.add("whitePiece");
          document.getElementById("63").classList.remove("empty");
          document.getElementById("62").innerHTML = whiteRook;
          document.getElementById("62").classList.add("whitePiece");
          document.getElementById("62").classList.remove("empty");
          whiteKingHasMoved = true;
          rightWhiteRookHasMoved = true;
          isBlackInCheck();
          if (blackInCheck) {
            let temp = document.getElementsByClassName("hasBlackKing");
            kingInCheck = temp[0];
            kingInCheck.classList.toggle("blackInCheck");
          }
          whitesMove = false;
          justCastled = true;
          isCheckmate();
        }
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
  //the below is going to get multiple elements! not good
  let tempKing = document.getElementsByClassName("hasWhiteKing");
  let king = tempKing[0];
  //see if king can move to an adjacent space
  //change i < king.id + 9 to i < king.id + 10
  for (let i = king.id - 9; i < king.id + 10; i++) {
    moveKing(king, i);
    if (move) {
      isWhiteInCheck();
      if (!whiteInCheck) {
        //if this move is a success, switch back to being in check and exit function
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
  alertBlackWin();
} //last curly in didWhiteLose

//didBlackLose was here
function didBlackLose() {
  return;
}

function alertWhiteWin() {
  document.getElementById("whiteWins").style.display = 'block';
}

function alertBlackWin() {
  document.getElementById("blackWins").style.display = 'block';
}


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
