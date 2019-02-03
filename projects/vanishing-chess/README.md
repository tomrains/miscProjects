Specifications

**Rules
well now i can only click the pawns once. so something's going wrong there. let's figure this out.

..and then we can add on movement by other pieces. king isnt important, but would be easy i believe


ALSO want to add in attack move for pawn! let's do that.


im thinking that a move function might contain switch cases full of functions...
...that have things like "pawn move" that determine the rules for a pawn moving
    


  ------
    
    For now, I can make it where you click a piece, click a square, and then the pieces disappears from current square and appears
    on the new square.
    
    I could see an array that has the squares, and then you insert into the square with that ID. 
    
    It would also likely be an array of arrays, then you can have roooows.
    
    So we could make it where you just want to click and move the current piece in a square to the new spot ...
    ... and have rule where you can't put piece in square that already has piece.
    
    
    [have it where you click a piece and then can see where you can move it, and that would be same code where you can only
    move a piece to one of those squares]
    
**might want to change it to where you can unselect a piece, but dont know if thats really necessary

add a selector where, if you click on it, it gets a light red border

Let the pieces move

could make it for now where just pawns can move

and then, just for fun, could start having the pieces vanish (maybe even before captures happen)

  

  
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
- if refresh used, alert user that the game will be reset if they go through with it.
