/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const catcher = require('../../../lib/module/catcher');

describe('Catcher', () => {
	describe('Success', () => {
		it('should return a correct value', () => {
			expect(catcher(() => 'Hello')).to.be.equal('Hello');
		});

		it('should return undefined', () => {
			expect(catcher(() => {
				throw new Error();
			})).to.be.equal(undefined);
		});
	});
});
