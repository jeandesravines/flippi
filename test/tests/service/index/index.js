/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const exec = require('child_process').exec;

describe('index.js', () => {
	it('exec "npm start"', (done) => {
		const child = exec('npm start');

		child.on('exit', (code) => {
			expect(code).to.be.equal(null);
			done();
		});

		child.kill();
	});
});
