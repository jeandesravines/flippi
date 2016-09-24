/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/device-names');


//////////////////////////////////////
//////////////////////////////////////

module.exports = Object.freeze({
	channels: {
		motor1: process.env.CHANNEL_MOTOR_1 || 5
	},
	device: process.env.DEVICE || devices.gpio,
	name: process.env.NAME || 'Flippi',
	pin: process.env.PIN || '1234'
});