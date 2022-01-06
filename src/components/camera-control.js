import ECS from "tnt-ecs";

export default class CameraControl extends ECS.Component {

    getName() {
        return 'cameraControl';
    }
    
    getDefaults() {
        return {
            origin: {
                x: 0,
                y: 0
            }
        };
    }
}