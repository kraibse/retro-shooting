class Player
{
    level = 1;
    xp = 0;

    posX = 0;
    posY = 0;
    
    motionX = 0;
    motionY = 0;

    maxSpeed = 10;
    drag = 0.97;

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

    applyResistance() {
        this.motionX *= this.drag;
        this.posX += this.motionX;

        this.motionY *= this.drag;
        this.posY += this.motionY;
    }

    damage() {

    }

    move(e) {
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

        this.motionX = Math.round(constrain(this.motionX, -1 * this.maxSpeed, this.maxSpeed) * 100) / 100;
        this.motionY = Math.round(constrain(this.motionY, -1 * this.maxSpeed, this.maxSpeed) * 100) / 100;

        this.posX += this.motionX;
        this.posY += this.motionY;
    }

    render() {
        stroke(173, 216, 230);
        circle(this.posX, this.posY, 40);
    }

    setPos(x, y) {
        this.posX = x;
        this.posY = y;
    }

    shoot() {

    }
}