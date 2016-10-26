/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const uuids = require('../../../../lib/constant/uuids');
const Flippi = require('../../../../lib/service/flippi');
const ProxyManager = require('../../../mock/proxy/proxy-manager');
const ProxyEngineController = require('../../../mock/proxy/proxy-engine-controller');

describe('Flippi', () => {
  let flippi;

  beforeEach('Create', () => {
    flippi = new Flippi(new ProxyManager(), new ProxyEngineController());
  });

  describe('Update', () => {
    it('should handle onUpdateValue event', () => {
      const spy = sinon.spy(flippi, 'onUpdateValue');
      const uuid = '1234';
      const value = 0.5;

      flippi.manager.emit('updateValue', value, uuid);

      expect(spy.withArgs(uuid, value).calledOnce);
      spy.restore();
    });

    it('should handle onUpdateValue event and do nothing.', () => {
      flippi.manager.emit('updateValue', 'unknown', 0.5);
    });

    it('should update the speed', () => {
      const uuid = uuids.characteristics.speed;
      const value = 0.5;
      const mock = sinon.mock(flippi.engineController);
      const expectations = mock.expects('setValue')
          .once()
          .withArgs(value);

      return Promise.resolve(flippi.manager.emit('updateValue', value, uuid))
          .then(() => expectations.verify())
          .then(() => mock.restore());
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const mock = sinon.mock(flippi.manager);
      const expectations = mock.expects('stop')
          .once();

      return Promise.resolve(flippi.stop())
          .then(() => expectations.verify())
          .then(() => mock.restore());
    });
  });

  describe('Events', () => {
    it('should handle onReady event', () => {
      const spy = sinon.spy(flippi, 'emit');

      flippi.engineController.emit('ready');
      expect(spy.calledOnce);
      spy.restore();
    });
  });
});
