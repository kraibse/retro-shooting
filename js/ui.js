class UI {

    container = null;

    states= {
        'menu' : {
            init() {
    
            },
    
            draw() {
    
            },
    
            dispose() {
    
            }
        }
    };
    state = 'menu';

    constructor() {
        this.container = document.getElementById('ui');
    }

    draw() {
        this.states[this.state].draw();
    }

    changeState(_state) {
        if(this.states[_state] != null) {
            this.states[this.state].dispose();
            this.state = _state
            this.states[this.state].init();
        }
        else {
            console.error(`The state ${_state} dosnt exist in the states object`);
            console.error(this.states);
        }
    }
}