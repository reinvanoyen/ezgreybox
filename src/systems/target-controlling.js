import ECS from 'tnt-ecs';
import Messages from "../core/messages";

export default class TargetControlling extends ECS.System {

    constructor() {
        super();
        
        Messages.addListener('mousemove', data => {
            this.entities.forEach(entity => {
                entity.components.target.x = data.worldX;
                entity.components.target.y = data.worldY;
            });
        });
    }
    
    test(entity) {
        return entity.components.target && entity.components.targetControl;
    }
}