/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const Authenticator = require('../lib/helper/authenticator');

describe('Authenticator', () => {
	it('should be allowed', () => {
		expect(new Authenticator('1234').isAllowed('1234')).to.be.equal(true);
	});

	it('should be unallowed', () => {
		expect(new Authenticator('1234').isAllowed('0000')).to.be.equal(false);
	});
});