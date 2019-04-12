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

function testSquares() {
  var classes = []; 
  var newClasses = [];
  var squares = document.getElementsByTagName('td');
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
} //ending bracket for testSquares function

