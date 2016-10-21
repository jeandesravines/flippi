/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const path = require('path');

describe('Debug', () => {
	describe('Module', () => {
		const modules = ['debug'];
		const environment = Object.assign({}, process.env);
		const dirname = path.join('..', '..', '..', '..', 'lib');
		const paths = {
			configuration: path.join(dirname, 'configuration', 'configuration'),
			debug: path.join(dirname, 'helper', 'debug')
		};

		function clear() {
			modules.forEach((module) => {
				delete require.cache[require.resolve(module)];
			});

			Object.keys(paths).forEach((key) => {
				delete require.cache[require.resolve(paths[key])];
			});
		}

		beforeEach('Delete require\' cache', () => {
			clear();
		});

		afterEach('Reset process.env', () => {
			clear();
			Object.assign(process.env, environment);
		});

		it('should call with "debug" mode', () => {
			process.env.DEBUG = '*';

			const debug = require(paths.debug);
			const configuration = require(paths.configuration);

			expect(configuration.debug).to.be.equal(true);
			expect(debug.enabled).to.be.equal(true);
		});
	});
});
