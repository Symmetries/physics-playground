// //Charge (magnitude and sign) is given by the user in microcoulombs 
// //And the initial position
// //And the number of particles

//follow the movement of the particles
function update(dt, particles, width, height)
{
    //particles bouncing at each other
    var distances = [];
    var k = 9*(Math.pow(10, 9));  
    var En1x = 0
    var En1y = 0

    for (var i = 0; i < particles.length; i++)
    {
        if(particles.length > 1)
        {
            for (var j = i + 1; j < particles.length; j++) {
                // var v1 = posVector(particles,i);
                // var v2 = posVector(particles,j);
                
                var dx = particles[j].x - particles[i].x
                var dy = particles[j].y - particles[i].y
                var d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
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
                else if (particles[i].charge > 0 && particles[j].charge <0) {
                    En1x += En1*(dx/d); 
                    En1y += En1*(dy/d);
                }
                else {
                    En1x += En1*(dx/d); 
                    En1y += En1*(dy/d);
                }
                
                // //electric field i on j (is the negative of n on 1)
                // var E1nx = -En1x;
                // var E1ny = -En1y;

                
                
                distances.push(d);
                
                if(d <= (particles[i].r + particles[j].r)){
                    var l = lamda(particles,i,j,dx,dy);
                    particles[i].vx = (l/(particles[i].mass)*dx + particles[i].vx);
                    particles[i].vy = (l/(particles[i].mass)*dy + particles[i].vy);
                    particles[j].vx = (-l/(particles[j].mass)*dx + particles[j].vx);
                    particles[j].vy = (-l/(particles[j].mass)*dy + particles[j].vy);
                    //console.log("vx : " + particles[i].vx);
                }
                
                }
                //electric field when j<i but is not j==i
                if(i != 0){
                    for(j = 0; j < i; j++){
                        En1 =k*particles[j].charge/(Math.pow(d, 2));
                        var En1 =k*(Math.abs(particles[j].charge))/(Math.pow(d, 2)); 
                        if (particles[i].charge > 0 && particles[j].charge > 0) {
                            En1x += En1*(-dx/d); 
                            En1y += En1*(-dy/d);
                        }
                        else if (particles[i].charge < 0 && particles[j].charge < 0) {
                            En1x += En1*(-dx/d); 
                            En1y += En1*(-dy/d);
                        }
                        else if (particles[i].charge > 0 && particles[j].charge <0) {
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
                //var Enet = Math.sqrt(Math.pow(EnetX,2) + Math.pow(EnetY,2));
                //acceleration of particle i
                var aiX = (particles[i].charge*EnetX)/particles[i].mass;
                var aiY = (particles[i].charge*EnetY)/particles[i].mass;
                particles[i].vx = aiX*dt;
                particles[i].vy = aiY*dt;
            }
        
        
        particles[i].x += particles[i].vx * dt;
        particles[i].y += particles[i].vy * dt;
        
        if (particles[i].x + particles[i].r >= width){
            particles[i].vx *= -1;
        } else if (particles[i].x - particles[i].r <= 0){
            particles[i].vx *= -1;
        }
        if (particles[i].y + particles[i].r >= height){
            particles[i].vy *= -1;
        } else if (particles[i].y - particles[i].r <= 0){
            particles[i].vy *= -1;
        }
    }
    
}



function lamda( particles, i, j, dx, dy){

    var subtractionVelX = particles[i].vx - particles[j].vx;
    var subtractionVelY = particles[i].vy - particles[j].vy;
    var dotProduct = subtractionVelX * dx + subtractionVelY * dy;
    var dotProductS = dx*dx + dy*dy;
   
    
    var lamdaRes = ((-2*particles[i].mass*particles[j].mass)/(particles[i].mass + particles[j].mass))*((dotProduct)/dotProductS);
    return lamdaRes;
}

//***************************************************************************************************************************************************************************************************************

//point charge? (moving or not?)
//each particle havea charge? 
//Whatdo we need:
//Given by the user: charge of each paticle, mass, radius 
//vxi and vyi should be zero, the velocity of the should be determined by the acceleration given by the Fe by the other particles
//for acceleration we need: charge of the particle: distance between particles, mass of the particle that has an acceleration, the charge of the particle applying a force on the particle.





