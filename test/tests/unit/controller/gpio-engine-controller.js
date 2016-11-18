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
  const channels = [5, 7];
  let gpio;
  let controller;

  beforeEach('Create', () => {
    gpio = new ProxyGpio();
    controller = new GpioEngineController(channels, gpio);
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
        controller = new GpioEngineController(channels);
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
        const spy = sinon.spy(controller._gpio, 'setAnalogValue');
        const expectations = [
          spy.withArgs(channels[0], args.out),
          spy.withArgs(channels[1], args.out),
        ];

        return controller.setValue(args.in)
          .then(() => {
            expectations.forEach((expectation) => {
              expect(expectation.calledOnce).to.be.equal(true);
            });
          })
          .then(() => spy.restore());
      });
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const spy = sinon.spy(controller, 'setValue');

      return controller.stop()
        .then(() => expect(spy.withArgs(0).calledOnce).to.be.equal(true))
        .then(() => spy.restore());
    });
  });

  describe('Events', () => {
    it('should handle the ready event', (done) => {
      controller.on('ready', () => done());
      gpio.emit('ready');
    });

    it('should init the pin', (done) => {
      const spy = sinon.spy(gpio, 'open');
      const expectations = [
        spy.withArgs(channels[0], Gpio.direction.out),
        spy.withArgs(channels[1], Gpio.direction.out),
      ];

      controller.on('ready', () => {
        expectations.forEach((expectation) => {
          expect(expectation.calledOnce).to.be.equal(true);
        });
        spy.restore();
        done();
      });

      gpio.emit('ready');
    });

    it('should not handle the ready event', () => {
      const gpio = new ProxyGpio();

      controller = new GpioEngineController([-2], gpio);
      controller.on('ready', () => {
        throw new Error();
      });
      gpio.emit('ready');
    });
  });

  describe('Close', () => {
    it('should close', () => {
      const spy = sinon.spy(controller._gpio, 'close');
      const expectations = [
        spy.withArgs(channels[0]),
        spy.withArgs(channels[1]),
      ];

      return controller.close()
        .then(() => {
          expectations.forEach((expectation) => {
            expect(expectation.calledOnce).to.be.equal(true);
          });
        })
        .then(() => spy.restore());
    });
  });
});
