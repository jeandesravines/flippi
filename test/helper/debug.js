/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {before, describe, it} = require('mocha');
const {expect} = require('chai');
const EnvCleaner = require('@jdes/env-cleaner');

describe('Debug', () => {
  const filename = '../../lib/helper/debug';
  let debug;

  before('Register module to clean', () => {
    EnvCleaner.register(require.resolve(filename));
  });

  /* ******************************** */

  describe('Module', () => {
    it('should enable debug for flippi namespace', () => {
      process.env.DEBUG = 'flippi';
      debug = require(filename);

      expect(debug.enabled).to.not.be.equal(undefined);
    });

    it('should enable debug for all namespaces', () => {
      process.env.DEBUG = '*';
      debug = require(filename);

      expect(debug.enabled).to.not.be.equal(undefined);
    });

    it('should disable debug for all namespaces', () => {
      process.env.DEBUG = '';
      debug = require(filename);

      expect(debug.enabled).to.be.equal(undefined);
    });
  });
});
