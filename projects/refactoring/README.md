Refactoring the vanishing chess game

I'd like to think about how to add a random AI. I would learn a lot that way, and it would make it easier to actually play!

So, when you play, it's now black's turn, then the AI goes. so when it switches to black's turn, call a function like...
...blackAI(), so that the other team will move randomly.
so pick a random piece, and try to move it to a random square. do this until it is successful. this is another case ..
... where it would make more sense to have a list of available moves, instead of relying on counting moves out.

ai note:
could get randomized array of the pieces and randomized array of potential moves.
and from there, loop through them all to see if they work. if they do, then we good. else, keep goingl


So let's see if I can get an array of arrays to work in JS.

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
