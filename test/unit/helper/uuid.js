/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const UUID = require('../../../lib/helper/uuid');

describe('UUID', () => {
	describe('Conversion', () => {
		it('should be converted', () => {
			expect(new UUID('637a9500-3d5a-11e6-ac61-9e71128cae77').value)
				.to.be.equal('637a95003d5a11e6ac619e71128cae77');
		});
	});
});
