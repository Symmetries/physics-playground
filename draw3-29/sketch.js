/* global createCanvas*/
/* global width*/
/* global height*/
/* global background*/
/* global line*/
/* global resizeCanvas*/
/* global ellipse*/
/* global mouseX*/
/* global mouseY*/


/* global update*/

const MENU_RATIO = 3.5;
var particles = [];
var menuHeight, menuWidth; // menu dimensions
var sceneHeight, sceneWidth; // scene dimensions
var oldSceneWidth, oldSceneHeight; //old scene dimensions
var oldWidth, oldHeight; // old canvas dimensions
var vx = 5;
var vy = 5;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  oldWidth = width;
  oldHeight = height;
  if (width >= height) {
    menuHeight = height;
    menuWidth = height/MENU_RATIO;
    oldSceneWidth = width - menuWidth;
    oldSceneHeight = height;
  } else {
    menuWidth = width;
    menuHeight = width/MENU_RATIO;
    oldSceneWidth = width;
    oldSceneHeight = height - menuHeight;
  }
} 

function draw() { 
  if (width >= height) {
    // draw menu on the left side
    menuHeight = height;
    menuWidth = height/MENU_RATIO;
    sceneWidth = width - menuWidth;
    sceneHeight = height;
  } else {
    menuWidth = width;
    menuHeight = width/MENU_RATIO;
    sceneWidth = width;
    sceneHeight = height - menuHeight;
  }
  
  
  background(220);
  update(1, particles, sceneWidth, sceneHeight);
  
  if (oldWidth != width || oldHeight != height){
    // scale the particles
    for (var i = 0; i < particles.length; i++){
      particles[i].x *= sceneWidth / oldSceneWidth;
      particles[i].y *= sceneHeight / oldSceneHeight;
      particles[i].r *= Math.sqrt(sceneWidth*sceneHeight / (oldSceneWidth * oldSceneHeight));
      // if (sceneWidth / oldSceneWidth < sceneHeight / oldSceneHeight){
      //   // scale the radius with x component
      //   if (sceneWidth / oldSceneWidth < 1){
      //     particles[i].r *= sceneWidth / oldSceneWidth;
      //   } else {
      //     particles[i].r *= oldSceneWidth / sceneWidth;
      //   }
      // } else {
      //   // scale the radius with y component
      //   if (sceneHeight / oldSceneHeight < 1) {
      //   particles[i].r *= sceneHeight / oldSceneHeight;
      //   } else {
      //   particles[i].r *= oldSceneHeight / sceneHeight;
      //   }
      // }
    }
    oldWidth = width;
    oldHeight = height;
    oldSceneWidth = sceneWidth;
    oldSceneHeight = sceneHeight;
  }
  for (var i = 0; i < particles.length; i++){
    drawParticle(particles[i].x, particles[i].y, particles[i].r)
  }
  
  drawMenuLine();
}

function drawMenuLine(){
  if (width >= height) {
    // draw menu on the left side
    line(sceneWidth, 0, sceneWidth, height);
  } else {
    line(0, sceneHeight, width, sceneHeight);
  }
}


//HELPER FUNCTIONS
function drawParticle(x, y, r) {
  ellipse(x, y, 2 * r, 2 * r);
}



// EVENTS
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mousePressed() {
  var r = 5;
  var mass = Math.PI*Math.pow(r, 2);
  
  if (width >= height){
    if (mouseX + r < width - menuWidth){
      particles.push({
        x: mouseX,
        y: mouseY,
        r: r,
        mass: mass,
        vx: 2,//this.vx,
        vy: 1//this.vy
      });
    }
  } else {
    if (mouseY + r < height - menuHeight){
      particles.push({
        x: mouseX,
        y: mouseY,
        r: r,
        mass: mass,
        vx: 1,//this.vx,
        vy: 2//this.vy
      });
    }
  }
}


