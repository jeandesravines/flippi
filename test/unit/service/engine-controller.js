/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {should, expect} = require('chai');
const sinon = require('sinon');
const promisify = require('@jdes/promisify');
const catcher = require('@jdes/catcher');
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
				const spy = sinon.spy(controller._gpio, 'analogWrite');

				return controller.setValue(args.in)
					.then(() => expect(spy.withArgs(channel, args.out).calledOnce))
					.then(() => spy.restore());
			});
		});
	});

	describe('Events', () => {
		it('should init the pin', () => {
			const board = new ProxyBoard();
			const spy = sinon.spy(board, 'pinMode');

			return Promise.resolve(new EngineController(channel, board))
				.then(() => board.emit('ready'))
				.then(() => expect(spy.withArgs(channel, Pin.PWM).calledOnce))
				.then(() => spy.restore());
		});
	});

	describe('Stop', () => {
		it('should be stopped', () => {
			const board = new ProxyBoard();
			const spy = sinon.spy(board, 'analogWrite');
			const controller = new EngineController(channel, board);

			return controller.stop()
				.then(() => expect(spy.withArgs(channel, 0).calledOnce))
				.then(() => spy.restore());
		});
	});

	describe('Coverage', () => {
		it('should eventually create a instance', () => {
			catcher(() => new EngineController(channel));
		});
	});
});