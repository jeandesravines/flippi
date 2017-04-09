/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, afterEach, describe, it} = require('mocha');
const {expect} = require('chai');
const Bleno = require('../../lib/bluetooth/bleno');
const Authenticator = require('../../lib/helper/authenticator');
const Characteristic = require('../../lib/bluetooth/characteristic');
const uuids = require('../../lib/constant/uuids');

describe('Characteristic', () => {
  let characteristic;

  beforeEach('Create', () => {
    characteristic = new Characteristic({
      uuid: uuids.speed,
    }, new Authenticator('1234'));
  });

  afterEach('Delete', () => {
    characteristic = null;
  });

  describe('Write', () => {
    it('should write a Buffer', (done) => {
      characteristic.emit('writeRequest', null, 0, false, (status) => {
        expect(status).to.be.equal(Bleno.Characteristic.RESULT_SUCCESS);
        done();
      });
    });
  });

  describe('Update', () => {
    it('should emit an "updateValue" event', (done) => {
      characteristic.on('updateValue', (value, source) => {
        expect(value).to.be.equal('Hello');
        expect(source).to.be.equal(characteristic);
        done();
      });

      characteristic.setValue('Hello');
    });
  });

  describe('Read', () => {
    it('should return a valid Buffer', (done) => {
      characteristic.setValue('Hello');
      characteristic.emit('readRequest', 0, (status, value) => {
        expect(status).to.be.equal(Bleno.Characteristic.RESULT_SUCCESS);
        expect(value.toString()).to.be.equal('Hello');
        done();
      });
    });
  });
});
