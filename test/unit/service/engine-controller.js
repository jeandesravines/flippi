/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should} = require('chai');
const sinon = require('sinon');
const promisify = require('@jdes/promisify');
const {Pin} = require('johnny-five');
const ProxyBoard = require('../../mock/proxy/proxy-board');
const EngineController = require('../../../lib/service/engine-controller');

describe('EngineController', () => {
	const channel = 7;
	let controller;

	beforeEach('Create', () => {
		controller = new EngineController(channel, new ProxyBoard());
	});

	describe('Update', () => {
		const values = [
			{in: 0.5, out: 127},
			{in: 0, out: 0},
			{in: NaN, out: 0}];

		values.forEach((args) => {
			it(`should set the value to ${args.in}`, () => {
				const stub = sinon.mock(controller._gpio)
					.expects('analogWrite')
					.once()
					.withExactArgs(channel, args.out);

				return controller.setValue(args.in)
					.then(() => stub.verify());
			});
		});
	});

	describe('Events', () => {
		it('should init the pin', () => {
			const board = new ProxyBoard();
			const stub = sinon.mock(board)
				.expects('pinMode')
				.once()
				.withExactArgs(channel, Pin.PWM);

			return Promise.resolve(new EngineController(channel, board))
				.then(() => stub.verify());
		});
	});
});