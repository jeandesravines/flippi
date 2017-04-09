/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const devices = require('../../lib/constant/devices');

describe('Configuration', () => {
  const filename = '../../lib/configuration/configuration';

  /* *************************************************** */

  describe('content', () => {
    it('should load the default configuration', () => {
      expect(require(filename)).to.be.deep.equal({
        advertisingInterval: 500,
        channels: [
          5,
        ],
        debug: false,
        device: 'five',
        name: 'Flippi',
        pin: '1234',
        uuids: {
          service: '637a95003d5a11e6ac619e71128cae77',
          speed: '637a95013d5a11e6ac619e71128cae77',
        },
      });
    });

    it('should be customized', () => {
      process.env.DEBUG = '*';
      process.env.FLIPPI_ADVERTISING_INTERVAL = '200';
      process.env.FLIPPI_CHANNEL_0 = '10';
      process.env.FLIPPI_DEVICE = devices.gpio;
      process.env.FLIPPI_NAME = 'Hello';
      process.env.FLIPPI_PIN = 'TEST_PIN';
      process.env.FLIPPI_UUID_SERVICE = '110E8400-E29B-11D4-A716-446655440000';
      process.env.FLIPPI_UUID_SPEED = '110E8400-E29B-11D4-A716-446655440001';

      expect(require(filename)).to.be.deep.equal({
        advertisingInterval: 200,
        channels: [
          10,
        ],
        debug: true,
        device: 'gpio',
        name: 'Hello',
        pin: 'TEST_PIN',
        uuids: {
          service: '110e8400e29b11d4a716446655440000',
          speed: '110e8400e29b11d4a716446655440001',
        },
      });
    });

    it('should change process.env', () => {
      const configuration = require(filename);
      const mapping = {
        BLENO_ADVERTISING_INTERVAL: 'advertisingInterval',
        BLENO_DEVICE_NAME: 'name',
      };

      Object.keys(mapping).forEach((key) => {
        expect(process.env[key]).to.be.equal(configuration[mapping[key]].toString());
      });
    });
  });
});
