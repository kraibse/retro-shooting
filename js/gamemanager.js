const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function setup()
{
    var canvas = createCanvas(vw - 16, 600);
    canvas.parent("canvas");
}

function draw() {
    background(0);
}