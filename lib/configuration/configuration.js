/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * @type {Object.<string, string|number>}
 */
const defaults = Object.assign({}, {
    CHANNEL_MOTOR_1: 5,
    PIN: '1234'
}, process.env);

/**
 * @type {Object}
 */
const configuration = Object.freeze({
    pin: defaults.PIN,
    channels: {
        motor1: defaults.CHANNEL_MOTOR_1
    }
});

/////////////////////////////////////
/////////////////////////////////////

module.exports = configuration;