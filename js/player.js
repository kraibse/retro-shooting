class Player
{
    posX = 0;
    posY = 0;
    motionX = 0;
    motionY = 0;

    size = 40;

    drag = 1;
    maxSpeed = 7.5;

    level = 1;
    xp = 0;

    upgrades = {
        "automatic_shooting": false,
        "damage": 1,
        "dispersion": 0.5,
        "maxBullets": 30,
        "shootingDelay": 5              // 10 = 1 sec
    }    

    model = "/resources/ships/default.png"

    bullets = []
    bulletTimer = 0;

    constructor(name, damage, speed, dispersion) {
        this.name = name;
        this.damage = damage;
        this.speed = speed;
        this.dispersion = dispersion;

        kd.LEFT.down( () => {
            this.motionX = (-1) * this.maxSpeed;
            this.motionY = 0;
            this.posX = constrain(this.posX + this.motionX, this.size / 2, gm.width - this.size / 2);
        });

        kd.RIGHT.down( () => {
            this.motionX = this.maxSpeed;
            this.motionY = 0;
            this.posX = constrain(this.posX + this.motionX, this.size / 2, gm.width - this.size / 2);
        });

        kd.UP.down( () => {
            this.motionX = 0;
            this.motionY = (-1) * this.maxSpeed;
            this.posY = constrain(this.posY + this.motionY, this.size / 2, gm.height - this.size / 2);
        });

        kd.DOWN.down( () => {
            this.motionX = 0;
            this.motionY = this.maxSpeed;
            this.posY = constrain(this.posY + this.motionY, this.size / 2, gm.height - this.size / 2);
        });

        kd.SPACE.down( () => {
            if (this.bulletTimer <= 0) {
                this.shoot();
                this.bulletTimer = this.upgrades["shootingDelay"];
            }
            else {
                this.bulletTimer -= gm.deltaTime;
            }
            
        });
    }

    addXP() {

    }

    damage() {

    }
    
    move() {        
        this.posX = constrain(this.posX + this.motionX, this.size / 2, gm.width - this.size / 2);
        this.posY = constrain(this.posY + this.motionY, this.size / 2, gm.height - this.size / 2);

        // this.posX = constrain(this.posX + this.motionX * this.drag, this.size / 2, gm.width);
        // this.posY = constrain(this.posY + this.motionY * this.drag, this.size / 2, gm.height);
    }

    render() {
        stroke(173, 216, 230);
        circle(this.posX, this.posY, this.size);
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