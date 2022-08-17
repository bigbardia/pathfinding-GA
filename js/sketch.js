const START = [200 , 400]
const TARGET = [1800 , 400]
const MUTATION_RATE = 0.1 // number between 0 to 1

function drawTarget(){
    fill(255 ,0 , 0);
    ellipse(TARGET[0] , TARGET[1] , 50);
}


var population;


function setup() {
    createCanvas(1900, 800);
    background(100);
    population = new Population();

}

function draw() {
    background(100);
    drawTarget();
    textSize(32);
    fill(0,255,0);
    text(`Generation : ${population.gen}` , 20 , 50);


    
    if (population.allDead()){
        
        population.calcFitness();
        population.select();
        population.crossover();
        population.newGeneration();
        population.mutate();

        population.gen ++;
        
    }

    else{

        for (var rocket of population.rockets){

            
            if (rocket.CollidedWithWall() || rocket.feulEnded()){
                rocket.dead = true;
            }


            if (!rocket.dead){
                rocket.move();
                rocket.display();
            }
            
        }
    }

}