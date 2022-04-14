class UI {

    container = null;

    states= {};
    state = 'menu';

    constructor() {
        this.container = document.querySelector('#ui');
        this.addStates();
        this.states[this.state].init(this.container);
    }

    draw() {
        this.states[this.state].draw(this.container);
    }

    changeState(_state) {
        if(this.states[_state] != null) {
            this.states[this.state].dispose(this.container);
            this.state = _state
            this.states[this.state].init(this.container);
        }
        else {
            console.error(`The state ${_state} dosnt exist in the states object`);
            console.error(this.states);
        }
    }

    addStates() {
        //Menu State
        this.states['menu'] = {
            init(ui_container) {
                this.elements['shopbutton'] = document.createElement('button');
                this.elements['shopbutton'].innerText = 'SHOP';
                this.elements['shopbutton'].classList.add('button');
                this.elements['shopbutton'].classList.add('shop');
                this.elements['shopbutton'].onclick = ()=> {
                    ui.changeState('shop');
                }

                this.elements['startbutton']= document.createElement('button');
                this.elements['startbutton'].innerText = 'START';
                this.elements['startbutton'].classList.add('button');
                this.elements['startbutton'].classList.add('start');
                this.elements['startbutton'].onclick = ()=> {
                    ui.changeState('game');
                }

                this.elements['button-container']= document.createElement('div');
                this.elements['button-container'].classList.add('button-container');
                this.elements['button-container'].appendChild(this.elements['shopbutton']);
                this.elements['button-container'].appendChild(this.elements['startbutton']);

                Object.keys(this.elements).forEach(key => {
                    if(!this.excludes.includes(key)) {
                        ui_container.appendChild(this.elements[key]);
                        ui_container.classList.add('menu');
                    }
                });
            },
    
            draw(ui_container) {
    
            },
    
            dispose(ui_container) {
                Object.keys(this.elements).forEach(key => {
                    if(!this.excludes.includes(key)) {
                        this.elements[key].remove();
                        ui_container.classList.remove('menu')
                    }
                });
            },
            elements : {},
            excludes : [
                'shopbutton',
                'startbutton'
            ]
        }

        //Shop state
        this.states['shop'] = {
            init(ui_container) {
                
                Object.keys(this.elements).forEach(key => {
                    ui_container.appendChild(this.elements[key]);
                    ui_container.classList.add('shop');
                });
            },
    
            draw(ui_container) {
    
            },
    
            dispose(ui_container) {
                Object.keys(this.elements).forEach(key => {
                    this.elements[key].remove();
                    ui_container.classList.remove('shop')
                });
            },
            elements : {}
        }

        //Shop state
        this.states['game'] = {
            init(ui_container) {
                
                Object.keys(this.elements).forEach(key => {
                    ui_container.appendChild(this.elements[key]);
                    ui_container.classList.add('game');
                });
            },
    
            draw(ui_container) {
    
            },
    
            dispose(ui_container) {
                Object.keys(this.elements).forEach(key => {
                    this.elements[key].remove();
                    ui_container.classList.remove('game')
                });
            },
            elements : {}
        }
    }
}