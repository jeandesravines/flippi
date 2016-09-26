/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');
const environments = require('../../../lib/constant/environments');

describe('Debug', () => {
	describe('Debug', () => {
		const configurationFilename = '../../../lib/configuration/configuration';
		const debugFilename = '../../../lib/helper/debug';
		const environment = Object.assign({}, process.env);

		function clear() {
			delete require.cache[require.resolve(configurationFilename)];
			delete require.cache[require.resolve(debugFilename)];
		}

		beforeEach('Delete require\' cache', () => {
			clear();
		});

		afterEach('Reset process.env', () => {
			clear();
			Object.assign(process.env, environment);
		});

		it('should call with "debug" mode', () => {
			process.env.NODE_ENV = environments.debug;

			const debug = require(debugFilename);
			const configuration = require(configurationFilename);

			expect(configuration.debug).to.be.equal(true);
			expect(debug.enabled).to.be.equal(true);
		});
	});
});
