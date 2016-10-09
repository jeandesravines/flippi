/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/devices');
const debug = (process.env.DEBUG || '').split(',');

module.exports = Object.freeze({
	channels: {
		motor1: process.env.FLIPPI_CHANNEL_MOTOR_1 || 5
	},
	debug: debug.includes('*') || debug.includes('flippi:'),
	device: process.env.FLIPPI_DEVICE || devices.five,
	name: process.env.FLIPPI_NAME || 'Flippi',
	pin: process.env.FLIPPI_PIN || '1234'
});