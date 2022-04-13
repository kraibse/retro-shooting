class Bullet {
    posx = 0;
    posy = 0;

    speed = 10;

    constructor(x=0, y=0, damage=1, dispersion=0) {
        this.posx = x;
        this.posy = y;

        this.damage = damage;
        this.dispersion = dispersion;

        this.render();
    }

    move() {
        this.posx += this.dispersion;
        this.posy += (-1) * this.speed;

        this.render();
    }

    render() {
        stroke(0);
        circle(this.posx, this.posy - 30, 10);
    }
}