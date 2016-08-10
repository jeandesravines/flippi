/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const uuids = require('../../../lib/constant/uuids');

describe('uuids', () => {
	describe('Content', () => {
		it('should contains 2 characteristics', () => {
			expect(Object.keys(uuids.characteristics)).length(1);
		});

		it('should contains 1 service', () => {
			expect(Object.keys(uuids.services)).length(1);
		});
	});
});