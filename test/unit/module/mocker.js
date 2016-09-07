/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const {EventEmitter} = require('events');
const Mocker = require('../../../lib/module/mocker');

describe('Mocker', () => {
	describe('Create', () => {
		it('should be a child of EventEmitter', () => {
			const Mock = Mocker.create(EventEmitter, {});

			expect(new Mock()).to.be.instanceOf(EventEmitter);
		});

		it('should be an overriden child of EventEmitter', () => {
			const mocked = new (Mocker.create(EventEmitter, {
				sayHello: () => 'Hello'
			}))();

			expect(mocked).to.be.instanceOf(EventEmitter);
			expect(mocked.sayHello()).to.be.equal('Hello');
		});
	});
});
