"use strict";

export default class Messages {
    
    static addListener(id, call) {
        if (! this.listeners) {
            this.listeners = {};
        }
        if (! this.listeners[id]) {
            this.listeners[id] = [];
        }
        this.listeners[id].push(call);
    }

    static trigger(id, data) {
        
        if (! this.queue) {
            this.queue = [];
        }
        
        if (! this.listeners || ! this.listeners[id]) {
            return;
        }
        
        this.listeners[id].forEach(c => this.queue.push([c, data]));
    }

    static process() {

        if (! this.queue) {
            return;
        }

        this.queue.forEach(q => {
            q[0](q[1]);
        });
        
        this.queue = [];
    }
}