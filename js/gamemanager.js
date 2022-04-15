const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const viewportScalingfactor = 0.5625;

class GameManager {
    width = 0;
    height = 0;
    
    deltaTime = 0;
    lastTimestamp = 0;
    perfectFrame = 1000 / 60;
    
    screenOffset = 180;     // 180px padding
    
    constructor() {
        this.player = new Player();
        this.screenOffset = this.player.size * 4;
    }

    next() {
        this.player.render();
        
        this.player.bullets.forEach((b, index) => {
            if (b.posy < this.screenOffset / 2) {
                this.player.bullets.splice(index, 1);
            }    
            b.move();
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
}

function draw() {
    let timestamp = Date.now();
    background(173,216,230);

    kd.tick();  // keydrown handler tick
    gm.next();

    gm.deltaTime = (timestamp - gm.lastTimestamp) / gm.perfectFrame;
    gm.lastTimestamp = timestamp;
}