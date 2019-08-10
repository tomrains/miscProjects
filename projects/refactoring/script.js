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
