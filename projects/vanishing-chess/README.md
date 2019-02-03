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

add a selector where, if you click on it, it gets a light red border

Let the pieces move


  

  
  put the image variables in the array (they're set at the beginning)
  then go through the array, and when you find something in array ..
    ... then you put the image variable in the corresponding location on the chessboard
  
  so first, let's create a function that displays a black rook in the upper right of table
  
  for the id that matches the array location (1 - 64 i think). could also name the rows as letters.
  
  
  **MOVEMENT FUNCTION:
  so you select one and then, when you click another one, you can move the ONE element with class selected to that point!
  
  i think you would make if you select a location WITH an opposite piece where a move IS illegal, then you just switch
  will also need rule where ONLY black moves, then ONLY white moves, then ONLY black moves, and so on.

Bonus:
- change board so the bottom right square is a white one
- make the border on inside of box:
you can use this code in the selected css class: box-shadow: inset -1px 0 0 red, inset 0 -1px 0 red, inset 1px 0 0 red, inset 0 1px 0 red;
