Refactoring the vanishing chess game

- i think i do probably need to essential restructure it. show what legal moves are available, and just search in an array for tht. that's a way to naturally refactor while cutting out unnecessary crap.

- you could build the board, set up the pieces, then create the arrays that show what each piece can move to based on where it currently is.

and it's easy to figure out what the piece is by seeing what the innerhtml is.



bugs i am noticing:
- when the white pawn becomes a queen, the king doesnt go in check. (i think to fix this you might need to run check again on the king - not sure how that is working - lemme look.)
- also, when the pawn that became a queen checked the king, the game wouldnt let black make any legal moves, even though there were legal moves to make
- i believe when the queen tried to move to the diagonal right down one, it thought it was moving like a rook, which it wasnt (this is because move is set to true for some reason, when it clearly shouldnt be)

Now I deffo need to break up the castling function from the king movement function ....
...because the castling functin is such a mess

(this might just be unnecessary though now, even if it wouldve been cleaner...)
...would it hurt to make the ids like this .. 11 - 18, 21 - 18 .... 81-88? 
Then you could automatially know if the column or row ..
..were the same

SO ... fairly large problem here ...
when the king is hypothetically moving to get out of check, if IT attacks the attacking piece,
and the systems checks again to see if it's in check, it has king in its old spot and thinking...
...that the old piece is still there. so that's useless. need to change

I'd like to think about how to add a random AI. I would learn a lot that way, and it would make it easier to actually play!

So, when you play, it's now black's turn, then the AI goes. so when it switches to black's turn, call a function like...
...blackAI(), so that the other team will move randomly.
so pick a random piece, and try to move it to a random square. do this until it is successful. this is another case ..
... where it would make more sense to have a list of available moves, instead of relying on counting moves out.

ai note:
could get randomized array of the pieces and randomized array of potential moves.
and from there, loop through them all to see if they work. if they do, then we good. else, keep going!

01 02 03 04 05 06 07 08
09 10 11 12 13 14 15 16
17 18 19 20 21 22 23 24
25 26 27 28 29 30 31 32
33 34 35 36 37 38 39 40
41 42 43 44 45 46 47 48
49 50 51 52 53 54 55 56
57 58 59 60 61 62 63 64

the pawns seem to be working now.
im thinking once i get all the pieces working again, i will enact a basic AI that i can EASILY toggle on or off ...
...so i can turn off when need be while i debug


So let's see if I can get an array of arrays to work in JS.
so to move a piece ...
you would get the square it's on
you would see what type of piece it is
you would get the square it wants to go to
you would see if the square it wants to go to is a fair move under piece's dictionary/object
then you would check to make sure none are in its way
the select move i believe already does the 
let's try it for one of the pawns!

Bonus:

- if refresh used, alert user that the game will be reset if they go through with it.
- add functionality that shows the available spaces a selected piece can move to (we've have to use POSITIVE coding here... much easier ... now we are assuming true and then ruling out ones that dont fit)
- have different classes for selected pieces based on how well you're doing. if you're well ahead, they look gold and shiny... ...if oyu're behind, they look puke green and tired
- add a special class that shows when a king has been checkmated/defeated. maybe even the attacking piece can do something cool.
- simple AI so you don't have to move for other team (they can be idiots though if necessary)
- allow yourself to deselect a piece if you click it a second time
- add switch cases to appropriate lines of code
- consider changing el's in the code to somthing more descriptive
- find answer to this question: why are some of the getElementsByClassName objects so buggy, like filled with undefineds?
- read through code and address all my notes
- allow ability to see if you're in check AND the piece is selected. should overrule the other ones
- add AI
- add stalemate functionality
- let user choose if they want to be black or white
