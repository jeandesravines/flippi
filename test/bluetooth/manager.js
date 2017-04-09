/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const Bleno = require('../../lib/bluetooth/bleno');
const ProxyBleno = require('../../lib/proxy/proxy-bleno');
const Manager = require('../../lib/bluetooth/manager');
const Authenticator = require('../../lib/helper/authenticator');
const uuids = require('../../lib/constant/uuids');

describe('Manager', () => {
  const title = 'Test';
  const authenticator = new Authenticator('1234');
  let manager;

  beforeEach('Create', () => {
    manager = new Manager(title, authenticator, new ProxyBleno());
  });

  /* ************************************* */

  describe('Module check', () => {
    it('Manager should be an EventEmitter', () => {
      expect(Manager.prototype).to.be.an.instanceof(EventEmitter);
    });

    it('Bleno should be an EventEmitter', () => {
      expect(Bleno.prototype).to.be.an.instanceof(EventEmitter);
    });
  });

  describe('Create', () => {
    it('should create an instance. (Coverage)', () => {
      manager = new Manager(title, authenticator);
    });
  });

  describe('Events', () => {
    it('should handle advertisingStart event', (done) => {
      const spy = sinon.spy(manager._bleno, 'setServices');
      const expectations = spy.withArgs([manager._service]);

      manager._bleno.on('advertisingStart', () => {
        expect(expectations.calledOnce).to.be.equal(true);
        spy.restore();
        done();
      });

      manager._bleno.emit('advertisingStart');
    });

    it('should handle advertisingStart event with success', () => {
      manager._bleno.emit('advertisingStart');
    });

    it('should handle advertisingStart event with error', () => {
      manager._service = null;

      expect(() => manager._bleno.emit('advertisingStart')).to.throws(Error);
    });

    it('should handle stateChange event with poweredOn', (done) => {
      const spy = sinon.spy(manager._bleno, 'startAdvertising');
      const expectations = spy.withArgs(manager.title, [uuids.service]);

      manager._bleno.on('stateChange', () => {
        expect(expectations.calledOnce).to.be.equal(true);
        spy.restore();
        done();
      });

      manager._bleno.emit('stateChange', 'poweredOn');
    });

    it('should handle stateChange event with poweredOff', (done) => {
      const spy = sinon.spy(manager._bleno, 'stopAdvertising');
      const expectations = spy.withArgs();

      manager._bleno.on('stateChange', () => {
        expect(expectations.calledOnce).to.be.equal(true);
        spy.restore();
        done();
      });

      manager._bleno.emit('stateChange', 'poweredOff');
    });
  });

  describe('Update', () => {
    const authenticator = new Authenticator('1234');
    const bleno = new ProxyBleno();
    const manager = new Manager('Test', authenticator, bleno);

    manager._service.characteristics.forEach((characteristic) => {
      it(`should subscribe to "updateValue" event`, (done) => {
        manager.once('updateValue', (value, uuid) => {
          expect(value).to.be.a('string');
          expect(uuid).to.be.equal(characteristic.uuid);
          done();
        });

        characteristic.setValue('Hello');
      });
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const spy = sinon.spy(manager._bleno, 'stopAdvertising');
      const expectations = spy.withArgs();

      return Promise.resolve(manager.stop())
        .then(() => expect(expectations.calledOnce).to.be.equal(true))
        .then(() => spy.restore());
    });
  });
});
