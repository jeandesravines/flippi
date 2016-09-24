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
			process.env.CHANNEL_MOTOR_1 = 'TEST_CHANNEL_MOTOR_1';
			process.env.DEVICE = 'FIVE';
			process.env.NAME = 'Hello';
			process.env.PIN = 'TEST_PIN';

			expect(require(filename)).to.be.deep.equal({
                channels: {
                    motor1: process.env.CHANNEL_MOTOR_1
                },
				device: process.env.DEVICE,
				name: process.env.NAME,
				pin: process.env.PIN
			});
		});
	});
});