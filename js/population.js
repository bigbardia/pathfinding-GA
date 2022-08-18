class Population{
    constructor(pop_size , feul) {
        this.pop_size = pop_size
        this.gen = 0;
        this.rockets = [];
        this.scores = [];
        this.selected = [];

        for (let i = 0; i < pop_size; i++){
            this.rockets.push(new Rocket(START[0] , START[1]));
        }
    }




    calcFitness(){
        for (let rocket of this.rockets){
            if (rocket.dead){
                
                score = 0;
            }
            else{
                
                var distance = Math.sqrt((TARGET[0] - rocket.pos.x) ** 2 +  (TARGET[1] - rocket.pos.y) ** 2);
                var score = 1/(distance);
                
            }
            
            this.scores.push(score);

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


        var sum = 0;
        for (let i = 0; i < this.scores.length; i ++){
            sum += this.scores[i];
        }


        for (let i = 0; i < this.scores.length; i ++){
            this.scores[i] = this.scores[i] / sum
        }


    }

    select(){ 

        for (let i = 0; i < this.pop_size/2; i ++){
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

            
            var dna1 = rocket1.slice(0,FEUL/2).concat(rocket2.slice(FEUL/2,FEUL));
            var dna2 = rocket2.slice(0,FEUL/2).concat(rocket1.slice(FEUL/2,FEUL));

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




    allDone(){
        var result = true;
        for (let rocket of this.rockets){
            if (!rocket.eliminated){
                result = false;
                break;
            }
        }
        return result;
    }


}
