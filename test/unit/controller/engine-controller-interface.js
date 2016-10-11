/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const EngineController = require('../../../lib/controller/engine-controller-interface');

describe('EngineController', () => {
	const channel = 7;
	let controller;

	beforeEach('Create', () => {
		controller = new EngineController(channel);
	});

	describe('Update', () => {
		it('should throws an exception', () => {
			expect(() => controller.setValue(0)).to.throws(Error);
		});
	});

	describe('Stop', () => {
		it('should call set value', () => {
			const spy = sinon.spy(controller, 'setValue');

			expect(() => controller.stop()).to.throws(Error);
			expect(spy.withArgs(0).calledOnce);
			spy.restore();
		});
	});
});