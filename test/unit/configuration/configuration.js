/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const environments = require('../../../lib/constant/environments');
const devices = require('../../../lib/constant/devices');

describe('Configuration', () => {
	describe('content', () => {
		const configurationFilename = '../../../lib/configuration/configuration';
		const processEnvVariables = Object.assign({}, process.env);

		function clear() {
			delete require.cache[require.resolve(configurationFilename)];
		}
		
		function getConfiguration() {
			return require(configurationFilename);
		}

		beforeEach('Delete require\'s cache', () => {
			clear();
		});

		afterEach('Reset process.env', () => {
			clear();
			Object.assign(process.env, processEnvVariables);
		});

		it('should be the default configuration without NODE_ENV', () => {
			process.env.NODE_ENV = '';

			const content = getConfiguration();
			const environment = content.environment;
			const production = environments.production

			expect(environment).to.be.deep.equal(production);
		});

		it('should be customized', () => {
			process.env.FLIPPI_CHANNEL_MOTOR_1 = 'TEST_CHANNEL_MOTOR_1';
			process.env.FLIPPI_DEVICE = devices.five;
			process.env.FLIPPI_NAME = 'Hello';
			process.env.FLIPPI_PIN = 'TEST_PIN';
			process.env.NODE_ENV = environments.debug;

			expect(getConfiguration()).to.be.deep.equal({
				channels: {
					motor1: process.env.FLIPPI_CHANNEL_MOTOR_1
				},
				debug: true,
				device: process.env.FLIPPI_DEVICE,
				environment: process.env.NODE_ENV,
				name: process.env.FLIPPI_NAME,
				pin: process.env.FLIPPI_PIN
			});
		});
	});
});