import ECS from 'tnt-ecs';

const SLOT_WIDTH = 250;
const SLOT_HEIGHT = 500;

export default class GridSystem extends ECS.System {

    constructor() {
        super();
        
        this.slotList = {};
        this.slotListX = {};
    }
    
    test(entity) {
        return (entity.components.target && entity.components.slot);
    }
    
    update(entity) {
        
        let { target, slot } = entity.components;
        
        if (! this.slotListX[slot.x]) {
            
            // it's a free spot
            this.slotListX[slot.x] = true;
        } else {
            // it's not a free spot
            let posOrNeg = Math.round(Math.random());
            this.slotListX[slot.x - posOrNeg] = true;
            slot.x = slot.x - posOrNeg;
        }
        
        target.x = slot.x * SLOT_WIDTH + (SLOT_WIDTH / 2);
        target.y = slot.y * SLOT_HEIGHT + (SLOT_HEIGHT / 2);
    }
    
    postUpdate() {
        this.slotList = {};
        this.slotListX = {};
    }
}