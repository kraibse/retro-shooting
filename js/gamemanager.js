const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const viewportScalingfactor = 0.5625;

let canvas;
let ui = null;

function setup()
{
    ui = new UI();
    setSize();
}

function draw() {
    canvas.draw();
    ui.draw();
}

function setSize() {
    
    let renderWidth = vh * viewportScalingfactor;

    if(renderWidth > vw) {
        renderWidth = vw;
    }

    canvas = new Canvas(createCanvas(renderWidth, vh));

    select('#ui').size(renderWidth, vh);
}