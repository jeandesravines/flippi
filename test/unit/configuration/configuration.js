/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect, should} = require('chai');

describe('Configuration', () => {
    const filename = '../../../lib/configuration/configuration';
    const configuration = require(filename);
    
	describe('content', () => {
        beforeEach('Delete require\' cache', () => {
            delete require.cache[require.resolve(filename)];
        });
        
		it('should be the default configuration', () => {
			expect(require(filename)).to.be.deep.equal(configuration);
		});
        
		it('should be customized', () => {
            process.env.PIN = 'TEST_PIN';
            process.env.CHANNEL_MOTOR_1 = 'TEST_CHANNEL_MOTOR_1';
            
			expect(require(filename)).to.be.deep.equal({
                pin: process.env.PIN,
                channels: {
                    motor1: process.env.CHANNEL_MOTOR_1
                }
            });
		});
	});
});