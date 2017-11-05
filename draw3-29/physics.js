//Charge (magnitude and sign) is given by the user in microcoulombs 
//And the initial position
//And the number of particles

//follow the movement of the particles
function update(dt, particles, width, height)
{
    var distances = [];
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
                distances.push(d);
                
                if(d <= (particles[i].r + particles[j].r)){
                    var l = lamda(particles,i,j,dx,dy);
                    particles[i].vx = (l/(particles[i].mass)*dx + particles[i].vx);
                    particles[i].vy = (l/(particles[i].mass)*dy + particles[i].vy);
                    particles[j].vx = (-l/(particles[j].mass)*dx + particles[j].vx);
                    particles[j].vy = (-l/(particles[j].mass)*dy + particles[j].vy);
                    console.log("vx : " + particles[i].vx);
                }
                
                }
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





