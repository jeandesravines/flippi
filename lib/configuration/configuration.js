/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/device-names');


//////////////////////////////////////
//////////////////////////////////////

module.exports = Object.freeze({
	channels: {
		motor1: process.env.FLIPPI_CHANNEL_MOTOR_1 || 5
	},
	device: process.env.FLIPPI_DEVICE || devices.gpio,
	environment: process.env.NODE_ENV || 'production',
	name: process.env.FLIPPI_NAME || 'Flippi',
	pin: process.env.FLIPPI_PIN || '1234'
});