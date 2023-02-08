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
        "maxHealth": 100,
        "reloadTime": 0,        // 1 = 1 second
        "shootingDelay": 10     // 10 = 1 sec
    }    

    model = "/resources/ships/default.png"

    bullets = []
    bulletMagazine = [];
    bulletTimer = 0;

    constructor(name, damage, speed, dispersion) {
        this.name = name;
        this.damage = damage;
        this.speed = speed;
        this.dispersion = dispersion;
        this.health = this.upgrades.maxHealth;

        this.reloadMagazine();

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
            this.posY = constrain(this.posY + this.motionY, this.size / 2, gm.height - this.size / 2 - gm.height/10);
        });

        kd.SPACE.down( () => {
            if (this.bulletTimer <= 0) {
                this.shoot();
                this.bulletTimer = this.upgrades.shootingDelay;
            }
            else {
                this.bulletTimer -= gm.deltaTime;
            }
            
        });
    }

    addXP() {

    }

    hit(damage) {
        this.health = this.health - damage;

        let percentage = Math.floor(this.upgrades.maxHealth * this.health/100);
        
        let color = "1ed760";   // green
        
        if (percentage > 25 && percentage <= 50) {
            color = "ff9807";
        }
        if (percentage <= 25) {
            color = "dc3545";
        }
        if (percentage <= 0) {
            color = "333";
        }
        
        $("#health").text(percentage + "%")
                    .css("width", percentage + "%")
                    .css("background-color", "#" + color);

        if (this.health <= 0) {
            $("#health").css("width", 100 + "%");
            gm.gameOver();
        }
    }

    getPos() {
        return new p5.Vector(this.posX, this.posY);
    }
    
    move() {        
        this.posX = constrain(this.posX + this.motionX, this.size / 2, gm.width - this.size / 2);
        this.posY = constrain(this.posY + this.motionY, this.size / 2, gm.height - this.size / 2 - 240);

        // this.posX = constrain(this.posX + this.motionX * this.drag, this.size / 2, gm.width);
        // this.posY = constrain(this.posY + this.motionY * this.drag, this.size / 2, gm.height);
    }

    render() {
        stroke(173, 216, 230);
        circle(this.posX, this.posY, this.size);
        $("#loader").css("left", this.posX + this.size/3);
        $("#loader").css("top", this.posY - this.size);
    }

    reloadMagazine() {
        console.log("Reloading");

        this.bulletMagazine = [];
        for (let i = 0; i < this.upgrades.maxBullets; i++) {
            this.bulletMagazine.push(new Bullet());
        }
        // $(".loader").hide();
    }

    setPos(x, y) {
        this.posX = x;
        this.posY = y;
    }

    shoot() {
        if (this.bulletMagazine.length == 0) {
            if (this.bullets.length == 0) {
                // document.getElementById("loader").style.display = "block";
                let delay = this.upgrades.reloadTime * 1000;
                $("#loader").show().delay(delay).queue((next) => {
                    $(this).hide();
                    next();
                });
                this.reloadMagazine();
            }
            return;
        }

        // generate spreading modifier between -1 and 1
        
        let bullet = this.bulletMagazine.pop();
        bullet.setPos(this.posX, this.posY);
        
        let dispersion = (2 * Math.random() - 1) * this.upgrades.dispersion;
        let damage = this.upgrades.damage;
        bullet.setProperties(bullet.size, damage, dispersion);
        this.bullets.push(bullet);
    }
}