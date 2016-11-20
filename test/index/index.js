/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {before, describe, it} = require('mocha');
const {expect} = require('chai');
const Cleaner = require('../../lib/helper/cleaner');
const devices = require('../../lib/constant/devices');
const GpioEngineController = require('../../lib/controller/gpio-engine-controller');

describe('index.js', () => {
  const filename = '../../index';
  let flippi;

  before('Register modules to clean', () => {
    Cleaner.register([
      require.resolve(filename),
    ]);
  });

  /* ******************************** */

  describe('Require', () => {
    it('load index.js with default configuration', () => {
      flippi = require(filename);
    });

    it('load index.js with FLIPPI_DEVICE = GPIO', () => {
      process.env.FLIPPI_DEVICE = devices.gpio;
      flippi = require(filename);

      expect(flippi.engineController).to.be.an.instanceof(GpioEngineController);
    });
  });
});
