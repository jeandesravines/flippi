/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should} = require('chai');
const sinon = require('sinon');
const GpioEngineController = require('../../lib/service/gpio-engine-controller');

describe('GpioEngineController', () => {
	const channel = 7;
	let controller;

	beforeEach('Create', () => {
		controller = new GpioEngineController(channel);
	});

	describe('Update', () => {
		const values = [
			{in: 0.5, out: 0.5},
			{in: 0, out: 0},
			{in: NaN, out: 0}];

		values.forEach((args) => {
			it(`should set the value to ${args.in}`, () => {
				const mock = sinon.mock(controller._board)
					.expects('setAnalogValue')
					.once()
					.withExactArgs(channel, args.out)
					.returns(Promise.resolve());

				return controller.setValue(args.in)
					.then(() => mock.verify());
			});
		});
	});
});