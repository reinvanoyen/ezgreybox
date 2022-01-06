import ECS from 'tnt-ecs';
import Messages from "../core/messages";

export default class CameraControlSystem extends ECS.System {

    constructor() {
        super();

        this.look = false;
        this.drag = false;
        this.origin = [0,0];

        Messages.addListener('keydown', code => {
            if (code === 'Space') {
                this.look = true;
            }
        });

        Messages.addListener('keyup', code => {
            if (code === 'Space') {
                this.look = false;
            }
        });
        
        Messages.addListener('mousedown', data => {
            
            this.origin = [data.worldX, data.worldY];
            this.drag = true;
        });

        Messages.addListener('mouseup', data => {
            
            this.drag = false;
            this.origin = [0,0];
            
            this.entities.forEach(entity => {
                entity.components.position.x = entity.components.position.x - entity.components.camera.offsetX;
                entity.components.position.y = entity.components.position.y - entity.components.camera.offsetY;

                entity.components.camera.offsetX = 0;
                entity.components.camera.offsetY = 0;
            });
        });
        
        Messages.addListener('mousemove',  data => {
            
            if (this.look && this.drag) {
                
                this.entities.forEach(entity => {
                    
                    let diffX = data.worldX - this.origin[0];
                    let diffY = data.worldY - this.origin[1];
                    
                    entity.components.camera.offsetX = diffX;
                    entity.components.camera.offsetY = diffY;
                });
            }
        });
    }
    
    test(entity) {
        return entity.components.position && entity.components.camera && entity.components.cameraControl;
    }
}