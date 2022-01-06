"use strict";

import ECS from 'tnt-ecs';

export default class Interaction extends ECS.Component {

    getName() {
        return 'interaction';
    }

    getDefaults() {
        return {
            radius: 100,
            click: false
        };
    }
}