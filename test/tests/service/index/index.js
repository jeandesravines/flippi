/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const path = require('path');
const Utils = require('../../utils');
const devices = require('../../../../lib/constant/devices');
const GpioEngineController = require('../../../../lib/controller/gpio-engine-controller');

describe('index.js', () => {
  const dirname = path.join(__dirname, '..', '..', '..', '..');
  const filename = path.join(dirname, 'index');
  let flippi;

  before('Register', () => Utils.register([filename]));
  after('Unregister', () => Utils.unregister([filename]));

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
