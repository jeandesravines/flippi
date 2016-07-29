/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, afterEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const Characteristic = require('bleno/lib/characteristic');
const Authenticator = require('../../lib/helper/authenticator');
const FlipPiCharacteristic = require('../../lib/helper/flippi-characteristic');
const uuids = require('../../lib/constant/uuids');

const uuid = uuids.characteristics.speed;
const pin = '1234';
let characteristic;

describe('FlipPiCharacteristic', () => {
	beforeEach('Create', () => {
		characteristic = new FlipPiCharacteristic({
			uuid: uuid
		}, new Authenticator(pin));
	});

	afterEach('Delete', () => {
		characteristic = null;
	});

	describe('Authenticator', () => {
		it('should be allowed', () => {
			expect(characteristic.authenticator.isAllowed(pin));
		});
	});

	describe('Write', () => {
		it('should write a Buffer', (done) => {
			characteristic.emit('writeRequest', null, 0, false, (status) => {
				expect(status).to.be.equal(Characteristic.RESULT_SUCCESS);
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
				expect(status).to.be.equal(Characteristic.RESULT_SUCCESS);
				expect(value.toString()).to.be.equal('Hello');
				done();
			});
		});
	});
});