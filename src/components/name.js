import ECS from "tnt-ecs";

export default class Name extends ECS.Component {

    getName() {
        return 'name';
    }

    getDefaults() {
        return {
            string: 'none'
        };
    }
}