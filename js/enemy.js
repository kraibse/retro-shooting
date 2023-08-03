class Enemy {
    rotation = 0;

    width = 10;
    height = 20;

    homing = true;
    damage = 10;
    size = 10;

    bullets = [];

    constructor(x, y) {
        this.type = 0;
        if (!x  && !y) { this.respawn(); }
        else {
            this.x = x;
            this.y = y;
        }
    }

    checkCollisions() {
        let distanceVector = p5.Vector.sub(gm.player.getPos(), this.getPos());
        let mag = distanceVector.mag();
        let minDistance = this.size + gm.player.size;

        if (mag < minDistance) {
            gm.player.hit(this.damage);
            this.respawn();
        }
    }

    isOnScreen() {
        return this.x > 0 && this.x < gm.width && this.y > 0 && this.y < gm.height;
    }

    getPos() {
        return new p5.Vector(this.x, this.y);
    }

    move() {
        this.y++;
        stroke(112, 41, 99);
        // circle(this.x, this.y, this.size);
        if (this.isOnScreen()) {
            this.render();
        }
    }

    render() {
        // triangle top
        let x1 = this.x;
        let y1 = this.y + this.height/2;

        // triangle base
        let x2 = this.x - this.width/2;
        let y2 = this.y - this.height/2;
        let x3 = this.x + this.width/2;
        let y3 = this.y - this.height/2;

        triangle(x1, y1, x2, y2, x3, y3);
    }

    respawn() {
        this.x = Math.random() * gm.width;
        this.y = -Math.random() * gm.height;
    }

    setPos(x, y) { 
        this.x = x;
        this.y = y;
    }
}