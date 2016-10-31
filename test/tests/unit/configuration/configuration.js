/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const devices = require('../../../../lib/constant/devices');
const Freezer = require('../../../../lib/helper/freezer');

describe('Configuration', () => {
  describe('content', () => {
    const configurationFilename = '../../../../lib/configuration/configuration';
    const processEnvVariables = Freezer.freeze(Object.assign({}, process.env));

    /**
     * Remove the configuration from the package manager's cache
     */
    const clear = () => {
      Reflect.deleteProperty(require.cache, require.resolve(configurationFilename));
    };

    /**
     * Get the global configuration
     * @return {Object} the global configuration
     */
    const getConfiguration = () => {
      return require(configurationFilename);
    };

    beforeEach('Delete require\'s cache', () => {
      clear();
    });

    afterEach('Reset process.env', () => {
      clear();
      Object.assign(process.env, processEnvVariables);
    });

    it('should be customized', () => {
      process.env.FLIPPI_CHANNEL_0 = '10';
      process.env.FLIPPI_DEVICE = devices.five;
      process.env.FLIPPI_NAME = 'Hello';
      process.env.FLIPPI_PIN = 'TEST_PIN';
      process.env.FLIPPI_UUID_SERVICE = '110E8400-E29B-11D4-A716-446655440000';
      process.env.FLIPPI_UUID_SPEED = '110E8400-E29B-11D4-A716-446655440001';
      process.env.DEBUG = '*';

      expect(getConfiguration()).to.be.deep.equal({
        channels: [
          Number.parseInt(process.env.FLIPPI_CHANNEL_0, 10),
        ],
        uuids: {
          service: '110e8400e29b11d4a716446655440000',
          speed: '110e8400e29b11d4a716446655440001',
        },
        debug: true,
        device: process.env.FLIPPI_DEVICE,
        name: process.env.FLIPPI_NAME,
        pin: process.env.FLIPPI_PIN,
      });
    });
  });
});
