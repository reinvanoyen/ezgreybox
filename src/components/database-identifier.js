"use strict";

import ECS from 'tnt-ecs';

export default class DatabaseIdentifier extends ECS.Component {

    getName() {
        return 'dbid';
    }
    
    getDefaults() {
        return {
            value: null
        };
    }
}