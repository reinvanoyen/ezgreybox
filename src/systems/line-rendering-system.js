import ECS from 'tnt-ecs';
import { Graphics } from 'pixi.js';

export default class LineRenderingSystem extends ECS.System {
    
    constructor(root) {
        super();
        this.root = root;
    }
    
    test(entity) {
        return (entity.components.position && entity.components.line);
    }

    enter(entity) {
        entity.line = new Graphics();
        this.root.addChild(entity.line);
    }

    exit(entity) {
        this.root.removeChild(entity.line);
        delete entity.line;
    }

    update(entity) {
        
        let { position, line } = entity.components;
        
        entity.line.clear();
        entity.line.lineStyle(line.width, line.color);
        
        
        entity.line.moveTo(position.x, position.y);
        entity.line.lineTo(line.toX, line.toY);
    }
}