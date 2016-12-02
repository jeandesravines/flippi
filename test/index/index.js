/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {before, describe, it} = require('mocha');
const {expect} = require('chai');
const EnvCleaner = require('@jdes/env-cleaner');
const GpioEngineController = require('../../lib/controller/gpio-engine-controller');
const devices = require('../../lib/constant/devices');

describe.skip('index.js', () => {
  const filename = '../../index';
  let flippi;

  before('Register modules to clean', () => {
    EnvCleaner.register(require.resolve(filename));
  });

  /* ******************************** */

  describe('Require', () => {
    it('load index.js with default configuration', () => {
      flippi = require(filename);
      flippi.stop();
    });

    it('load index.js with FLIPPI_DEVICE = GPIO', () => {
      process.env.FLIPPI_DEVICE = devices.gpio;
      flippi = require(filename);
      flippi.stop();

      expect(flippi.engineController).to.be.an.instanceof(GpioEngineController);
    });
  });
});
