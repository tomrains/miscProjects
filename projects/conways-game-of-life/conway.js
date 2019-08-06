//p.onclick = lifeAndDeath(this);
//button.onclick = oneTurn();

let acorn = '<img src="acorn.png">';
let sprout = '<img src="sprout.png">';
let pine = '<img src="pine.png">';
let oak = '<img src="oak.png">';
let deadtree = '<img src="dead-tree.png">';
let counter = 0;
let year;

//gives life to squares when you click on them
function lifeAndDeath(el) {
  if (el.innerHTML == "") {
    el.innerHTML = acorn;
    el.className = "alive";
  }
  else {
    el.innerHTML = "";
    el.className = "";
  }
}

let life = true;
let slow = true;
let normal = true;
let fast = true;
let speed;

function stop() {
  this.slow = false;
  this.normal = false;
  this.fast = false;
  document.getElementById("slow").disabled = false;
  document.getElementById("normal").disabled = false;
  document.getElementById("fast").disabled = false;
  document.getElementById("stop").disabled = true;
}

function slowTrue() {
  this.slow = true;
  document.getElementById("slow").disabled = true;
  document.getElementById("stop").disabled = false;
}

function normalTrue() {
  this.normal = true;
  document.getElementById("normal").disabled = true;
  document.getElementById("stop").disabled = false;
}

function fastTrue() {
  this.fast = true;
  document.getElementById("fast").disabled = true;
  document.getElementById("stop").disabled = false;
}

function reset() {
  for (i=0; i<64; i++) {
    var square = document.getElementById(i);
    square.innerHTML = "";
    square.className = "";
  }
  counter = 0;
  let year = document.getElementById("year");
  year.innerHTML = "Year: 0";
}

// function stopRunningFunction() {
//   if (this.life === true) {
//     this.life = false;
//   }
// }

//i think the three below could be combined into one
function goSlow() {
  if (this.slow === false) {
    return;
  }
  var theClasses = []; //current classes
  var theNewClasses = []; //whether a square should live or die based on class
  var elements = [];
  //making an array filled with the square elements
  for (i=0; i<64; i++) {
    var square = document.getElementById(i);
    elements[i] = square;
  }
  //fill an array with class names (alives or "")
  for (j=0; j<elements.length; j++) {
    theClasses[j] = elements[j].className;
  }
  //loop through each to get what it should be
  for (y=0; y<theClasses.length; y++) {
  //adding the appropriate class to newClass for first block
    if (y == 0) {
      //if the second square isn't dead
      if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] != "" && theClasses[1] != "alive4")) { //if first dead and second alive
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] != "" && theClasses[0] != "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if first alive and second dead
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if both dead
        theNewClasses[0] = "";
      }
      else { //if both alive
        theNewClasses[0] = "";
      }
    } // last curly for first block
    else if (y > 0 && y < 63) {
      if ((theClasses[y - 1] != "" && theClasses[y - 1] != "alive4") && (theClasses[y + 1] != "" && theClasses[y + 1] != "alive4")) { //if both are alive, it's dead
        theNewClasses[y] = "";
      }
      else if ((theClasses[y - 1] == "" || theClasses[y - 1] == "alive4") && (theClasses[y + 1] == "" || theClasses[y + 1] == "alive4")) { //if both are dead, it's dead
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 63
      if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] != "" && theClasses[62] != "alive4")) { //if first dead and second alive
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] != "" && theClasses[63] != "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if first alive and second dead
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if both dead
        theNewClasses[63] = "";
      }
      else { //if both alive
        theNewClasses[63] = "";
      }
    }
  } //last curly for for loop
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<theClasses.length; j++) {
    if (theClasses[j] == "" && theNewClasses[j] == "alive") {
      elements[j].className = "alive";
      elements[j].innerHTML = acorn;
    }
    else if (theClasses[j] == "alive" && theNewClasses[j] == "alive") {
      elements[j].className = "alive1";
      elements[j].innerHTML = sprout;
    }
    else if (theClasses[j] == "alive1" && theNewClasses[j] == "alive") {
      elements[j].className = "alive2";
      elements[j].innerHTML = pine;
    }
    //it would also be cool if, after being alive for 3, it always dies (might make it look cooler, who knows?)
    else if (theClasses[j] == "alive2" && theNewClasses[j] == "alive") {
      elements[j].className = "alive3";
      elements[j].innerHTML = oak;
    }
    else if (theClasses[j] == "alive3" && theNewClasses[j] == "alive") {
      elements[j].className = "alive4";
      elements[j].innerHTML = deadtree;
    }
    else if (theClasses[j] == "alive4" && theNewClasses[j] == "alive") {
      elements[j].className = "";
      elements[j].innerHTML = "";
    }
    else { //if the plant needs to die
    elements[j].className = ""; 
    elements[j].innerHTML = "";
    }
  }
  counter = counter + 1;
  year = document.getElementById("year");
  year.innerHTML = "Year: " + counter;
  setTimeout(this.goSlow, 800);
}

function goNormal() {
  if (this.normal === false) {
    return;
  }
  var theClasses = []; //current classes
  var theNewClasses = []; //whether a square should live or die based on class
  var elements = [];
  //making an array filled with the square elements
  for (i=0; i<64; i++) {
    var square = document.getElementById(i);
    elements[i] = square;
  }
  //fill an array with class names (alives or "")
  for (j=0; j<elements.length; j++) {
    theClasses[j] = elements[j].className;
  }
  //loop through each to get what it should be
  for (y=0; y<theClasses.length; y++) {
  //adding the appropriate class to newClass for first block
    if (y == 0) {
      //if the second square isn't dead
      if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] != "" && theClasses[1] != "alive4")) { //if first dead and second alive
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] != "" && theClasses[0] != "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if first alive and second dead
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if both dead
        theNewClasses[0] = "";
      }
      else { //if both alive
        theNewClasses[0] = "";
      }
    } // last curly for first block
    else if (y > 0 && y < 63) {
      if ((theClasses[y - 1] != "" && theClasses[y - 1] != "alive4") && (theClasses[y + 1] != "" && theClasses[y + 1] != "alive4")) { //if both are alive, it's dead
        theNewClasses[y] = "";
      }
      else if ((theClasses[y - 1] == "" || theClasses[y - 1] == "alive4") && (theClasses[y + 1] == "" || theClasses[y + 1] == "alive4")) { //if both are dead, it's dead
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 63
      if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] != "" && theClasses[62] != "alive4")) { //if first dead and second alive
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] != "" && theClasses[63] != "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if first alive and second dead
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if both dead
        theNewClasses[63] = "";
      }
      else { //if both alive
        theNewClasses[63] = "";
      }
    }
  } //last curly for for loop
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<theClasses.length; j++) {
    if (theClasses[j] == "" && theNewClasses[j] == "alive") {
      elements[j].className = "alive";
      elements[j].innerHTML = acorn;
    }
    else if (theClasses[j] == "alive" && theNewClasses[j] == "alive") {
      elements[j].className = "alive1";
      elements[j].innerHTML = sprout;
    }
    else if (theClasses[j] == "alive1" && theNewClasses[j] == "alive") {
      elements[j].className = "alive2";
      elements[j].innerHTML = pine;
    }
    //it would also be cool if, after being alive for 3, it always dies (might make it look cooler, who knows?)
    else if (theClasses[j] == "alive2" && theNewClasses[j] == "alive") {
      elements[j].className = "alive3";
      elements[j].innerHTML = oak;
    }
    else if (theClasses[j] == "alive3" && theNewClasses[j] == "alive") {
      elements[j].className = "alive4";
      elements[j].innerHTML = deadtree;
    }
    else if (theClasses[j] == "alive4" && theNewClasses[j] == "alive") {
      elements[j].className = "";
      elements[j].innerHTML = "";
    }
    else { //if the plant needs to die
    elements[j].className = ""; 
    elements[j].innerHTML = "";
    }
  }
  counter = counter + 1;
  year = document.getElementById("year");
  year.innerHTML = "Year: " + counter;
  setTimeout(this.goNormal, 250);
}

function goFast(speed) {
  if (this.fast === false) {
    return;
  }
  var theClasses = []; //current classes
  var theNewClasses = []; //whether a square should live or die based on class
  var elements = [];
  //making an array filled with the square elements
  for (i=0; i<64; i++) {
    var square = document.getElementById(i);
    elements[i] = square;
  }
  //fill an array with class names (alives or "")
  for (j=0; j<elements.length; j++) {
    theClasses[j] = elements[j].className;
  }
  //loop through each to get what it should be
  for (y=0; y<theClasses.length; y++) {
  //adding the appropriate class to newClass for first block
    if (y == 0) {
      //if the second square isn't dead
      if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] != "" && theClasses[1] != "alive4")) { //if first dead and second alive
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] != "" && theClasses[0] != "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if first alive and second dead
        theNewClasses[0] = "alive";
      }
      else if ((theClasses[0] == "" || theClasses[0] == "alive4") && (theClasses[1] == "" || theClasses[1] == "alive4")) { //if both dead
        theNewClasses[0] = "";
      }
      else { //if both alive
        theNewClasses[0] = "";
      }
    } // last curly for first block
    else if (y > 0 && y < 63) {
      if ((theClasses[y - 1] != "" && theClasses[y - 1] != "alive4") && (theClasses[y + 1] != "" && theClasses[y + 1] != "alive4")) { //if both are alive, it's dead
        theNewClasses[y] = "";
      }
      else if ((theClasses[y - 1] == "" || theClasses[y - 1] == "alive4") && (theClasses[y + 1] == "" || theClasses[y + 1] == "alive4")) { //if both are dead, it's dead
        theNewClasses[y] = "";
      }
      else {
        theNewClasses[y] = "alive";
      }
    } // last curly for else if
    //adding the appropriate class to newClass for last block
    else { //if y == 63
      if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] != "" && theClasses[62] != "alive4")) { //if first dead and second alive
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] != "" && theClasses[63] != "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if first alive and second dead
        theNewClasses[63] = "alive";
      }
      else if ((theClasses[63] == "" || theClasses[63] == "alive4") && (theClasses[62] == "" || theClasses[62] == "alive4")) { //if both dead
        theNewClasses[63] = "";
      }
      else { //if both alive
        theNewClasses[63] = "";
      }
    }
  } //last curly for for loop
  //below, im going to try looping through original node list to see if that helps
  for (j=0; j<theClasses.length; j++) {
    if (theClasses[j] == "" && theNewClasses[j] == "alive") {
      elements[j].className = "alive";
      elements[j].innerHTML = acorn;
    }
    else if (theClasses[j] == "alive" && theNewClasses[j] == "alive") {
      elements[j].className = "alive1";
      elements[j].innerHTML = sprout;
    }
    else if (theClasses[j] == "alive1" && theNewClasses[j] == "alive") {
      elements[j].className = "alive2";
      elements[j].innerHTML = pine;
    }
    //it would also be cool if, after being alive for 3, it always dies (might make it look cooler, who knows?)
    else if (theClasses[j] == "alive2" && theNewClasses[j] == "alive") {
      elements[j].className = "alive3";
      elements[j].innerHTML = oak;
    }
    else if (theClasses[j] == "alive3" && theNewClasses[j] == "alive") {
      elements[j].className = "alive4";
      elements[j].innerHTML = deadtree;
    }
    else if (theClasses[j] == "alive4" && theNewClasses[j] == "alive") {
      elements[j].className = "";
      elements[j].innerHTML = "";
    }
    else { //if the plant needs to die
    elements[j].className = ""; 
    elements[j].innerHTML = "";
    }
  }
  counter = counter + 1;
  year = document.getElementById("year");
  year.innerHTML = "Year: " + counter;
  setTimeout(this.goFast, 50);
}

// //numbers in this function will obviously need to change (i think just add numbers to the existing ones so the ids work)
// //can take out the added numbers later if we delete the original!
// function testSquares(speed) {
//   if (this.life === false) {
//     this.life = true;
//     return;
//   }
//   if (speed === undefined) {
//     speed = this.speed;
//   }
//   else {
//     this.speed = speed;
//   }
//   var theClasses = []; 
//   var theNewClasses = [];
//   var elements = [];
//   //making an array filled with the square elements
//   for (i=0; i<64; i++) {
//     var square = document.getElementById(i);
//     elements[i] = square;
//   }
//   //fill an array with class names
//   for (j=0; j<elements.length; j++) {
//     theClasses[j] = elements[j].className;
//   }
//   //loop through each to get what it should be
//   for (y=0; y<theClasses.length; y++) {
//   //adding the appropriate class to newClass for first block
//     if (y == 0) {
//       //if the second square isn't dead
//       if (theClasses[0] == "" && theClasses[1] != "") { //if first dead and second alive
//         theNewClasses[0] = "alive";
//       }
//       else if (theClasses[0] != "" && theClasses[1] == "") { //if first alive and second dead
//         theNewClasses[0] = "alive";
//       }
//       else if (theClasses[0] == "" && theClasses[1] == "") { //if both dead
//         theNewClasses[0] = "";
//       }
//       else { //if both alive
//         theNewClasses[0] = "";
//       }
//     } // last curly for first block
//     else if (y > 0 && y < 63) {
//       if (theClasses[y - 1] != "" && theClasses[y + 1] != "") { //if both are alive, it's dead
//         theNewClasses[y] = "";
//       }
//       else if (theClasses[y - 1] == "" && theClasses[y + 1] == "") { //if both are alive, it's dead
//         theNewClasses[y] = "";
//       }
//       else {
//         theNewClasses[y] = "alive";
//       }
//     } // last curly for else if
//     //adding the appropriate class to newClass for last block
//     else { //if y == 63
//       if (theClasses[63] == "" && theClasses[62] != "") { //if first dead and second alive
//         theNewClasses[63] = "alive";
//       }
//       else if (theClasses[63] != "" && theClasses[62] == "") { //if first alive and second dead
//         theNewClasses[63] = "alive";
//       }
//       else if (theClasses[63] == "" && theClasses[62] == "") { //if both dead
//         theNewClasses[63] = "";
//       }
//       else { //if both alive
//         theNewClasses[63] = "";
//       }
//     }
//   } //last curly for for loop
//   //below, im going to try looping through original node list to see if that helps
//   for (j=0; j<theClasses.length; j++) {
//     if (theClasses[j] == "alive" && theNewClasses[j] == "alive") {
//       elements[j].className = "alive1";
//     }
//     else if (theClasses[j] == "alive1" && theNewClasses[j] == "alive") {
//       elements[j].className = "alive2";
//     }
//     //it would also be cool if, after being alive for 3, it always dies (might make it look cooler, who knows?)
//     else if (theClasses[j] == "alive2" && theNewClasses[j] == "alive") {
//       elements[j].className = "alive3";
//     }
//     else if (theClasses[j] == "alive3" && theNewClasses[j] == "alive") {
//       elements[j].className = "alive4";
//     }
//     else if (theClasses[j] == "alive4" && theNewClasses[j] == "alive") {
//       elements[j].className = "";
//     }
//     else {
//     elements[j].className = theNewClasses[j];
//     }
//   } setTimeout(this.testSquares, speed || this.speed);
// } //ending bracket for testSquares function

