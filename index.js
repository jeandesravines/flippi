/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('./lib/helper/debug');
const configuration = require('./lib/configuration/configuration');
const devices = require('./lib/constant/devices');
const segfaultHandler = require('segfault-handler');
const Manager = require('./lib/bluetooth/manager');
const Authenticator = require('./lib/helper/authenticator');
const Flippi = require('./lib/service/flippi');
const FiveEngineController = require('./lib/controller/five-engine-controller');
const GpioEngineController = require('./lib/controller/gpio-engine-controller');

const CHANNELS = configuration.channels;
const PIN = configuration.pin;
const DEVICE = configuration.device;
const NAME = configuration.name;

/* ****************************************** */

segfaultHandler.registerHandler('');
debug(configuration);

/* ****************************************** */

const gpio = DEVICE === devices.gpio;
const EngineController = gpio ? GpioEngineController : FiveEngineController;
const controller = new EngineController(CHANNELS);
const manager = new Manager(NAME, new Authenticator(PIN));
const flippi = new Flippi(manager, controller);

process.on('exit', flippi.stop.bind(flippi));


module.exports = flippi;
