/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, afterEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const Authenticator = require('../../lib/helper/authenticator');
const FlipPiService = require('../../lib/helper/flippi-service');
const uuids = require('../../lib/constant/uuids');

describe('FlipPiService', () => {
	let service;

	beforeEach('Create', () => {
		service = new FlipPiService(uuids, new Authenticator('1234'));
	});

	afterEach('Delete', () => {
		service = null;
	});

	describe('Update', () => {
		const local = new FlipPiService(uuids, new Authenticator('1234'));

		local.characteristics.forEach((characteristic) => {
			it('should emit an event on "updateValue', (done) => {
				local.once('updateValue', (value, source) => {
					expect(value).to.be.a('string');
					expect(source).to.be.equal(characteristic);
					done();
				});

				characteristic.setValue('Hello');
			});
		});
	})
});