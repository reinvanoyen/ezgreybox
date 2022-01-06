import ECS from 'tnt-ecs';
import Messages from "../core/messages";

export default class InputSystem extends ECS.System {

    constructor() {
        
        super();
        
        this.camera = {
            x: 0,
            y: 0,
            offsetX: 0,
            offsetY: 0,
            zoom: 1
        };
        
        Messages.addListener('camera', e => {
            this.camera = e;
        });
        
        document.body.addEventListener('mousedown', e => {
            Messages.trigger('mousedown', this.transformDomEvent(e));
        });
        
        document.body.addEventListener('click', e => {
            Messages.trigger('click', this.transformDomEvent(e));
        });
        
        document.body.addEventListener('mouseup', e => {
            Messages.trigger('mouseup', this.transformDomEvent(e));
        });
        
        document.body.addEventListener('mousemove', e => {
            Messages.trigger('mousemove', this.transformDomEvent(e));
        });
        
        document.body.addEventListener('keydown', e => {
            Messages.trigger('keydown', e.code);
        });

        document.body.addEventListener('keyup', e => {
            Messages.trigger('keyup', e.code);
        });
    }
    
    transformDomEvent(e) {
        return {
            localX: e.clientX,
            localY: e.clientY,
            worldX: (e.clientX - this.camera.x) / this.camera.zoom,
            worldY: (e.clientY - this.camera.y) / this.camera.zoom
        };
    }
}