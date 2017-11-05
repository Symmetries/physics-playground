/* global createCanvas*/
/* global width*/
/* global height*/
/* global background*/
/* global line*/
/* global resizeCanvas*/
/* global ellipse*/
/* global mouseX*/
/* global mouseY*/
/* global strokeWeight*/

/* global update*/

// function update(dt, particles, width, height){
//     for (var i = 0; i < particles.length; i++){
//         particles[i].x += particles[i].vx * dt;
//         particles[i].y += particles[i].vy * dt;
        
//         if (particles[i].x + particles[i].r >= width){
//             particles[i].vx *= -1;
//         } else if (particles[i].x - particles[i].r <= 0){
//             particles[i].vx *= -1;
//         }
//         if (particles[i].y + particles[i].r >= height){
//             particles[i].vy *= -1;
//         } else if (particles[i].y - particles[i].r <= 0){
//             particles[i].vy *= -1;
//         }
//     }
// }

//Charge (magnitude and sign) is given by the user in microcoulombs 
//And the initial position
//And the number of particles

//follow the movement of the particles
function update(dt, particles, vectors, width, height)
{
    //particles bouncing at each other
    var distances = [];
    const k = 9*(Math.pow(10, 9)); //I don't think this needs to be declared inside the for loop oups you are right 
    

    for (var i = 0; i < particles.length; i++)
    {
        if(particles.length > 1)
        {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[j].x - particles[i].x
                var dy = particles[j].y - particles[i].y
                var d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

                var dvx = particles[j].vx - particles[i].vx;
                var dvy = particles[j].vy - particles[i].vy;
                
                distances.push(d);
                //collision and modification velocity
                if(d <= (particles[i].r + particles[j].r) && dvx * dx + dvy * dy < 0){
                    var l = lamda(particles,i,j,dx,dy);
                    particles[i].vx = (l/(particles[i].mass)*dx + particles[i].vx);
                    particles[i].vy = (l/(particles[i].mass)*dy + particles[i].vy);
                    particles[j].vx = (-l/(particles[j].mass)*dx + particles[j].vx);
                    particles[j].vy = (-l/(particles[j].mass)*dy + particles[j].vy);
                }
                
                }
                
        }
        
        particles[i].x += particles[i].vx * dt;
        particles[i].y += particles[i].vy * dt;
        
        if (particles[i].x + particles[i].r >= width){
            particles[i].vx *= -1;
            particles[i].x = width - particles[i].r;
        } else if (particles[i].x - particles[i].r <= 0){
            particles[i].vx *= -1;
            particles[i].x = particles[i].r;
        }
        if (particles[i].y + particles[i].r >= height){
            particles[i].vy *= -1;
            particles[i].y = height - particles[i].r;

        } else if (particles[i].y - particles[i].r <= 0){
            particles[i].vy *= -1;
            particles[i].y = particles[i].r;

        }
    }
    
    var eNetX;
    var eNetY;
    var eX;
    var eY;
    const e = 2.718281828;
    for (var i = 0; i < particles.length; i++){
      eNetX = 0;
      eNetY = 0;
      
      for (var j = 0; j < vectors.length; j++){
        dx = vectors[j].tailX - particles[i].x
        dy = vectors[j].tailY - particles[i].y
        d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
        eX = Math.pow(e, -d/100000) * vectors[j].x * 10;
        eY = Math.pow(e, -d/100000) * vectors[j].y * 10;
        if (Math.random() < 0.05){
          console.log(Math.pow(e, -d/100000), d, vectors[j].x);
        }
        
        eNetX += eX;
        eNetY += eY;
      }
      
  
      
      var aiX = particles[i].charge*eNetX/particles[i].mass;
      var aiY = particles[i].charge*eNetY/particles[i].mass;
      particles[i].vx += aiX*dt;
      particles[i].vy += aiY*dt;      
    }
    
    for(var i = 0; i< particles.length; i++)
    {
      var En1x = 0;
      var En1y = 0;
      for(var j = 0; j<particles.length; j++){
        if (i != j){
          dx = particles[j].x - particles[i].x
          dy = particles[j].y - particles[i].y
          d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
          //electric field j on i 
          var En1 =k*(Math.abs(particles[j].charge))/(Math.pow(d, 2)); 
          if (particles[i].charge > 0 && particles[j].charge > 0) {
            En1x += En1*(-dx/d); 
            En1y += En1*(-dy/d);
          }
          else if (particles[i].charge < 0 && particles[j].charge < 0) {
            En1x += En1*(-dx/d); 
            En1y += En1*(-dy/d);
          }
          else if (particles[i].charge > 0 && particles[j].charge < 0) {
            En1x += En1*(dx/d);
            En1y += En1*(dy/d);
          }
          else {
            En1x += En1*(dx/d); 
            En1y += En1*(dy/d);
          }
        }
      }
          
          //net electric field on particle i
      var EnetX = En1x;
      var EnetY = En1y;
      //console.log("EnetX: " + EnetX);
      //console.log(("EnetY: " + EnetY));
      //var Enet = Math.sqrt(Math.pow(EnetX,2) + Math.pow(EnetY,2));
      //acceleration of particle i
      var aiX = Math.abs(particles[i].charge)*EnetX/particles[i].mass;
      var aiY = Math.abs(particles[i].charge)*EnetY/particles[i].mass;
      particles[i].vx += aiX*dt;
      particles[i].vy += aiY*dt;
      
  }
}



function lamda(particles, i, j, dx, dy){
  var subtractionVelX = particles[i].vx - particles[j].vx;
  var subtractionVelY = particles[i].vy - particles[j].vy;
  var dotProduct = subtractionVelX * dx + subtractionVelY * dy;
  var dotProductS = dx*dx + dy*dy;
 
  
  var lamdaRes = ((-2*particles[i].mass*particles[j].mass)/(particles[i].mass + particles[j].mass))*((dotProduct)/dotProductS);
  return lamdaRes;
}







//update(1, particles, sceneWidth, sceneHeight);


const MENU_RATIO = 4;
const METER_RATIO = 1/7;
const NUM_SECTIONS = 3;
var particles = [];
var vectors = [];


var menuHeight, menuWidth; // menu dimensions
var sceneHeight, sceneWidth; // scene dimensions
var oldSceneWidth, oldSceneHeight; //old scene dimensions
var oldWidth, oldHeight; // old canvas dimensions

var metersInPixels;

var drawingMode = 0;

var mouseHasBeenPressed = false;

var tailX, tailY;

//The drawing modes are: 0: particle, 1: vector, 2: erasor

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
  metersInPixels = METER_RATIO * sceneWidth;
  
  update(1, particles, vectors, sceneWidth, sceneHeight);
  
  if (oldWidth != width || oldHeight != height){
    // scale the particles
    for (var i = 0; i < particles.length; i++){
      particles[i].x *= sceneWidth / oldSceneWidth;
      particles[i].y *= sceneHeight / oldSceneHeight;
      particles[i].vx *= sceneWidth / oldSceneWidth;
      particles[i].vy *= sceneHeight / oldSceneHeight;
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
  
  // DRAWING HAPPENS HERE
  
  background(220);
  for (var i = 0; i < particles.length; i++){
    var c;
    if (particles[i].charge > 0){
      c = color(0, 0, 255);
    } else {
      c = color(255, 0, 0);
    }
    drawParticle(particles[i].x, particles[i].y, particles[i].r, c);
  }
  
  for (var i = 0; i < vectors.length; i++){
    stroke(0);
    drawVector(vectors[i].tailX, vectors[i].tailY, vectors[i].headX, vectors[i].headY);
  }
  
  
  //console.log("hello")
  stroke(0);
 
  strokeWeight(Math.max(menuWidth, menuHeight)/150);
  stroke(0);
  fill(0);
  drawMenu();
  strokeWeight(Math.max(menuWidth, menuHeight)/150);
  stroke(0);
  fill(0);
  drawMeterScale();
  
  if (!isMouseInMenu()){
    if (drawingMode == 0){
      drawParticle(mouseX, mouseY, 20, color('rgba(0, 0, 255, 0.5)'));
    } if (drawingMode == 1 && mouseHasBeenPressed){
      stroke(125);
      drawVector(tailX, tailY, mouseX, mouseY);
    } if (drawingMode == 2){
      drawErasor(mouseX, mouseY, Math.min(menuWidth/7, menuHeight/7));
      
      var r = Math.min(menuWidth/7, menuHeight/7);
      
      if (mousePressed){
        for (var i = particles.length - 1; i >= 0; i--){
          if (Math.pow(particles[i].x - mouseX, 2) + Math.pow(particles[i].y - mouseY, 2) < r*r){
           particles.splice(i, 1); 
          }
        }
        for (var i = vectors.length - 1; i >= 0; i--){
          if (Math.pow(vectors[i].tailX - mouseX, 2) + Math.pow(vectors[i].tailY - mouseY, 2) < r*r){
           vectors.splice(i, 1); 
          }
        }
        
      }
    }
  }
}


//HELPER FUNCTIONS
function drawMeterScale(){
  var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6;
  
  x5 = sceneWidth - (metersInPixels/6 + metersInPixels);
  y5 = sceneHeight - (2 * metersInPixels/6);
  x6 = sceneWidth - metersInPixels/6;
  y6 = y5;
  x1 = x5;
  y1 = y5 - metersInPixels/6;
  x2 = x5;
  y2 = y5 + metersInPixels/6;
  x3 = x6;
  y3 = y1;
  x4 = x6;
  y4 = y2;
  line(x5, y5, x6, y6);
  line(x1, y1, x2, y2);
  line(x3, y3, x4, y4);
  textSize(metersInPixels*(1/4));
  noStroke()
  text("1 meter", x5 + 1/14 * metersInPixels, (y5 + y3)/2);
 
}

function isMouseInMenu(){
  if (width >= height){
    return (mouseX > width - menuWidth);
  } else {
    return (mouseY > height - menuHeight);
  }
}

function drawVector(x1, y1, x2, y2){
  push();
  var theta = PI/6;
  translate(x1, y1);
  var angle = atan2(y2 - y1, x2 - x1);
  rotate(angle);
  var L = Math.sqrt((x1-x2)*(x1-x2) + (y1 - y2) * (y1-y2));
  strokeWeight(L/10);
  line(0, 0, L, 0);
  line(L, 0, L - L/3 * cos(theta), L/3 * sin(theta));
  line(L, 0, L - L/3 * cos(theta), -L/3 * sin(theta))
  pop();
}

function drawMenu(){

  if (width >= height) {
    // draw menu on the right side
    line(sceneWidth, 0, sceneWidth, height);
    var side = menuHeight/ NUM_SECTIONS;
    for (var i = 0; i < NUM_SECTIONS+1; i++){
      stroke(0)
      line(sceneWidth, i * side, width, i * side);
      if (i == drawingMode){
        fill(0, 255, 0);
        rect(sceneWidth,i * side , menuWidth, side);
      }
    }
    
    // here
    drawParticle(width - 1/2 * menuWidth , 1/2 * side, 1/8 * menuHeight/NUM_SECTIONS, color(0, 0, 255));
    stroke(0);
    drawVector(width - (6/7)*menuWidth, 2*side - (1/7)*side,width - (1/7)*menuWidth , (8/7)*side);
    
    drawErasor(width - 1/2 * menuWidth, 5/2 * side, menuWidth/7);
  } else {
    // draw the menu on the bottom
    line(0, sceneHeight, width, sceneHeight);
    var side = width/NUM_SECTIONS
    line(sceneWidth, 0, sceneWidth, height);
    for (var i = 0; i < NUM_SECTIONS+1; i++){
      line(i * side , sceneHeight, i * side, height);
      if (i == drawingMode){
        fill(0, 255, 0);
        rect(i*side, height - menuHeight, side, menuHeight);
      }
    }
    drawParticle(1/2 * side, height - 1/2 * menuHeight, 1/8 * width/NUM_SECTIONS, color(0, 0, 255));
    stroke(0);
    drawVector((8/7)*side, height - (1/7)*menuHeight, 2*side - (1/7) * side, height - 6*menuHeight/7);
    drawErasor(5/2 * side, height - 1/2 * menuHeight, menuHeight/7);
    
  }
}



function drawParticle(x, y, r, c) {
  noStroke();
  fill(c);
  
  ellipse(x, y, 2 * r, 2 * r);
}


function drawErasor(x, y, l){
  var angle = PI/4;
  push();
  translate(x, y);
  rotate(angle);
  fill(0);
  stroke(0);
  strokeWeight(l/10);
  rect(-l/2, -l/2, l * 3/2, l);
  noFill();
  rect(-l, -l/2, l/2, l);
  pop();
  
}


// EVENTS
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

//fix radius and charge to SI
function mousePressed() {
  r = 20;
  var mass = Math.PI*Math.pow(r, 2);
  var charge;
  if (Math.random() < 0.5){
    charge = 0.01;//*Math.pow(10, -6);
  } else {
    charge = -0.01;
  }
  
  if (drawingMode == 0){
    // code for drawing particles!
    if (width >= height){
      if (mouseX + r < width - menuWidth){
        particles.push({
          x: mouseX,
          y: mouseY,
          r: r,
          mass: mass,
          charge: charge,
          vx: 0,//10*(0.5-random()),
          vy: 0//10*(0.5-random())
        });
      }
    } else {
      if (mouseY + r < height - menuHeight){
        particles.push({
          x: mouseX,
          y: mouseY,
          r: r,
          mass: mass,
          charge: charge,
          vx: 0,// 10*(0.5-random()),
          vy: 0//10*(0.5-random())
        });
      }
    }
  } else if (drawingMode == 1){
    if (!mouseHasBeenPressed && !isMouseInMenu()){
      tailX = mouseX;
      tailY = mouseY;
      mouseHasBeenPressed = true;
    } else if (!isMouseInMenu()) {
      vectors.push(
        {
          tailX: tailX,
          tailY: tailY,
          headX: mouseX,
          headY: mouseY,
          x: mouseX - tailX,
          y: mouseY - tailY
        });
      mouseHasBeenPressed = false;
    }
  }
  
  if (isMouseInMenu()){
    if (width >= height){
      var side = menuHeight/NUM_SECTIONS;
      drawingMode = Math.floor(mouseY/side);
    } else {
      var side = width/NUM_SECTIONS;
      drawingMode = Math.floor(mouseX/side);
    }
  }
  
}