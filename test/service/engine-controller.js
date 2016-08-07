/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const EngineController = require('../../lib/service/engine-controller');

class ProxyEngineController extends EngineController {
	constructor(channel) {
		super(channel);

		this._motor = {
			speed: 0,
			start: (value) => this._motor.speed = value,
			stop: () => this._motor.speed = 0
		}
	}
}

describe('EngineController', () => {
	let controller;

	beforeEach('Create', () => {
		controller = new ProxyEngineController(7);
	});

	describe('Update', () => {
		it('should set the motor\'s speed', () => {
			controller.value = 0.5;
			expect(controller.motor.speed).to.be.equal(parseInt(255 * 0.5, 10));
		});

		it('should stop the motor', () => {
			controller.value = 0;
			expect(controller.motor.speed).to.be.equal(0);
		});

		it('should stop the motor with NaN value', () => {
			controller.value = NaN;
			expect(controller.motor.speed).to.be.equal(0);
		});
	});
});