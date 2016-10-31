/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const freeze = require('../../../../lib/helper/freeze');

describe('Freeze', () => {
  describe('deeply freeze', () => {
    const object = {
      a: 'a',
      b: {
        c: 'c',
      },
    };

    it('should deeply freeze an object', () => {
      const frozen = freeze(object);

      expect(Object.isFrozen(frozen)).to.be.equal(true);
      expect(Object.isFrozen(frozen.b)).to.be.equal(true);
    });
  });
});
