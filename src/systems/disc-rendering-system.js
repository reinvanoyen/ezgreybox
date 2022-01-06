import ECS from 'tnt-ecs';
import { Graphics } from 'pixi.js';

export default class DiscRenderingSystem extends ECS.System {
    
    constructor(root) {
        super();
        this.root = root;
    }
    
    test(entity) {
        return (entity.components.position && entity.components.disc);
    }

    enter(entity) {
        entity.disc = new Graphics();
        this.root.addChild(entity.disc);
    }

    exit(entity) {
        this.root.removeChild(entity.disc);
        delete entity.disc;
    }

    update(entity) {
        
        let { position, disc } = entity.components;
        
        entity.disc.clear();
        entity.disc.beginFill(disc.color);
        entity.disc.drawCircle(position.x, position.y, disc.radius);
        entity.disc.endFill();
    }
}