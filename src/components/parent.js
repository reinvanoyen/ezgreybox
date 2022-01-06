"use strict";

import ECS from 'tnt-ecs';

export default class Parent extends ECS.Component {

    getName() {
        return 'parent';
    }

    getDefaults() {
        return {
            id: null
        };
    }
}