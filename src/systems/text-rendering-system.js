import ECS from 'tnt-ecs';
import { Text } from 'pixi.js';

export default class TextRenderingSystem extends ECS.System {
    
    constructor(root) {
        super();
        this.root = root;
    }
    
    test(entity) {
        return (entity.components.position && entity.components.text);
    }

    enter(entity) {
        
        entity.text = new Text(entity.components.text.string, {
            fontFamily: 'Arial',
            fontSize: entity.components.text.size,
            fill: entity.components.text.color
        });
        
        entity.text.anchor.x = .5;
        entity.text.anchor.y = .5;
        
        this.root.addChild(entity.text);
    }

    exit(entity) {
        this.root.removeChild(entity.text);
        delete entity.text;
    }

    update(entity) {
        
        let { position, text } = entity.components;
        
        entity.text.x = position.x;
        entity.text.y = position.y;
        entity.text.text = text.string;
        entity.text.fontSize = text.size;
    }
}