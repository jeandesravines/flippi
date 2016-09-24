/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');

describe('Configuration', () => {
    const filename = '../../../lib/configuration/configuration';
    const configuration = require(filename);
	const environement = Object.assign({}, process.env);
    
	describe('content', () => {
        beforeEach('Delete require\' cache', () => {
            delete require.cache[require.resolve(filename)];
        });
		
		afterEach('Reset process.env', () => {
			Object.assign(process.env, environement);
            delete require.cache[require.resolve(filename)];
		});
        
		it('should be the default configuration', () => {
			expect(require(filename)).to.be.deep.equal(configuration);
		});
        
		it('should be customized', () => {
			process.env.FLIPPI_CHANNEL_MOTOR_1 = 'TEST_CHANNEL_MOTOR_1';
			process.env.FLIPPI_DEVICE = 'FIVE';
			process.env.FLIPPI_NAME = 'Hello';
			process.env.FLIPPI_PIN = 'TEST_PIN';
			process.env.NODE_ENV = 'production';

			expect(require(filename)).to.be.deep.equal({
                channels: {
                    motor1: process.env.FLIPPI_CHANNEL_MOTOR_1
                },
				device: process.env.FLIPPI_DEVICE,
				environment: process.env.NODE_ENV,
				name: process.env.FLIPPI_NAME,
				pin: process.env.FLIPPI_PIN
			});
		});
	});
});