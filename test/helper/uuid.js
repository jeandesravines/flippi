/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const UUID = require('../../lib/helper/uuid');

describe('UUID', () => {
  describe('Conversion', () => {
    it('should throws an error', () => {
      expect(() => new UUID('Hello')).to.throw(TypeError);
    });

    it('should be converted', () => {
      expect(new UUID('637A9500-3D5A-11E6-AC61-9E71128CAE77').value)
        .to.be.equal('637a95003d5a11e6ac619e71128cae77');
    });
  });
});
