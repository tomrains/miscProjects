//we're going to start the JS code afresh!

//add event listeners for selecting a piece and allowing a move
const allSquares = document.getElementsByTagName("TD");
for (let a = 0; a < allSquares.length; a++) {
  allSquares[a].addEventListener("click", 
    function() {
      selectPiece(allSquares[a]);
    }
  );
  allSquares[a].addEventListener("click", 
    function() {
      allowMove(allSquares[a]);
    }
  );
}

let move = true;
let whitesMove = true;
let kingCapture = false;
let whitePawnAttacking = false;
let blackPawnAttacking = false;
let whitePawnBecomesQueen = false;
let blackPawnBecomesQueen = false;
let whiteInCheck = false;
let blackInCheck = false;
let captureMove = false;
let whiteLoses = false;
let blackLoses = false;
let queenAttackingLikeBishop = false;
let queenAttackingLikeRook = false;
let whiteKingHasMoved = false;
let blackKingHasMoved = false;
let leftWhiteRookHasMoved = false;
let rightWhiteRookHasMoved = false;
let leftBlackRookHasMoved = false;
let rightBlackRookHasMoved = false;
let justCastled = false;
let attackMe;
let castleInProgress = false;
let emptySquares;
let vanishID;
let selectBlackPiece;
let blackAITeam;
let botSuccess = false;
let blackAttack;
let inAILoop = false;

const blackRook = '<img src="images/black-rook.png">';
const blackKnight = '<img src="images/black-knight.png">';
const blackBishop = '<img src="images/black-bishop.png">';
const blackQueen = '<img src="images/black-queen.png">';
const blackKing = '<img src="images/black-king.png">';
const blackPawn = '<img src="images/black-pawn.png">';
const whiteRook = '<img src="images/white-rook.png">';
const whiteKnight = '<img src="images/white-knight.png">';
const whiteBishop = '<img src="images/white-bishop.png">';
const whiteQueen = '<img src="images/white-queen.png">';
const whiteKing = '<img src="images/white-king.png">';
const whitePawn = '<img src="images/white-pawn.png">';
const blackHole = '<img src="images/black-hole.png">';

const blackPieces = [blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing];
const whitePieces = [whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing];

function selectPiece(selectedPiece) {
  //disallow moves from empty squares
  if (element.innerHTML == "") {
    return;
  }
  // find most previously selected piece (if there is one)
  let lastSelectedPiece = document.querySelector("td.selected");
  //disallow any pieces from capturing a king, but lets you toggle to move a king
  if (lastSelectedPiece) {
    if (blackPieces.indexOf(lastSelectedPiece.innerHTML) != -1 && selectedPiece.innerHTML == whiteKing) {
      kingCapture = true; //remember to set this to false later
      move = false;
      return;
    }
    if (whitePieces.indexOf(lastSelectedPiece.innerHTML) != -1 && selectedPiece.innerHTML == blackKing) {
      kingCapture = true; //remember to set this to false later
      move = false;
      return;
    }
  }
  //return on capturing piece moves, so you can perform allowMove function
  if (whitePieces.indexOf(selectedPiece.innerHTML) != -1 && blackPieces.indexOf(lastSelectedPiece.innerHTML) != -1) {
    if (selectedPiece.innerHTML == whitePawn) {
      whitePawnAttacking = true;
    }
    captureMove = true;
    return;
  }
  if (blackPieces.indexOf(selectedPiece.innerHTML) != -1 && whitePieces.indexOf(lastSelectedPiece.innerHTML) != -1) {
    if (selected.innerHTML == blackPawn) {
      blackPawnAttacking = true;
    }
    captureMove = true;
    return;
  }
  //add selected class to selectedPiece
  selectedPiece.classList.toggle("selected");
  //if whitesMove is true, and it's white piece, then let it toggle. same for black pieces, too
  if ( (whitesMove && whitePieces.indexOf(lastSelectedPiece.innerHTML) != -1) || (!whitesMove && blackPieces.indexOf(lastSelectedPiece.innerHTML) != -1) ) {
    lastSelectedPiece.classList.toggle("selected");
  }
} // last curly in selectedPiece function

function allowMove(square) {
  console.log("allowMove");
}
