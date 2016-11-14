/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/devices');
const uuids = require('../constant/uuids');
const Freezer = require('../helper/freezer');
const UUID = require('../helper/uuid');
const env = process.env;

const debuggable = (env.DEBUG || '').split(',');
const configuration = Freezer.freeze({
  advertisingInterval: parseInt(env.FLIPPI_ADVERTISING_INTERVAL || 500, 10),
  channels: [
    parseInt(env.FLIPPI_CHANNEL_0 || 5, 10),
  ],
  debug: debuggable.includes('*') || debuggable.includes('flippi'),
  device: env.FLIPPI_DEVICE || devices.five,
  name: env.FLIPPI_NAME || 'Flippi',
  pin: env.FLIPPI_PIN || '1234',
  uuids: {
    service: new UUID(env.FLIPPI_UUID_SERVICE || uuids.service).value,
    speed: new UUID(env.FLIPPI_UUID_SPEED || uuids.speed).value,
  },
});

/* ********************************************* */

env.BLENO_DEVICE_NAME = configuration.name;
env.BLENO_ADVERTISING_INTERVAL = configuration.advertisingInterval;


module.exports = configuration;
