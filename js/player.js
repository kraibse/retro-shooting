Number.prototype.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

class Player
{
    level = 1;
    xp = 0;

    position = [0, 0];
    
    motionX = 0;
    motionY = 0;

    maxSpeed = 1;

    model = "/resources/ships/default.png"

    name = "";
    damage = 1;
    dispersion = 0.5;

    bullets = []


    constructor(name, damage, speed, dispersion) {
        this.name = name;
        this.damage = damage;
        this.speed = speed;
        this.dispersion = dispersion;

        $(document).on("keydown", (e) => this.move(e));
    }

    addXP() {

    }

    damage() {

    }

    move(e) {
        console.log(this.motionX, this.motionY);

        if (e.code == "ArrowLeft") {
            e.preventDefault();
            this.motionX += (-1) * this.maxSpeed / 60;

        }
        if (e.code == "ArrowRight") {
            e.preventDefault();
            this.motionX += this.maxSpeed / 60;
        }

        if (e.code == "ArrowUp") {
            e.preventDefault();
            this.motionY += (-1) * this.maxSpeed / 60;
        }

        if (e.code == "ArrowDown") {
            e.preventDefault();
            this.motionY += this.maxSpeed / 60;
        }

        this.motionX = Math.round(constrain(this.motionX, -1, this.maxSpeed) * 100) / 100;
        this.motionY = Math.round(constrain(this.motionY, -1, this.maxSpeed) * 100) / 100;

    }

    shoot() {

    }
}