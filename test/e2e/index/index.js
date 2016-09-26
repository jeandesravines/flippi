/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect, should} = require('chai');
const exec = require('child_process').exec;

describe.only('index.js', () => {
    it('exec "npm start"', (done) => {
        const child = exec('npm start', (error) => {
            if (error) {
               done(error);
            }
        });

        child.on('exit', (code) => {
            expect(code).to.be.equal(null);
            done();
        });

        child.kill('SIGKILL');
    });
});