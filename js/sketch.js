const START = [200 , 400]
const TARGET = [1700 , 700]
const POPULATION_SIZE = 300
const MUTATION_RATE = 0.01 // number between 0 to 1
let obstacles = [];
var click_counter = 0;
var cords = [];


function drawTarget(){
    fill(255 ,0 , 0);
    strokeWeight(1);
    stroke(0);
    ellipse(TARGET[0] , TARGET[1] , 50);
}


var population;


function setup() {
    createCanvas(1900, 800);
    background(100);
    population = new Population(POPULATION_SIZE);

}

function draw() {

    background(100);
    drawTarget();
    textSize(32);
    fill(0,255,0);

    for (let obs of obstacles){
        obs.display();
    }

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

function mousePressed(){

    if (click_counter === 0){
        cords.push([mouseX, mouseY]);
        click_counter ++
    }
    else if (click_counter === 1){
        click_counter = 0;
        var obs = new Obstacle(cords[0][0] , cords[0][1] , mouseX , mouseY);
        cords = [];
        obstacles.push(obs);

    }

}