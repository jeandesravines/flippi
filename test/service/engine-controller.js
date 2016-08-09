/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const EngineController = require('../../lib/service/engine-controller');

describe('EngineController', () => {
	let controller;

	beforeEach('Create', () => {
		controller = new EngineController(7);
	});

	describe.skip('Update', () => {
		it('should set the value to 0.5', () => {
			controller.setValue(0.5);
			expect(controller._speed).to.be.equal(parseInt(255 * 0.5, 10));
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