class Player
{
    level = 1;
    xp = 0;

    model = "/resources/ships/default.png"

    name = "";
    damage = 1;
    speed = 1;
    dispersion = 0.5;

    bullets = []


    constructor(name, damage, speed, dispersion) {
        this.name = name;
        this.damage = damage;
        this.speed = speed;
        this.dispersion = dispersion;
    }

    addXP() {

    }

    damage() {
        
    }

    shoot() {

    }
}