var rocket;

class Population{
    constructor() {
        this.gen = 0;
        this.rockets = [];
        this.scores = [];
        this.selected = [];

        for (let i = 0; i < 100; i++){
            this.rockets.push(new Rocket(START[0] , START[1]));
        }
    }




    calcFitness(){
        for (rocket of this.rockets){

            var distance = Math.sqrt((TARGET[0] - rocket.pos.x) ** 2 +  (TARGET[1] - rocket.pos.y) ** 2);
            this.scores.push(1/distance);


        }
            //sorting the scores and rockets
        for (let i = 0; i < this.rockets.length; i++){
            for (let j = 0; j < this.rockets.length-1; j ++){
                if (this.scores[j] < this.scores[j+1]){
                    var t = this.scores[j]
                    this.scores[j] = this.scores[j + 1];
                    this.scores[j+1] = t;

                    t = this.rockets[j];
                    this.rockets[j] = this.rockets[j + 1];
                    this.rockets[j + 1] = t;
           
                }
            }
        }
        for (let i = 0; i < this.scores.length; i++){
            this.scores[i] = Math.floor(this.scores[i] * 1000000000000000);
        }
    }

    select(){ 
        

        

        //adding all of the scores
        var sum = 0;
        for (let i = 0; i < this.scores.length; i ++){
            sum += this.scores[i];
        }

        // normalizing the scores so they all sum up to 1!
        for (let i = 0; i < this.scores.length; i ++){
            this.scores[i] = this.scores[i] / sum
        }


        //picking 50 rockets randomly

        for (let i = 0; i < 50; i ++){
            var index = 0;
            var random_number = random(1);
            while (random_number > 0){
                random_number -= this.scores[index];
                index++;
            }
            index--;
            this.selected.push(this.rockets[index]);
        }


    }

    crossover(){
        this.crossover_results = [];

        for (let i = 0; i < this.selected.length-1; i += 2){
            
            var rocket1 = this.selected[i].dna;
            var rocket2 = this.selected[i + 1].dna;

            
            var dna1 = rocket1.slice(0,600).concat(rocket2.slice(600,1200));
            var dna2 = rocket2.slice(0,600).concat(rocket1.slice(600,1200));

            var new_rocket1 = new Rocket(START[0] , START[1]);
            new_rocket1.dna = dna1;
            var new_rocket2 = new Rocket(START[0] , START[1]);
            new_rocket2.dna = dna2;

            this.crossover_results.push(new_rocket1);
            this.crossover_results.push(new_rocket2);

        }
    }

    newGeneration(){

        this.rockets = [];
        this.temp = this.selected.concat(this.crossover_results);
        for (let rocket of this.temp){
            var new_rocket = new Rocket(START[0] , START[1]);
            new_rocket.dna = rocket.dna;
            this.rockets.push(new_rocket);
        }
    }

    mutate(){
        for (let i = 0; i < this.rockets.length; i++){
            var new_dna = [];
            for (let vector of this.rockets[i].dna){

                if (random(1) < MUTATION_RATE){
                    
                    new_dna.push(createVector(random(-5,5) , random(-5,5)));
                }
                else{
                    new_dna.push(vector);
                }
            }
            this.rockets[i].dna = new_dna;
        }



        this.selected = [];
        this.scores = [];
    }




    allDead(){
        var result = true;
        for (rocket of this.rockets){
            if (rocket.dead === false){
                result = false;
            }
        }
        return result;
    }


}
