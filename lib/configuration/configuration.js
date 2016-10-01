/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/devices');
const environments = require('../constant/environments');
const environment = process.env.NODE_ENV || environments.production;

//////////////////////////////////////
//////////////////////////////////////

module.exports = Object.freeze({
	channels: {
		motor1: process.env.FLIPPI_CHANNEL_MOTOR_1 || 5
	},
	debug: environment === environments.debug,
	device: process.env.FLIPPI_DEVICE || devices.five,
	environment: environment,
	name: process.env.FLIPPI_NAME || 'Flippi',
	pin: process.env.FLIPPI_PIN || '1234'
});