/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const ProxyBleno = require('../../../mock/proxy/proxy-bleno');
const Manager = require('../../../../lib/bluetooth/manager');
const Authenticator = require('../../../../lib/helper/authenticator');
const uuids = require('../../../../lib/constant/uuids');

describe('Manager', () => {
  let manager;
  const title = 'Test';
  const authenticator = new Authenticator('1234');

  beforeEach('Create', () => {
    manager = new Manager(title, authenticator, new ProxyBleno());
  });

  describe('Create', () => {
    it('should create an instance. (Coverage)', () => {
      manager = new Manager(title, authenticator);
    });
  });

  describe('Events', () => {
    it('should handle advertisingStart event', () => {
      const mock = sinon.mock(manager._manager);
      const expectations = mock.expects('setServices')
          .once()
          .withArgs([manager._service]);

      manager._manager.emit('advertisingStart');
      expectations.verify();
      mock.restore();
    });

    it('should handle advertisingStart event with sucess', () => {
      manager._manager.emit('advertisingStart');
    });

    it('should handle stateChange event with poweredOn', () => {
      const mock = sinon.mock(manager._manager);
      const expectations = mock.expects('startAdvertising')
          .once()
          .withExactArgs(manager.title, [uuids.service]);

      manager._manager.emit('stateChange', 'poweredOn');
      expectations.verify();
      mock.restore();
    });

    it('should handle stateChange event with poweredOff', () => {
      const mock = sinon.mock(manager._manager);
      const expectations = mock.expects('stopAdvertising')
          .once();

      manager._manager.emit('stateChange', 'poweredOff');
      expectations.verify();
      mock.restore();
    });
  });

  describe('Update', () => {
    const authenticator = new Authenticator('1234');
    const bleno = new ProxyBleno();
    const manager = new Manager('Test', authenticator, bleno);

    manager.service.characteristics.forEach((characteristic) => {
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
      const mock = sinon.mock(manager._manager);
      const expectations = mock.expects('stopAdvertising')
          .once();

      return Promise.resolve(manager.stop())
          .then(() => expectations.verify())
          .then(() => mock.restore());
    });
  });
});
