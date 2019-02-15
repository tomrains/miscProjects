Specifications

**Rules
the vanishing squares idea is cute. next i would add AI (if possible)

Refactoring is also not a bad idea at all, or reading through the comments. Also totally acceptable to move on to new project! :)

//so, at end of capture move, add a vanishing square!
add line 304, we see the capturemove thing. if it's true, do it.



we need stalemate functionality next. please be easy??
I would like to add in a simple AI just so I don't have to move them all, but we'll see. that might be supah hard. D:


->>>> to check for stalemate
if king is NOT currently in check, then check for this
look at all your current available moves, and if they all lead to king being in check, then its stalemate
//see if king can move to a square that isn't in check
// see if any piece can move anywhere without king being in check (does this include blocking? I guess not, cuz king not in check)

i almost wonder if this would be easier with the AI enacted. my gut tells me the AI i build would know available spaces immediately.
i could use an index that has available spots to move to to try

ugh this part will actually probably be really tough.




1  2  3  4  5  6  7   8
9  10 11 12 13 14 15 16
17 18 19 20 21 22 23 24
25 26 27 28 29 30 31 32
33 34 35 36 37 38 39 40
41 42 43 44 45 46 47 48
49 50 51 52 53 54 55 56
57 58 59 60 61 62 63 64


Bonus:
- if refresh used, alert user that the game will be reset if they go through with it.
- add functionality that shows the available spaces a selected piece can move to (we've have to use POSITIVE coding here...
much easier ... now we are assuming true and then ruling out ones that dont fit)
- have different classes for selected pieces based on how well you're doing. if you're well ahead, they look gold and shiny...
...if oyu're behind, they look puke green and tired
- add a special class that shows when a king has been checkmated/defeated. maybe even the attacking piece can do something cool.
- simple AI so you don't have to  move for other team (they can be idiots though if necessary)
- allow yourself to deselect a piece if you click it a second time
- add switch cases to appropriate lines of code
- consider changing el's in the code to somthing more descriptive
- find answer to this question: why are some of the getElementsByClassName objects so buggy, like filled with undefineds?
- read through code and address all my notes
- allow ability to see if you're in check AND the piece is selected. should overrule the other ones

Refactoring Ids:
Might make sense to classify certain ids as right side or left side, 2nd left, 2nd right, to make determining where they are easy
