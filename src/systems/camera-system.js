import ECS from 'tnt-ecs';
import Messages from "../core/messages";

export default class CameraSystem extends ECS.System {

    constructor() {
        super();
        
        this.width = 0;
        this.height = 0;
        
        Messages.addListener('renderer', e => {
            this.width = e.width;
            this.height = e.height;
        });
    }
    
    test(entity) {
        return entity.components.camera && entity.components.position;
    }

    update(entity) {

        let {camera, position} = entity.components;
        
        Messages.trigger('camera', {
            x: -position.x * camera.zoom + (this.width / 2),
            y: -position.y * camera.zoom + (this.height / 2),
            offsetX: camera.offsetX,
            offsetY: camera.offsetY,
            zoom: camera.zoom
        });
    }
}