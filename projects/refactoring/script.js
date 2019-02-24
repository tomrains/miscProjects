//adding the necessary click events to each TD
document.getElementsByTagName("TD").addEventListener("click", getMoving(this));

function getMoving(td) {
  selectedPiece(td);
  allowMove(td);
}


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
  
  //turn off captureMove i
  if (captureMove) {
    vanishSquare();
  }
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
