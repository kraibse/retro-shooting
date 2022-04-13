class Player
{
    posX = 0;
    posY = 0;
    motionX = 0;
    motionY = 0;

    drag = 0.97;
    maxSpeed = 10;

    level = 1;
    xp = 0;

    upgrades = {
        "automatic_shooting": false,
        "damage": 1,
        "dispersion": 0.5
    }    

    model = "/resources/ships/default.png"

    bullets = []

    constructor(name, damage, speed, dispersion) {
        this.name = name;
        this.damage = damage;
        this.speed = speed;
        this.dispersion = dispersion;

        $(document).on("keydown", (e) => this.handleControls(e));
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

    handleControls(e) {
        if (e.code == "Space") {
            this.shoot();
        }

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
        this.move();
    }
    
    move() {
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
        // generate spreading modifier between -1 and 1
        let dispersion = (2 * Math.random() - 1) * this.upgrades["dispersion"];
        let damage = this.upgrades["damage"];

        this.bullets.push(new Bullet(
            this.posX,
            this.posY,
            damage,
            dispersion
        ));
    }
}