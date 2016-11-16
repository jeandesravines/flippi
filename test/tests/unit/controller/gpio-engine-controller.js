/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const Catcher = require('@jdes/catcher');
const Gpio = require('@jdes/gpio');
const ProxyGpio = require('../../../lib/proxy/proxy-gpio');
const GpioEngineController = require('../../../../lib/controller/gpio-engine-controller');

describe('GpioEngineController', () => {
  const channel = 7;
  let controller;

  beforeEach('Create', () => {
    controller = new GpioEngineController(channel, new ProxyGpio());
  });

  /* ************************************* */

  describe('Module check', () => {
    it('Gpio should be an EventEmitter', () => {
      expect(Gpio.prototype).to.be.an.instanceof(EventEmitter);
    });

    it('GpioEngineController should be an EventEmitter', () => {
      expect(GpioEngineController.prototype).to.be.an.instanceof(EventEmitter);
    });
  });

  describe('Create', () => {
    it('should eventually create an instance.', () => {
      Catcher.resolve(() => {
        controller = new GpioEngineController(channel);
      });
    });
  });

  describe('Update', () => {
    const values = [
      {in: 0.5, out: 0.5},
      {in: 0, out: 0},
      {in: NaN, out: 0}];

    values.forEach((args) => {
      it(`should set the value to ${args.in}`, () => {
        const mock = sinon.mock(controller._gpio);
        const expectations = mock.expects('setAnalogValue')
            .once()
            .returns(Promise.resolve())
            .withArgs(channel, args.out);

        return controller.setValue(args.in)
            .then(() => expectations.verify())
            .then(() => mock.restore());
      });
    });
  });

  describe('Events', () => {
    it('should init the pin', () => {
      const gpio = new ProxyGpio();
      const spy = sinon.spy(gpio, 'open');

      controller = new GpioEngineController(channel, gpio);
      expect(spy.withArgs(channel, Gpio.direction.out).calledOnce);
      spy.restore();
    });

    it('should handle the ready event', (done) => {
      const gpio = new ProxyGpio();
      const controller = new GpioEngineController(channel, gpio);

      controller.on('ready', () => done());
      gpio.emit('ready');
    });

    it('should not handle the ready event', () => {
      const gpio = new ProxyGpio();

      controller = new GpioEngineController(-2, gpio);
      gpio.emit('ready');
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const mock = sinon.mock(controller._gpio);
      const expectations = mock.expects('close')
          .once()
          .withArgs(channel);

      return controller.stop()
          .then(() => expectations.verify())
          .then(() => mock.restore());
    });
  });
});
