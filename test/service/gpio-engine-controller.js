/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const GpioEngineController = require('../../lib/service/gpio-engine-controller');

describe('GpioEngineController', () => {
	let controller;

	beforeEach('Create', () => {
		controller = new GpioEngineController(7);
	});

	describe('Update', () => {
		it('should set the value to 0.5', () => {
			controller.setValue(0.5);
			expect(controller._speed).to.be.equal(0.5);
		});

		it('should set value to 0', () => {
			controller.setValue(0);
			expect(controller._speed).to.be.equal(0);
		});

		it('should set value to 0 with NaN', () => {
			controller.setValue(NaN);
			expect(controller._speed).to.be.equal(0);
		});
	});
});