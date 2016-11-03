/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

/* eslint-disable global-require */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const path = require('path');
const Utils = require('../../utils');

describe('Debug', () => {
  const dirname = path.join(__dirname, '..', '..', '..', '..', 'lib');
  const filename = path.join(dirname, 'helper', 'debug');
  const modules = [filename, 'debug'];
  let debug;

  before('Register', () => Utils.register(modules));
  after('Unregister', () => Utils.unregister(modules));

  /* ******************************** */

  describe('Module', () => {
    it('should enable debug for flippi namespace', () => {
      process.env.DEBUG = 'flippi';
      debug = require(filename);

      expect(debug.enabled).to.be.equal(true);
    });

    it('should enable debug for all namespaces', () => {
      process.env.DEBUG = '*';
      debug = require(filename);

      expect(debug.enabled).to.be.equal(true);
    });

    it('should disable debug for all namespaces', () => {
      process.env.DEBUG = '';
      debug = require(filename);

      expect(debug.enabled).to.be.equal(false);
    });
  });
});
