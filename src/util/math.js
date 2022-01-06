"use strict";

const math = {
    randBetween: (min, max) => {
        return Math.floor(Math.random() * max) + min;
    },
    randFloatBetween: (min, max) => {
        return (Math.random() * (max - min) + min);
    },
    randBetweenPosNeg: (min, max) => {
        return math.randBetween(min, max) * (Math.round(Math.random()) ? 1 : -1)
    },
    randDegreeBetween: (min, max) => {
        return (Math.random() * (max - min) + min) / 180 * Math.PI;
    },
    pointInDirection: (angle, distance) => {
        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        };
    },
    minFromArray: (array) => {
        return Math.min.apply(Math, array);
    },
    maxFromArray: (array) => {
        return Math.max.apply(Math, array);
    },
    /*
    randomCircularPointBetween: (min, max) => {
        
        var rand = Math.random;
        var sin = Math.sin;
        var cos = Math.cos;
        var PI = Math.PI;
        var TWO_PI = PI * 2;
    
        //generate a random distance between min and max
        var dist = rand() * (max - min) + min;
        
        //generate a random angle between 0 and PI * 2
        var rads = rand() * TWO_PI;
    
        // calculate the point on a cirlce with: 
        // radius: dist
        // angle: rads
        var x = sin(rads) * dist;
        var y = cos(rads) * dist;
    
        // return a simple point object
        return {x: x, y: y};
    },*/
};

export default math;