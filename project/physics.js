//width and heigth in meters
//initial values of the screen
//  var width = 500;
//  var height = 250;
//  var x = 0;
//  var y = 0;
//  var vx = 50;
//  var vy = 50;
// var t = 0;
// var timeLapse = 1;
// var timeLimit = 60;
// var particles =[]; //array of particle objects


// function setCoordinates(){
//     x = prompt("Enter x: ");
//     y = prompt("Enter y: ");
// }

//check where the particles are
function boundaries(x, y, width, height){
    
    for (var i = 0; i < particles.length; i++){
            var x = particles[i].x;
            var y = particles[i].y;
                if (x == 0 || x == width) { //Reflection off the side walls
                    vx = - vx;
                 }
                if (y == 0 || y == height) { //Reflection off top and bottom walls
                    vy = - vy;
                }
            }
}

//follow the movement of the particles
function update(dt, particles, width, height){
        for (var i = 0; i < particles.length; i++){
            particles[i].x += particles[i].vx * dt;
            particles[i].y += particles[i].vy * dt;
            
            }
}




