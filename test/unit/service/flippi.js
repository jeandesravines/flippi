/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should, expect} = require('chai');
const sinon = require('sinon');
const Catcher = require('@jdes/catcher');
const uuids = require('../../../lib/constant/uuids');
const Flippi = require('../../../lib/service/flippi');
const ProxyBleio = require('../../mock/proxy/proxy-bleio');

describe('Flippi', () => {
	let flippi;

	beforeEach('Create', () => {
		flippi = new Flippi(new ProxyBleio());
	});

	describe('Update', () => {
        it('should call onUpdateValue()', () => {
            const spy = sinon.spy(flippi, 'onUpdateValue');
            const uuid = '1234';
            const value = 0.5;

            flippi._bleio.emit('updateValue', uuid, value);
			
            expect(spy.withArgs(uuid, value).calledOnce);
            spy.restore();
        });
        
        it('should update the speed', (done) => {
            const uuid = uuids.characteristics.speed;
            const value = 0.5;
			const mock = sinon.mock(flippi._engine)
				.expects('setValue')
				.once()
				.withArgs([uuid, value]);

            flippi._bleio.emit('updateValue', uuid, value);
			mock.verify();
            mock.restore();
			done();
        });
        
        it('should do nothing. (Coverage)', (done) => {
            flippi._bleio.emit('updateValue', 'unknown', 0.5);
			done();
        });
	});

	describe('Stop', () => {
		it('should stop', (done) => {
			const mock = sinon.mock(flippi._bleio)
				.expects('stop')
				.once();

			flippi.stop();
			mock.verify();
            mock.restore();
			done();
		});
	});
});