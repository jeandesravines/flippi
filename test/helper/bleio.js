/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const Bleio = require('../../lib/helper/bleio');
const Authenticator = require('../../lib/helper/authenticator');

describe('Bleio', () => {
	let bleio;

	beforeEach('Create', () => {
		bleio = new Bleio('Test', new Authenticator('1234'));
	});

	describe('Update', () => {
		const local = new Bleio('Test', new Authenticator('1234'));

		local.service.characteristics.forEach((characteristic) => {
			it(`should subscribe to "updateValue" event on the ${characteristic.constructor.name}`, (done) => {
				local.once('updateValue', (value, uuids) => {
					expect(value).to.be.a('string');
					expect(uuids).to.be.equal(characteristic.uuid);
					done();
				});

				characteristic.setValue('Hello');
			});
		});
	});
});
