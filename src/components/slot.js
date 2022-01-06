import ECS from "tnt-ecs";

export default class Slot extends ECS.Component {

    getName() {
        return 'slot';
    }

    getDefaults() {
        return {
            x: 0,
            y: 0
        };
    }
}