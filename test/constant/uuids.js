/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const uuids = require('../../lib/constant/uuids');

describe('uuids', () => {
  describe('Content', () => {
    it('should contains 2 values', () => {
      expect(Object.keys(uuids)).length(2);
    });

    it('should contains 2 valid uuids', () => {
      Object.keys(uuids).forEach((key) => {
        expect(uuids[key]).to.be.a('string');
        expect(uuids[key].length).to.be.within(4, 35);
      });
    });
  });
});
