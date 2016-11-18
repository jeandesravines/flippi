/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const uuids = require('../../../../lib/constant/uuids');
const Flippi = require('../../../../lib/service/flippi');
const ProxyManager = require('../../../lib/proxy/proxy-manager');
const ProxyEngineController = require('../../../lib/proxy/proxy-engine-controller');

describe('Flippi', () => {
  let flippi;

  beforeEach('Create', () => {
    flippi = new Flippi(new ProxyManager(), new ProxyEngineController());
  });

  /* ************************************ */

  describe('Update', () => {
    it('should handle onUpdateValue event and do nothing.', (done) => {
      flippi.on('updateValue', (value, uuid) => {
        expect(value).to.be.equal(0.5);
        expect(uuid).to.be.equal('0000');
        done();
      });

      flippi.manager.emit('updateValue', 0.5, '0000');
    });

    it('should handle onUpdateValue event', () => {
      const uuid = '1234';
      const value = 0.5;
      const spy = sinon.spy(flippi, 'emit');
      const expectation = spy.withArgs('updateValue', value, uuid);

      flippi.manager.emit('updateValue', value, uuid);
      expect(expectation.calledOnce).to.be.equal(true);
      spy.restore();
    });

    it('should update the speed', (done) => {
      const uuid = uuids.speed;
      const value = 0.5;
      const mock = sinon.mock(flippi.engineController);
      const expectations = mock.expects('setValue')
        .once()
        .withArgs(value);

      flippi.on('updateValue', () => {
        expectations.verify();
        mock.restore();
        done();
      });

      flippi.manager.emit('updateValue', value, uuid);
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
      const expectation = spy.withArgs('ready');

      flippi.engineController.emit('ready');
      expect(expectation.calledOnce).to.be.equal(true);
      spy.restore();
    });
  });
});
