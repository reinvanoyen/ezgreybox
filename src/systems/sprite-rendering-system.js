import ECS from 'tnt-ecs';
import {Graphics, Sprite, Texture} from 'pixi.js';

export default class SpriteRenderingSystem extends ECS.System {
    
    constructor(root) {
        super();
        this.root = root;
    }
    
    test(entity) {
        return (entity.components.position && entity.components.sprite);
    }

    enter(entity) {
        entity.sprite = new Sprite(Texture.from(entity.components.sprite.src));
        this.root.addChild(entity.sprite);
    }

    exit(entity) {
        this.root.removeChild(entity.sprite);
        delete entity.sprite;
    }

    update(entity) {
        
        let { position, sprite } = entity.components;
        
        entity.sprite.anchor.x = sprite.anchorX;
        entity.sprite.anchor.y = sprite.anchorY;
        entity.sprite.scale.x = sprite.scaleX;
        entity.sprite.scale.y = sprite.scaleY;
        entity.sprite.position.x = position.x;
        entity.sprite.position.y = position.y;
    }
}