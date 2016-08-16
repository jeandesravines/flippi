/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should, expect} = require('chai');
const sinon = require('sinon');
const promisify = require('@jdes/promisify');
const catcher = require('@jdes/catcher');
const Gpio = require('@jdes/gpio');
const ProxyGpio = require('../../mock/proxy/proxy-gpio');
const GpioEngineController = require('../../../lib/service/gpio-engine-controller');

describe('GpioEngineController', () => {
	const channel = 7;
	let controller;

	beforeEach('Create', () => {
		controller = new GpioEngineController(channel, new ProxyGpio());
	});

	describe('Update', () => {
		const values = [
			{in: 0.5, out: 0.5},
			{in: 0, out: 0},
			{in: NaN, out: 0}];

		values.forEach((args) => {
			it(`should set the value to ${args.in}`, () => {
				const spy = sinon.spy(controller.gpio, 'setAnalogValue');

				return controller.setValue(args.in)
					.then(() => expect(spy.withArgs(channel, args.out).calledOnce))
					.then(() => spy.restore());
			});
		});
	});

	describe('Events', () => {
		it('should init the pin', () => {
			const gpio = new ProxyGpio();
			const spy = sinon.spy(gpio, 'open');

			return Promise.resolve(new GpioEngineController(channel, gpio))
				.then(() => expect(spy.withArgs(channel, Gpio.direction.out).calledOnce))
				.then(() => spy.restore());
		});

		it('should throw an error', () => {
			expect(() => new GpioEngineController(-1, new ProxyGpio())).to.throw(Error);
		});
	});

	describe('Coverage', () => {
		it('should eventually create a instance', () => {
			catcher(() => new GpioEngineController(channel));
		});
	});
});