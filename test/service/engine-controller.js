/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should} = require('chai');
const sinon = require('sinon');
const EngineController = require('../../lib/service/engine-controller');

describe('EngineController', () => {
	const channel = 7;
	let controller;

	beforeEach('Create', () => {
		controller = new EngineController(channel);
	});

	describe('Update', () => {
		const values = [
			{in: 0.5, out: 127},
			{in: 0, out: 0},
			{in: NaN, out: 0}];

		values.forEach((args) => {
			it(`should set the value to ${args.in}`, () => {
				const mock = sinon.mock(controller._board)
					.expects('analogWrite')
					.once()
					.withExactArgs(channel, args.out)
					.returns(Promise.resolve());

				return controller.setValue(args.in)
					.then(() => mock.verify());
			});
		});
	});

	describe('Update', () => {
		it('should returns a resolved Promise', () => {
			const mock = sinon.mock(controller._board)
				.expects('analogWrite')
				.once()
				.withExactArgs(channel, 0);

			return controller.setValue(0)
				.then(() => mock.verify());
		});
	});
});