import ECS from 'tnt-ecs';
import Vec2 from 'tnt-vec2';

/*

* TargetMovement
* 
* This system is responsible for moving a position towards a target by velocity
* 
* */
export default class TargetMovementSystem extends ECS.System {
    
    test(entity) {
        return entity.components.position && entity.components.target && entity.components.velocity;
    }
    
    update(entity) {
        
        let { velocity } = entity.components;
        
        let position = new Vec2(entity.components.position.x, entity.components.position.y);
        let target = new Vec2(entity.components.target.x, entity.components.target.y);
        let velocityVec = new Vec2(velocity.x, velocity.y);

        let desiredVelocity = target.sub(position).normalize();
        let distance = desiredVelocity.length();
        
        let maxVelocity = velocity.max;
        let slowingRadius = velocity.slowingRadius;
        let mass = velocity.mass;
        
        if (distance < slowingRadius) {
            desiredVelocity = desiredVelocity.normalize().mul(maxVelocity).mul(distance / slowingRadius);
        } else {
            desiredVelocity = desiredVelocity.normalize().mul(maxVelocity);
        }

        let steering = desiredVelocity.sub(velocityVec).div(mass); // divide by mass
        velocity = velocityVec.add(steering);
        
        entity.components.velocity.x = velocity.x;
        entity.components.velocity.y = velocity.y;
    }
}