const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const viewportScalingfactor = 0.5625;

class GameManager {
    deltaTime = 0;
    screenOffset = 180;     // 180px padding
    
    constructor() {
        this.player = new Player();
    }

    next() {
        this.player.render();

        this.player.bullets.forEach((b, index) => {
            if (b.posy < this.screenOffset / 2) {
                this.player.bullets.splice(index, 1);
            }

            b.move();
        });

        this.player.applyResistance();
    }
}

function setup()
{
    setSize();
    gm.player.setPos($("#defaultCanvas0").width() / 2, vh - gm.screenOffset);
}

function draw() {
    background(173,216,230);

    let startTime = Date.now();
    gm.next();
    gm.deltaTime = Date.now() - startTime;
}

function setSize() {
    
    let renderWidth = Math.min(vw, vh * viewportScalingfactor);
    
    var canvas = createCanvas(renderWidth, vh);
    canvas.parent("canvas");

    select('#ui').size(renderWidth, vh);
}