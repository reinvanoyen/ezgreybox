"use strict";

import ECS from 'tnt-ecs';

export default class Line extends ECS.Component {

    getName() {
        return 'line';
    }

    getDefaults() {
        return {
            toX: 0,
            toY: 0,
            width: 1,
            color: 0xFFFFFF
        };
    }
}