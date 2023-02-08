class Bullet {
    x = 0;
    y = 0;

    speed = 10;
    size = 10;

    constructor(x = -100, y = 0, damage = 1, dispersion = 0) {
        this.x = x;
        this.y = y;

        this.damage = damage;
        this.dispersion = dispersion;
    }

    checkCollisions() {
        gm.enemies.forEach(enemy => {
            if (!enemy.isOnScreen()) {
                return;
            }

            let distanceVector = p5.Vector.sub(enemy.getPos(), this.getPos());
            let mag = distanceVector.mag();
            let minDistance = this.size + enemy.size;
            // let minDistance = 100;

            if (mag < minDistance) {
                console.log("hit");

                stroke(0);
                line(this.x, this.y - 30, enemy.x, enemy.y);

                enemy.respawn();
                // gm.enemies.splice(gm.enemies.indexOf(enemy), 1);

                // enemy.health -= this.damage;
            }

        });
    }

    getPos() {
        return new p5.Vector(this.x, this.y);
    }

    move() {
        this.x += this.dispersion;
        this.y += (-1) * this.speed;

        // this.checkCollisions();
        this.render();
    }

    render() {
        stroke(0);
        circle(this.x, this.y - 30, this.size);
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setProperties(size=this.size, damage=this.damage, dispersion=this.dispersion) {
        this.size = size;
        this.damage = damage;
        this.dispersion = dispersion;
    }
}