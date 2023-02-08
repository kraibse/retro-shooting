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
    }

    next() {
        this.player.render();

        this.enemies.forEach((e, index) => {
            e.move();
            // e.render();
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

    for (let i = 0; i < 30; i++) {
        gm.enemies.push(new Enemy());
    }
}

function draw() {
    let timestamp = Date.now();
    background(173,216,230);

    kd.tick();  // keydrown handler tick
    gm.next();

    gm.deltaTime = (timestamp - gm.lastTimestamp) / gm.perfectFrame;
    gm.lastTimestamp = timestamp;
}