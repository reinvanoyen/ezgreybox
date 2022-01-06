import ECS from 'tnt-ecs';
import Line from "../components/line";
import math from "../util/math";

export default class EntityLinkingSystem extends ECS.System {
    
    test(entity) {
        return entity.components.parent;
    }
    
    enter(entity) {
        
        let parentEntity = this.core.findEntityById(entity.components.parent.id);
        
        if (parentEntity) {
            // It's not the root entity
            entity.addComponent(new Line({
                width: 8,
                color: 0xFFFF00,
                toX: parentEntity.components.position.x,
                toY: parentEntity.components.position.y
            }));
        }
    }
    
    exit(entity) {
        entity.removeComponent('line');
    }
    
    update(entity) {
        
        let { parent } = entity.components;
        
        let parentEntity = this.core.findEntityById(parent.id);
        
        if (parentEntity.components.position) {
            entity.components.line.toX = parentEntity.components.position.x;
            entity.components.line.toY = parentEntity.components.position.y;
        }
    }
}