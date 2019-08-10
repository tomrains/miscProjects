//we're going to start the JS code afresh!

//add event listeners for selecting a piece and allowing a move
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
