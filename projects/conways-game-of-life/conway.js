//p.onclick = lifeAndDeath(this);
//button.onclick = oneTurn();

//gives life to squares when you click on them
function lifeAndDeath(el) {
  if (el.className == "") {
    el.className = "alive";
  }
  else {
    el.className = "";
  }
}

let life = true;

function stop() {
  this.life = false;
}

//numbers in this function will obviously need to change (i think just add numbers to the existing ones so the ids work)
//can take out the added numbers later if we delete the original!
function testSquares(speed) {
  if (this.life === false) {
    this.life = true;
    return;
  }
  speed = parseInt(speed, 10);
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
      if (theClasses[0] == "" && theClasses[1] != "") { //if first dead and second alive
        theNewClasses[0] = "alive";
      }
      else if (theClasses[0] != "" && theClasses[1] == "") { //if first alive and second dead
        theNewClasses[0] = "alive";
      }
      else if (theClasses[0] == "" && theClasses[1] == "") { //if both dead
        theNewClasses[0] = "";
      }
      else { //if both alive
        theNewClasses[0] = "";
      }
    } // last curly for first block
    else if (y > 0 && y < 63) {
      if (theClasses[y - 1] != "" && theClasses[y + 1] != "") { //if both are alive, it's dead
        theNewClasses[y] = "";
      }
      else if (theClasses[y - 1] == "" && theClasses[y + 1] == "") { //if both are alive, it's dead
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 63
      if (theClasses[63] == "" && theClasses[62] != "") { //if first dead and second alive
        theNewClasses[63] = "alive";
      }
      else if (theClasses[63] != "" && theClasses[62] == "") { //if first alive and second dead
        theNewClasses[63] = "alive";
      }
      else if (theClasses[63] == "" && theClasses[62] == "") { //if both dead
        theNewClasses[63] = "";
      }
      else { //if both alive
        theNewClasses[63] = "";
      }
    }
  } //last curly for for loop
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
      elements[j].className = "alive3";
    }
    else if (theClasses[j] == "alive3" && theNewClasses[j] == "alive") {
      elements[j].className = "alive4";
    }
    else if (theClasses[j] == "alive4" && theNewClasses[j] == "alive") {
      elements[j].className = "";
    }
    else {
    elements[j].className = theNewClasses[j];
    }
  } setTimeout(this.testSquares(speed), speed);
} //ending bracket for testSquares function

