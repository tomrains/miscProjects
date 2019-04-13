//p.onclick = lifeAndDeath(this);
//button.onclick = oneTurn();

function lifeAndDeath(el) {
  if (el.className == "") {
    el.className = "alive";
  }
  else {
    el.className = "";
  }
}

//numbers in this function will obviously need to change (i think just add numbers to the existing ones so the ids work)
//can take out the added numbers later if we delete the original!
function testSquares() {
  var theClasses = []; 
  var theNewClasses = [];
  var elements = [];
  //making an array filled with the square elements
  for (i=0; i<64; i++) {
    var square = document.getElementById(i);
    elements[i] = square;
  }
  //fill an array with class names
  for (j=0; j<elements.length; j++) {
    theClasses[j] = elements[j].className;
  }
  //loop through each to get what it should be
  for (y=0; y<theClasses.length; y++) {
  //adding the appropriate class to newClass for first block
    if (y == 0) {
      //if the second square isn't dead
      if (theClasses[1] != "") {
        theNewClasses[y] = "alive";
      }
      else { //if the square is dead
        theNewClasses[y] = "";
      }
    } // last curly for first block
    else if (y > 0 && y < 63) {
      if (theClasses[y - 1] == theClasses[y + 1]) {
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 63
      if (theClasses[62] != "") { //if the second to last square isnt dead
        theNewClasses[y] = "alive";
      }
      else {
        theNewClasses[y] = "";
      }
    } // last curly for else
  } //last curly for for
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<theClasses.length; j++) {
    if (theClasses[j] == "alive" && theNewClasses[j] == "alive") {
      elements[j].className = "alive1";
    }
    else if (theClasses[j] == "alive1" && theNewClasses[j] == "alive") {
      elements[j].className = "alive2";
    }
    //it would also be cool if, after being alive for 3, it always dies (might make it look cooler, who knows?)
    else if (theClasses[j] == "alive2" && theNewClasses[j] == "alive") {
      elements[j].className = "alive2";
    }
    else {
    elements[j].className = theNewClasses[j];
    }
  }
} //ending bracket for testSquares function

