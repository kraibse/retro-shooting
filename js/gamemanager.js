const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const viewportScalingfactor = 0.5625;

class GameManager {
    width = 0;
    height = 0;
    
    deltaTime = 0;
    lastTimestamp = 0;
    perfectFrame = 1000 / 60;
    
    screenOffset = 180;     // 180px padding
    enemies = [];
    
    constructor() {
        this.player = new Player();
        this.screenOffset = this.player.size * 4;
        this.isGameOver = false;
        this.offsetY = Date.now();
        this.background = [];
        this.backgroundTimer = 100;
    }

    drawBackground() {
        for (let i = 0; i < this.background.length; i++) {
            this.background[i].forEach((bg, x) => {
                stroke(bg);
                line(x, i, x, i);
            });
        }
    }

    next() {
        this.player.render();

        this.enemies.forEach((e, index) => {
            e.move();
            e.checkCollisions();

            if (e.y > gm.height) {
                this.enemies.splice(index, 1);
                gm.enemies.push(new Enemy());
            }
        });
        
        this.player.bullets.forEach((b, index) => {
            if (b.y < 0) {
                this.player.bullets.splice(index, 1);
            } else {
                b.checkCollisions();    // disabled collision for off screen enemies
                b.move();
            }
        });
    }

    gameOver() {
        this.isGameOver = true;
    }

    generateBackground() {
        let off = this.bgOffset + 0.01;

        colorMode(HSL, 255, 100, 255);
        let row = [];
        for (let x = 0; x < vw; x++) {
            let value = color(201, 100, noise(x, off) * 100);
            row.push(value);
        }
        // colorMode(RGB, 255);
        return row;
    }

    setSize() {
        let renderWidth = Math.min(vw, vh * viewportScalingfactor);
        
        var canvas = createCanvas(renderWidth, vh);
        canvas.parent("canvas");
        
        select('#ui').size(renderWidth, vh);
        
        this.width = renderWidth;
        this.height = vh;
    }
}

function setup()
{
    gm.setSize();
    gm.player.setPos(gm.width / 2, vh - gm.screenOffset);

    for (let y = 0; y < vh; y++) {
        // gm.background.unshift(gm.generateBackground());
    }

    for (let i = 0; i < 30; i++) {
        gm.enemies.push(new Enemy());
    }
}

function draw() {
    if (gm.isGameOver) { 
        $("#game-over").show();
        return;
    }
    
    let timestamp = Date.now();
   
    background(16, 171, 255);
    // gm.background.unshift(gm.generateBackground());
    // gm.background.pop();
    // gm.drawBackground();

    kd.tick();  // keydrown handler tick
    gm.next();

    gm.deltaTime = (timestamp - gm.lastTimestamp) / gm.perfectFrame;
    gm.lastTimestamp = timestamp;
}