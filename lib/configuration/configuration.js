/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const devices = require('../constant/devices');
const uuids = require('../constant/uuids');
const Freezer = require('../helper/freezer');
const UUID = require('../helper/uuid');
const debuggable = (process.env.DEBUG || '').split(',');


module.exports = Freezer.freeze({
  channels: [
    Number.parseInt(process.env.FLIPPI_CHANNEL_0 || 5, 10),
  ],
  uuids: {
    service: new UUID(process.env.FLIPPI_UUID_SERVICE || uuids.service).value,
    speed: new UUID(process.env.FLIPPI_UUID_SPEED || uuids.speed).value,
  },
  debug: debuggable.includes('*') || debuggable.includes('flippi'),
  device: process.env.FLIPPI_DEVICE || devices.five,
  name: process.env.FLIPPI_NAME || 'Flippi',
  pin: process.env.FLIPPI_PIN || '1234',
});
