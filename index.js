/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const configuration = require('./lib/configuration/configuration');
const devices = require('./lib/constant/devices');
const environments = require('./lib/constant/environments');
const debug = require('./lib/helper/debug');
const segfaultHandler = require('segfault-handler');
const FlipPi = require('./lib/service/flippi');
const Bleio = require('./lib/service/bleio');
const Authenticator = require('./lib/helper/authenticator');
const EngineController = require('./lib/service/engine-controller');
const GpioEngineController = require('./lib/service/gpio-engine-controller');

const CHANNEL_MOTOR_1 = configuration.channels.motor1;
const PIN = configuration.pin;
const DEVICE = configuration.device;
const NAME = configuration.name;

let flippi;

///////////////////////////////////////////////
///////////////////////////////////////////////

debug('Starting');
debug('Configuration', configuration);

segfaultHandler.registerHandler('');
process.on('exit', () => flippi && flippi.stop());

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const EngineClassController = DEVICE === devices.gpio ? GpioEngineController : EngineController;
const engine = new EngineClassController(CHANNEL_MOTOR_1);
const bleio = new Bleio(NAME, new Authenticator(PIN));

flippi = new FlipPi(bleio, engine);

debug('Started');