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
        newClasses[z] = "dead";
      }
    } // last curly for if z == 0
    else if (z > 0 && z < 7) {
      if (classes[z - 1] == classes[z + 1]) {
        newClasses[z] = "dead";
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
        newClasses[z] = "dead";
      }
    } // last curly for else
  } //last curly for for
  //now let's change all the styles!
  for (i=0; i<squares.length; i++) {
    if (squares[i].className != newClasses[i].className) {
      lifeAndDeath(); //i think i will need to call this on the p itself
    }
  }
} //ending bracket for oneTurn function
