Specifications

Goal: to create a 1D version of Conway's World

Initialize page with a set of [8] white blocks on screen in a single line.
  Let's do 8 blocks stretched vertically across the screen. That way it can work in mobile as well.
  By default, they should be white, but when clicked, they should become green (alive).
  This will require some Javascript using events. When user clicks block, block becomes the other color.
    A simple way to use this could be, display alive if true, or display dead if false.

*Allow user to select a block, changing it from white to black, or black to white.

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