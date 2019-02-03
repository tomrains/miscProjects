Specifications

**Put pieces on the board.
  This part is easy. The thing I need to know is how to know where to display a piece.
  What I do know:
    Each square can only show on piece.
    
    For now, I can make it where you click a piece, click a square, and then the pieces disappears from current square and appears
    on the new square.
    
    I could see an array that has the squares, and then you insert into the square with that ID. 
    
    It would also likely be an array of arrays, then you can have roooows.
    
    So we could make it where you just want to click and move the current piece in a square to the new spot ...
    ... and have rule where you can't put piece in square that already has piece.
    
    
    [have it where you click a piece and then can see where you can move it, and that would be same code where you can only
    move a piece to one of those squares]

Let the pieces move

Could create function so that, when page loads, the pieces appear where they are supposed to.
**function setBoard() {
  insert images into correct positions on board using dom
  }
  
  this might be better way to put several identical pieces onto board:
  doStuff(document.querySelectorAll("#myCircle1, #myCircle2, #myCircle3, #myCircle4"));
  
  to pull an image from the html and store in a variable ... 
  var x = document.getElementbyID("images/black-rook.png");
  
  to insert a variable INTO a certain part of the html!!!
  document.getElementById('1').innerHTML = blackRook;
  
  
  put the image variables in the array (they're set at the beginning)
  then go through the array, and when you find something in array ..
    ... then you put the image variable in the corresponding location on the chessboard
  
  so first, let's create a function that displays a black rook in the upper right of table
  
  for the id that matches the array location (1 - 64 i think). could also name the rows as letters.
  
  
  **MOVEMENT FUNCTION:
  


Bonus:
- change board so the bottom right square is a white one
