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

//numbers in this function will obviously need to change
function testSquares() {
  var theClasses = []; 
  var theNewClasses = [];
  var borders = document.getElementsByClassName('border');
  for (j=0; j<borders.length; j++) {
    borders[j] = borders[j].className;
  }
  for (y=0; y<theClasses.length; y++) {
    if (y == 0) {
      if (theClasses[y+1] == "alive") {
        theNewClasses[y] = "alive";
      }
      else {
        theNewClasses[y] = "";
      }
    } // last curly for if z == 0
    else if (y > 0 && y < 7) {
      if (theClasses[y - 1] == theClasses[y + 1]) {
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    else { //if z == 7
      if (theClasses[y - 1] == "alive") {
        theNewClasses[y] = "alive";
      }
      else {
        theNewClasses[y] = "";
      }
    } // last curly for else
  } //last curly for for
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<borders.length; j++) {
    borders[j].className = theNewClasses[j]; //this might just change the array and not the paragraps themselbes. we'll see
  }
} //ending bracket for testSquares function

