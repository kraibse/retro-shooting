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

        this.background = [];
    }

    drawBackground() {
        
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
        this.offsetY -= 0.1;

        this.graphics.noStroke();
        for (let y=0; y < height; y+=10) {
            let offset = this.offsetY + y/10 * 0.1;

            for (let x=0; x < width; x+=10) {
                let value = noise(x * 0.01, offset);
                this.graphics.fill(value);
                this.graphics.rect (x, y, 10, 10);
            }
        }
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
    colorMode(HSL, 360, 1, 1, 1);
    gm.graphics = createGraphics(width, height);
    gm.graphics.colorMode(HSL, 360, 1, 1, 1);
    
    gm.offsetY = random();
    gm.player.setPos(gm.width / 2, vh - gm.screenOffset);

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
   
    background(109, 169, 149);
    gm.generateBackground();
    image(gm.graphics, 0, 0);

    kd.tick();  // keydrown handler tick
    gm.next();

    gm.deltaTime = (timestamp - gm.lastTimestamp) / gm.perfectFrame;
    gm.lastTimestamp = timestamp;
}