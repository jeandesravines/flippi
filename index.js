/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const configuration = require('./lib/configuration/configuration');
const devices = require('./lib/constant/device-names');
const FlipPi = require('./lib/service/flippi');
const Bleio = require('./lib/service/bleio');
const Authenticator = require('./lib/helper/authenticator');
const EngineController = require('./lib/service/engine-controller');
const GpioEngineController = require('./lib/service/gpio-engine-controller');

const CHANNEL_MOTOR_1 = configuration.channels.motor1;
const PIN = configuration.pin;
const DEVICE = configuration.device;
const NAME = configuration.name;

////////////////////////////////////////////////////
////////////////////////////////////////////////////

const engine = DEVICE === devices.gpio ?  new GpioEngineController(CHANNEL_MOTOR_1) : new EngineController(CHANNEL_MOTOR_1);
const bleio = new Bleio(NAME, new Authenticator(PIN));
const flippi = new FlipPi(bleio, engine);

process.on('exit', flippi.stop.bind(flippi));