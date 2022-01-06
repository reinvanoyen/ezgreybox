"use strict";

import ECS from 'tnt-ecs';

export default class Polygon extends ECS.Component {

    getName() {
        return 'polygon';
    }

    getDefaults() {
        return {
            points: [],
            color: 0XF00000,
            alpha: 1
        };
    }
}