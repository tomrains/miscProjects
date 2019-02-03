var chess_board = [["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""], 
                   ["", "", "", "", "", "", "", ""]]; 

function setBoard() {
  var blackRook = document.getElementById("black-rook");
  document.getElementById("1").innerHTML = blackRook;
}

setBoard();
