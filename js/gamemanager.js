const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const viewportScalingfactor = 0.5625;

function setup()
{
    setSize();
}

function draw() {
    background(125);
}

function setSize() {
    
    let renderWidth = vh * viewportScalingfactor;

    if(renderWidth > vw) {
        renderWidth = vw;
    }

    var canvas = createCanvas(renderWidth, vh);
    canvas.parent("canvas");

    select('#ui').size(renderWidth, vh);
}