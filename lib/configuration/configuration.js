/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

// Override process.env properties
process.env = Object.assign({
    CHANNEL_MOTOR_1: 5,
    PIN: '1234'
}, process.env);

/////////////////////////////////////
/////////////////////////////////////

module.exports = Object.freeze({
    pin: process.env.PIN,
    channels: {
        motor1: process.env.CHANNEL_MOTOR_1
    }
});