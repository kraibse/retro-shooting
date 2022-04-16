class Enemy {
    x = 0;
    y = 0;
    rotation = 0;

    width = 10;
    height = 20;

    homing = true;
    damage = 1;
    size = 5;

    bullets = [];

    constructor() {
        this.type = 0;
        this.x = Math.random() * gm.width;
        this.y = Math.random() * gm.height;
        this.render();
    }

    move() {
        this.y++;
        stroke(112, 41, 99);
        circle(this.x, this.y, this.size);
        this.render();
    }

    render() {
        
        // triangle top
        let x1 = this.x;
        let y1 = this.y + this.size/2;

        // triangle base
        let x2 = this.x - this.size/2;
        let y2 = this.y - this.size/2;
        let x3 = this.x - this.size/2;
        let y3 = this.y - this.size/2;

        triangle(x1, y1, x2, y2, x3, y3);
    }
}