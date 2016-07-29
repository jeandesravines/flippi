/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, afterEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const FlipPiSpeedCharacteristic = require('../../lib/helper/flippi-characteristic');
const Authenticator = require('../../lib/helper/authenticator');
const FlipPiService = require('../../lib/helper/flippi-service');
const uuids = require('../../lib/constant/uuids');

const pin = '1234';
let service;

describe('FlipPiService', () => {
	beforeEach('Create', () => {
		service = new FlipPiService(uuids, new Authenticator(pin));
	});

	afterEach('Delete', () => {
		service = null;
	});

	describe('Update', () => {
		it('should emit an event on "updateValue', (done) => {
			const characteristic = service.characteristics.find((characteristic) => {
				return characteristic instanceof FlipPiSpeedCharacteristic;
			});

			service.on('updateValue', (value, source) => {
				expect(value).to.be.equal('0.75');
				expect(source).to.be.equal(characteristic);
				done();
			});

			characteristic.setValue(0.75);
		});
	})
});