class Rocket {

    constructor(x, y) {
        this.pos = createVector(x, y );
        
        this.vel = createVector(0, 0);
        this.width = 10;
        this.dead = false;
        this.eliminated = false;
        this.count = 0;
        this.feul = FEUL;

        this.dna = [];
        for (let i = 0;i<this.feul;i++){
            this.dna.push(createVector(random(-5, 5), random(-5, 5)));
        }

    }

    display() {
        fill(255,255,255);
        strokeWeight(1);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.width);
    }


    move() {

        this.vel.add(this.dna[this.count]);
        this.count++;
        if (this.vel.x > 20) {
            this.vel.x = 20;
        }
        else if (this.vel.x < -20) {
            this.vel.x = -20;
        }

        if (this.vel.y > 20) {
            this.vel.y = 20;
        }
        else if (this.vel.y < -20) {
            this.vel.y = -20;
        }
        this.pos.add(this.vel);
    }

    CollidedWithWall(){

        if (this.pos.y > 800){
            return true;
        }
        else if (this.pos.y < 0){
            return true;
        }
        if (this.pos.x > 1900){
            return true
        }
        else if (this.pos.x < 0){
            return true
        }else{
            return false;
        }
    }

    feulEnded(){
        return this.count > this.feul-1;
    }

    collidedWithLine(){
        var res = false;
        for (let obs of obstacles){
            
            
            var d1 = dist(this.pos.x , this.pos.y , obs.x1 , obs.y1);
            var d2 = dist(this.pos.x , this.pos.y , obs.x2 , obs.y2);
            var line_length = dist(obs.x1, obs.y1 , obs.x2 , obs.y2);


            

            var buffer = 5;
            if (d1 + d2 >= line_length-buffer && d1 + d2 <= line_length + buffer){
                res = true;
                break;
            }
        }

        return res;

    }
}