import ECS from 'tnt-ecs';
import { Graphics } from 'pixi.js';

export default class PolygonRenderingSystem extends ECS.System {

    constructor(root) {
        super();
        this.root = root;
    }

    test(entity) {
        return (entity.components.polygon);
    }

    enter(entity) {
        entity.polygon = new Graphics();
        this.root.addChild(entity.polygon);
    }

    exit(entity) {
        this.root.removeChild(entity.polygon);
        delete entity.polygon;
    }
    
    update(entity) {

        let { polygon } = entity.components;

        entity.polygon.alpha = polygon.alpha;
        entity.polygon.clear();
        entity.polygon.beginFill(polygon.color);
        entity.polygon.drawPolygon(polygon.points);
        entity.polygon.endFill();
    }
}