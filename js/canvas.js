class Canvas{

    drawing = true;

    canvas = null;

    constructor(_canvas) {

        this.canvas = _canvas
        this.canvas.parent("canvas");
    }

    draw() {
        if(this.drawing == false) return;
        background(125);
    }


}