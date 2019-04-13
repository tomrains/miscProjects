//p.onclick = lifeAndDeath(this);
//button.onclick = oneTurn();

function lifeAndDeath(el) {
  el.classList.toggle("alive");
}

//the oneTurn function should execute when the user clicks the Go! button (so could probably mimick the current onclick function)
function oneTurn() {
  var classes = []; 
  var newClasses = [];
  var squares = document.getElementsByTagName('p');
  for (i=0; i<squares.length; i++) {
    classes[i] = squares[i].className;
  }
  for (z=0; z<classes.length; z++) {
    if (z == 0) {
      if (classes[z+1] == "alive") {
        newClasses[z] = "alive";
      }
      else {
        newClasses[z] = "";
      }
    } // last curly for if z == 0
    else if (z > 0 && z < 7) {
      if (classes[z - 1] == classes[z + 1]) {
        newClasses[z] = "";
      }
      else {
        newClasses[z] = "alive";
      }
    } // last curly for else if
    else { //if z == 7
      if (classes[z - 1] == "alive") {
        newClasses[z] = "alive";
      }
      else {
        newClasses[z] = "";
      }
    } // last curly for else
  } //last curly for for
  //below, im going to try looping through original node list to see if that helps
  for (i=0; i<squares.length; i++) {
    squares[i].className = newClasses[i]; //this might just change the array and not the paragraps themselbes. we'll see
  }
} //ending bracket for oneTurn function

//numbers in this function will obviously need to change (i think just add numbers to the existing ones so the ids work)
//can take out the added numbers later if we delete the original!
function testSquares() {
  var theClasses = []; 
  var theNewClasses = [];
  //making an array filled with classnames
  var borders = document.getElementsByClassName('border');
  for (j=0; j<borders.length; j++) {
    borders[j] = borders[j].className;
  }
  //loop through each to get what it should be
  for (y=0; y<theClasses.length; y++) {
  //adding the appropriate class to newClass for first block
    if (y == 0) {
      if (theClasses[11] == theClasses[y + 1]) {
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for first block
    else if (y > 0 && y < 11) {
      if (theClasses[y - 1] == theClasses[y + 1]) {
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 11
      if (theClasses[y - 1] == theClasses[0]) {
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else
  } //last curly for for
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<borders.length; j++) {
    borders[j].className = theNewClasses[j]; //this might just change the array and not the paragraps themselbes. we'll see
  }
} //ending bracket for testSquares function

