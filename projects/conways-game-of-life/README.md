Specifications

Stuff I could do on June 25:

sprout author credit: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

acorn credit: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

oak download: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

baby tree: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

dead tree credit: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

Switch out the colors for images of plants - seeds, sprout, tiny tree, regular tree, tree about to die
make the page mobile responsive
would like to add some background on what it is since it's not self-explanatory

add a reset button


My Garden of Life game is inspired by Conway's Game of Life [link], a simulated world where the life and death of each square depends on the vitality of the surrounding squares. In Conway's game of life, 

In my Garden of Life, there exists a spiral garden. The red lines you see are walls dividing the plants from each other. You can play seeds wherever you like in the garden and watch them grow. If a square is touched by no live squares, it dries up and dies. If it is surrounded by two live squares, it is choked out and perishes. However, if it is surrounded by just one live square, then it thrives and advances in age. Because there are 64 squares in the garden, and each square can be empty or have a seed, sprout, sapling, an oak, or a snag (dying tree), that means there are 6 ^ 64 possible garden configurations. That is equal to 6.3340287e+49, also known as 63 quindecillion. Poke around, plant seeds, and see what happens!

I first made this using a 1D column of just five squares. I learned how to manipulate the DOM and change the appearance of the squares using a toggle function to switch CSS classes (life and death, black and white). This was the first time I had ever made something _happen_ on a page. That was a big moment for me.

________________________________

--refactoring goals:
*I would like to make it look more like a pineapple wedge. 
  -- very unsure how to do this. let me do some research. (could use a grid, and then different borders, to do this.)
  -- 12 wedges in total maybe? would be like a clock. 
  -- this site looks useful: https://css-tricks.com/the-shapes-of-css/ (something like the cone shape looks helpful)
  ideas: you could just have different images display, rather than different classes
  
  let's think about how the logic for the javascript will work in creating the right css class. i think it would help to number the id's in order, not like i have currently.

-- remember we had idea where if it was surrounded by any two living trees, it dies.
  

**I would also like there to be a button that you press, and it keeps going indefinitely.
  -- this would just call the function that changes colors every second, i believe. would use some stuff i've learned recently, too!
  
--decent outline: just have a grid, and the outer shapes in the grid can form the outline of the conway's game of life.

so how to do the logic of colors? would be easy to make the centers different colors ... yellow, light-green, green!

-- i really like the idea of having a "garden", with dividers that go around to keep it as a basically 1D garden. chessboard setup basically, with a spiral walls to keep everything one square wide.

**i would like to connect the first and last squares so their growth isn't based on just one other square. that means two others are based on three, though.
  OR -- have it like this:
  if first square alive and second square alive ... first square dies
  if first square dead and second square alive ... first square comes to life
  if first square alive and second square deadd ... first square stays alive
  if first square dead and second square dead ... stays dead


Goal: to create a 1D version of Conway's World

Initialize page with a set of [8] white blocks on screen in a single line.
  Let's do 8 blocks stretched vertically across the screen. That way it can work in mobile as well.
  By default, they should be white, but when clicked, they should become green (alive).
  This will require some Javascript using events. When user clicks block, block becomes the other color.
    A simple way to use this could be, display alive if true, or display dead if false.

Now I have the classes toggling. You are able to toggle them exactly as you wish.

*Create button to "initiate" the game.

- Okay, so now I need to figure out how the cells will know which color to turn (aka which class to toggle to)
could write a separate function for each square ...
  square1 - if 1 is green, stay alive. else die.
  2 - if class of surrounding are the same, then die. else, live.
  3 - if class of surrounding are the same, then die. else, live.
  4 - if class of surrounding are the same, then die. else, live.
  5 - if class of surrounding are the same, then die. else, live.
  6 - if class of surrounding are the same, then die. else, live.
  7 - if class of surrounding are the same, then die. else, live.
  8 - if 7 alive, live. if 7 dead, die.
  
 k, im gonna use the function below as a base for what i wanna do:
 
Might need to just have an "alive" class and an "empty" class. otherwise the toggle thing doesnt seem to work!
    
 

+++
- Will need to disallow user to click while "game is running"
- 

so determine what they all NEED to be (without changing them ... then change them. could have an array with the classes they should be)


*Allow user to press a play button that begins the Conway's game of life simulation.
  For each cell, you determine how many neighbors it has. 
    If 0 neighbors living/black, it goes dead/white (or stays dead).
    If 1 neighbor living/black, it goes living/black (or stays alive)
    If 2 neighbors are living/black, it goes dead (or stay dead).
  Then, all at once, the cells switch.
  One second pause. Cell determination happens again.
  Then, all at once, cells switch, and so on.
  The switching continues until all the cells turn white. This means they are all dead. The cycle has ended .. display message.
  
*This is how the traditional Game of Life works, from Wikipedia:
  Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  Any live cell with two or three live neighbors lives on to the next generation.
  Any live cell with more than three live neighbors dies, as if by overpopulation.
  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
  
*Of course in 1D Conway, you only have two neighbors. So how can this work?
Any live cell with zero neighbors should probably die.
Any cell with one neighbor should come to life
Any cell with two neighbors is overcrowded and dies.


**Extra credit idea:
  Allow user to select how the World works, if a square lives or dies based on the square next to it.
  
  Allow user to change speed at which Game of Life plays
  
  Allow user's to "plant" seeds, and instead of something converting immediately to green, 
  it becomes a seed if surrounded by one plant.
  
  Add buttons that also allow user to pause or to restart.
