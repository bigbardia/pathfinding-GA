class Rocket {

    constructor(x, y) {
        this.pos = createVector(x, y);
        
        this.vel = createVector(0, 0);
        this.width = 20;
        this.dead = false;
        this.count = 0;

        this.dna = [];
        for (let i = 0;i<1200;i++){
            this.dna.push(createVector(random(-5, 5), random(-5, 5)));
        }

    }

    display() {
        fill(255,255,255);
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
        return this.count > 99;
    }
}