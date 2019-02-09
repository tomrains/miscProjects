Specifications



**Rules

then add functionality to turn pawns into queens when they reach the back row (this is easy, could add soon)
     
then add functionality to know when the king is in check (trickyyyy)
i would have a function at the end of a turn or allowMove function that checks to see if king is in check.
if so, it alerts somehow. could literlly just do "alert" for now.
    this function would also be useful for a check at the end of any move...
    ...if you are trying to complete a move, but it puts your own king in check, then the move is disallowed.
    
    alert when opposing king is in check
        how can you put other king in check?
            move a piece to be attacking him
            move a piece out of the way so that a separate piece is attacking him
        
    disallow moves by current team that put king in check
    
add functionality to look for checkmate. and, when this function is executed, the game ends and determines a winner
    
then add in AI

then add in functionality for castling
    way to see if king has moved
    way to see if each rook has moved
    
add in functionality for stalemate (if there is no legal move ... should be pretty easy really. (maybe famous last words tho))

then add in vanishing squares!!

1  2  3  4  5  6  7   8 
9  10 11 12 13 14 15 16
17 18 19 20 21 22 23 24
25 26 27 28 29 30 31 32
33 34 35 36 37 38 39 40
41 42 43 44 45 46 47 48
49 50 51 52 53 54 55 56
57 58 59 60 61 62 63 64

-17, -15, -6, +10, +15, +17

THE KINGS CAN MOVE!
THE QUEENS CAN MOVE! - they were so easy - who woulda thought (at the beginning at least, who woulda thought?)
THE KNIGHTS CAN MOVE!!!


//refactoring idea: would be smart to classify certain ids as being left side or right side. then we can use an easy variable.



also ... the queen will just be a mix of the rooks and bishops! woo!


need to put these in right order on if else statements ... maybe at end. because this is more ruling true
oh but some rule it out of it's not equal to 8. have to change that.

black pawns ....
not on a border...
if targeted square is 7 or 9 more, and the square.innerhtml is not ""
then move there

white pawns ....
not on a border...
if targeted square is 7 or 9 less and the square.innerhtml is not ""
then move there

(^^above ones can be woven into the existing rules)



let's let the pawns to attack, and then we can get the king working



next, let's add in king movement, just because that's so simple! we can let him fall into check for now.

NOTE: some of the el's might help if you change them to selectedSquare or moveCandidate or something similar

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
- alternate turns between black and white
- allow the pawns to capture (although we can let ALL the pieces capture eventually)
- code CASTLING (this will be nuuuut) i'm immediately thinking, okay, moveKing (of your color) cannot have been executed ever ...
- add functionality that shows the available spaces a selected piece can move to (we've have to use POSITIVE coding here...
much easier ... now we are assuming true and then ruling out ones that dont fit)
