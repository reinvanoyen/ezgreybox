import ECS from 'tnt-ecs';
import Vec2 from 'tnt-vec2';
import Messages from "../core/messages";

export default class InteractionSystem extends ECS.System {
    
    constructor() {
        super();
        
        this.lastClick = null;
        
        Messages.addListener('click', e => {
            this.lastClick = {x: e.worldX, y: e.worldY};
            this.lastClick.y = e.worldY;
        });
    }
    
    test(entity) {
        return entity.components.interaction && entity.components.position;
    }
    
    update(entity) {
        
        if (this.lastClick) {
            let lastClickVec = new Vec2(this.lastClick.x, this.lastClick.y);
            let positionVec = new Vec2(entity.components.position.x, entity.components.position.y);
            
            if (lastClickVec.sub(positionVec).length() < entity.components.interaction.radius) {
                Messages.trigger('entityClick', {
                    id: entity.id
                });
            }
        }
    }
    
    postUpdate() {
        this.lastClick = null;
    }
}