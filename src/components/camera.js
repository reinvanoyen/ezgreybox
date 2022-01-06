import ECS from "tnt-ecs";

export default class Camera extends ECS.Component {

    getName() {
        return 'camera';
    }
    
    getDefaults() {
        return {
            offsetX: 0,
            offsetY: 0,
            zoom: 1
        };
    }
}