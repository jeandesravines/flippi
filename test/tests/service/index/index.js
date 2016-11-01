/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const exec = require('child_process').exec;
const Utils = require('../../utils');
const devices = require('../../../../lib/constant/devices');
const GpioEngineController = require('../../../../lib/controller/gpio-engine-controller');

describe('index.js', () => {
  let flippi;

  describe('Require', () => {
    const filename = __dirname + '/../../../../index';

    beforeEach('Clear', () => {
      Utils.deleteProperty(filename);
    });

    /* ************************************** */

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
