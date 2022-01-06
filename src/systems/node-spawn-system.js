
import ECS from 'tnt-ecs';
import Messages from "../core/messages";
import math from "../util/math";
import Sprite from "../components/sprite";
import Position from "../components/position";
import Target from "../components/target";
import Velocity from "../components/velocity";
import Parent from "../components/parent";
import Interaction from "../components/interaction";
import Slot from "../components/slot";

export default class NodeSpawnSystem extends ECS.System {
    
    constructor() {
        super();

        Messages.addListener('entityClick', e => {
            
            let entity = this.core.findEntityById(e.id);
            
            let { position, slot } = entity.components;
            
            let slotX = 0;
            let slotY = 0;
            
            if (slot) {
                slotX = slot.x - math.randBetweenPosNeg(-3, 3);
                slotY = slot.y - 1;
            }
            
            let spriteSources = [
                'https://udb2-media.imgix.net/20141001/00ac3afa-af44-43d0-822d-304e431799f8.jpg',
                'https://images2.persgroep.net/rcs/MoZBT76hHYhQ98DCGuchTz7wTlk/diocontent/175933278/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8'
            ];
            
            this.core.addEntity(new ECS.Entity([
                new Slot({
                    x: slotX,
                    y: slotY
                }),
                new Sprite({
                    src: spriteSources[Math.floor(Math.random() * spriteSources.length)],
                    scaleX: .25,
                    scaleY: .25,
                }),
                new Position(position),
                new Target({
                    x: position.x,
                    y: position.y
                }),
                new Velocity(),
                new Parent({
                    id: entity.id
                }),
                new Interaction(),
            ]));
        });
    }
}