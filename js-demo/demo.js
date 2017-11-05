function changeArray(array){
    array[0] = "nope";
}

function tryToChangeANumberButNotPossible(n){
  n = n + 1;
}


// this is a comment
console.log("Variables:");
var x; // variable declaration

x = "hello"; // assignment

console.log(x); //printing for debugging

var y = 3; // variable declaration + assignment at the same time


// for loops
console.log("\n For loops:");
for (var i = 0; i< 10; i++){
  console.log(i);
}


// arrays
console.log("\n Arrays:");
var myArray = ["hello", 2, 4];
console.log(myArray[0]);
console.log(myArray[1]);
console.log(myArray[2]);


// changing an array
console.log("\n Changing an array");
changeArray(myArray);
console.log(myArray[0]);
console.log(myArray[1]);
console.log(myArray[2]);


// trying to change a number
console.log("\n trying to change a number");
var n = 10;
console.log("before:", n);
tryToChangeANumberButNotPossible(n);
console.log("after:", n);


// object literals
console.log("\n Object Literals");
var myObject = { //instead of creating a class
  x: 3.4,//similar to a function or method of the object
  y: 3.6,
  charge: -2
};

console.log(myObject);
console.log("myObject.x = ", myObject.x);
console.log("myObject.y = ", myObject.y);
console.log("myObject.charge = ", myObject.charge);
