/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const Authenticator = require('../../../../lib/helper/authenticator');
const Service = require('../../../../lib/bluetooth/service');
const uuids = require('../../../../lib/constant/uuids');

describe('Service', () => {
	describe('Update', () => {
		const service = new Service(uuids, new Authenticator('1234'));

		service.characteristics.forEach((characteristic) => {
			it('should emit an event on "updateValue', (done) => {
				service.once('updateValue', (value, source) => {
					expect(value).to.be.a('string');
					expect(source).to.be.equal(characteristic);
					done();
				});

				characteristic.setValue('Hello');
			});
		});
	});
});
