/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const sinon = require('sinon');
const ProxyBleno = require('../../mock/proxy/proxy-bleno');
const Bleio = require('../../../lib/service/bleio');
const Authenticator = require('../../../lib/helper/authenticator');
const uuids = require('../../../lib/constant/uuids');

describe('Bleio', () => {
	let bleio;

	beforeEach('Create', () => {
		bleio = new Bleio('Test', new Authenticator('1234'), new ProxyBleno());
	});

	describe('Events', () => {
		it('should handle advertisingStart event', () => {
			const mock = sinon.mock(bleio._manager)
				.expects('setServices')
				.once()
				.withArgs([bleio._service]);

			bleio._manager.emit('advertisingStart');
			mock.verify();
		});

		it('should handle advertisingStart event with sucess', () => {
			bleio._manager.emit('advertisingStart');
		});

		it('should handle stateChange event with poweredOn', () => {
			const mock = sinon.mock(bleio._manager)
				.expects('startAdvertising')
				.once()
				.withExactArgs(bleio.title, [uuids.services.default]);

			bleio._manager.emit('stateChange', 'poweredOn');
			mock.verify();
		});

		it('should handle stateChange event with poweredOff', () => {
			const mock = sinon.mock(bleio._manager)
				.expects('stopAdvertising')
				.once();

			bleio._manager.emit('stateChange', 'poweredOff');
			mock.verify();
		});
	});

	describe('Update', () => {
		const bleio = new Bleio('Test', new Authenticator('1234'), new ProxyBleno());

		bleio._service.characteristics.forEach((characteristic) => {
			it(`should subscribe to "updateValue" event on the ${characteristic.constructor.name}`, (done) => {
				bleio.once('updateValue', (value, uuids) => {
					expect(value).to.be.a('string');
					expect(uuids).to.be.equal(characteristic.uuid);
					done();
				});

				characteristic.setValue('Hello');
			});
		});
	});
});
