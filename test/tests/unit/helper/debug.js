/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const path = require('path');

describe.only('Debug', () => {
  const dirname = path.join('..', '..', '..', '..', 'lib');
  const filename = path.join(dirname, 'helper', 'debug');
  let debug;

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
