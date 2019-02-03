var chess_board = [["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""]]; 

function setBoard() {
  var blackRook = document.createElement("images/black-rook.png");
  document.innerHTML(blackRook);
}

setBoard();
