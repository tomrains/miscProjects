Specifications

**Rules
    Each square can only show on piece.
    
**Next, we want to be able to move select pawns up one or two spaces. That's it for now!
if square selected and pawn and a certain square selected, then can move forward.
  move forward means ... pawn is hidden from current square. pawn is put on the newly selected square
  
  i think this would be a new function, like move. this happens when an element is red, and a square is clicked that has legal move.
  
  OKAY - so the pawn moves there. obvious glitches are you can move any piece there, and when you click it again, it vanishes.
  go you should make sure the piece has actually moved somewhere legally before you get rid of it. cool though!
  
  so for now, we should make it where the pawn can only move forward (and that will just be black pawns . white will be opposite)
  
  i dont think i can quite yet prevent other pieces from movign there. for now, i just need to restrict pawns
  to only moving in their lines. and then later i can add on the attacking piece
  
  the pawn is now moving along the line beautifully. woo!
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
- change board so the bottom right square is a white one
- make the border on inside of box:
you can use this code in the selected css class: box-shadow: inset -1px 0 0 red, inset 0 -1px 0 red, inset 1px 0 0 red, inset 0 1px 0 red;
