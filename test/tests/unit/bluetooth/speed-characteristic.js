/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, afterEach, describe, it} = require('mocha');
const {expect} = require('chai');
const Authenticator = require('../../../../lib/helper/authenticator');
const SpeedCharacteristic = require('../../../../lib/bluetooth/speed-characteristic');
const uuids = require('../../../../lib/constant/uuids');

describe('SpeedCharacteristic', () => {
	const pin = '1234';
	let characteristic;

	beforeEach('Create', () => {
		characteristic = new SpeedCharacteristic(uuids.characteristics.speed, new Authenticator(pin));
	});

	afterEach('Delete', () => {
		characteristic = null;
	});

	describe('Init', () => {
		it('should set the value to 0', (done) => {
			characteristic.emit('readRequest', 0, (status, value) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_SUCCESS);
				expect(value.toString()).to.be.equal('0');
				done();
			});
		});
	});

	describe('Update', () => {
		it('should set a value and be notified', (done) => {
			characteristic.on('updateValue', (value) => {
				expect(Number.parseFloat(value)).to.be.equal(0.75);
				done();
			});

			characteristic.setValue(0.75);
		});
	});

	describe('Read', () => {
		it('should be notified on readRequest after write', (done) => {
			characteristic.setValue(0.75);
			characteristic.emit('readRequest', 0, (status, value) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_SUCCESS);
				expect(value.toString()).to.be.equal('0.75');
				done();
			});
		});
	});

	describe('Write', () => {
		it('should be rejected because of wrong credentials', (done) => {
			characteristic.emit('writeRequest', null, 0, true, (status) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_UNLIKELY_ERROR);
				done();
			});
		});

		it('should be rejected because of delay', (done) => {
			const data = JSON.stringify({pin: pin, value: 0.75});
			const buffer = Buffer.from(data);

			characteristic.emit('writeRequest', buffer, 0, true, (status) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_SUCCESS);

				characteristic.emit('writeRequest', buffer, 0, true, (status) => {
					expect(status).to.be.equal(SpeedCharacteristic.RESULT_UNLIKELY_ERROR);
					done();
				});
			});
		});

		it('should be rejected because of wrong value', (done) => {
			characteristic.emit('writeRequest', Buffer.from('null'), 0, true, (status) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_UNLIKELY_ERROR);
				done();
			});
		});

		it('should writes a value and wait until it reset', (done) => {
			const data = JSON.stringify({pin: pin, value: 0.75});

			characteristic.emit('writeRequest', Buffer.from(data), 0, true, (status) => {
				expect(status).to.be.equal(SpeedCharacteristic.RESULT_SUCCESS);

				setTimeout(() => {
					expect(characteristic.value.toString()).to.be.equal('0');
					done();
				}, 1000)
			});
		});
	});
});