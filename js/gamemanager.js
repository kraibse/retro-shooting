const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const viewportScalingfactor = 0.5625;

class GameManager {
    
    constructor() {
        this.player = new Player();
    }

    next() {
        this.player.render();
        this.player.applyResistance();
    }
}

function setup()
{
    setSize();
    gm.player.setPos($("#defaultCanvas0").width() / 2, vh - 180);
}

function draw() {
    background(173,216,230);
    gm.next();
}

function setSize() {
    
    let renderWidth = Math.min(vw, vh * viewportScalingfactor);
    
    var canvas = createCanvas(renderWidth, vh);
    canvas.parent("canvas");

    select('#ui').size(renderWidth, vh);
}