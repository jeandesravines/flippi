/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const configuration = require('./lib/configuration/configuration');
const devices = require('./lib/constant/devices');
const segfaultHandler = require('segfault-handler');
const Manager = require('./lib/bluetooth/manager');
const Authenticator = require('./lib/helper/authenticator');
const FlipPi = require('./lib/service/flippi');
const FiveEngineController = require('./lib/controller/five-engine-controller');
const GpioEngineController = require('./lib/controller/gpio-engine-controller');

const CHANNEL_MOTOR_1 = configuration.channels.motor1;
const PIN = configuration.pin;
const DEVICE = configuration.device;
const NAME = configuration.name;

let flippi;

///////////////////////////////////////////////
///////////////////////////////////////////////

segfaultHandler.registerHandler('');
process.on('exit', () => {
	if (flippi) {
		flippi.stop();
	}
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const EngineClassController = DEVICE === devices.gpio ? GpioEngineController : FiveEngineController;
const controller = new EngineClassController(CHANNEL_MOTOR_1);
const manager = new Manager(NAME, new Authenticator(PIN));

flippi = new FlipPi(manager, controller);
