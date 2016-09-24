/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should, expect} = require('chai');
const sinon = require('sinon');
const uuids = require('../../../lib/constant/uuids');
const Flippi = require('../../../lib/service/flippi');
const ProxyBleio = require('../../mock/proxy/proxy-bleio');
const ProxyEngineController = require('../../mock/proxy/proxy-engine-controller');

describe('Flippi', () => {
	let flippi;

	beforeEach('Create', () => {
		flippi = new Flippi(new ProxyBleio(), new ProxyEngineController());
	});

	describe('Update', () => {
		it('should call onUpdateValue()', () => {
			const spy = sinon.spy(flippi, 'onUpdateValue');
			const uuid = '1234';
			const value = 0.5;

			flippi._bleio.emit('updateValue', value, uuid);

			expect(spy.withArgs(uuid, value).calledOnce);
			spy.restore();
		});

		it('should update the speed', () => {
			const uuid = uuids.characteristics.speed;
			const value = 0.5;
			const mock = sinon.mock(flippi._engine);
			const expectations = mock.expects('setValue')
				.once()
				.withArgs(value);

			return Promise.resolve(flippi._bleio.emit('updateValue', value, uuid))
				.then(() => expectations.verify())
				.then(() => mock.restore());
		});

		it('should do nothing. (Coverage)', (done) => {
			flippi._bleio.emit('updateValue', 'unknown', 0.5);
			done();
		});
	});

	describe('Stop', () => {
		it('should stop', () => {
			const mock = sinon.mock(flippi._bleio);
			const expectations = mock.expects('stop')
				.once();

			return Promise.resolve(flippi.stop())
				.then(() => expectations.verify())
				.then(() => mock.restore());
		});
	});
});