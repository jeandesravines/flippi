/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const Freezer = require('../../../../lib/helper/freezer');

describe('Freeze', () => {
  describe('deeply freeze', () => {
    const object = {
      foo: 'bar',
      baz: {
        foo: 'bar',
      },
    };

    it('should deeply freeze an object', () => {
      const frozen = Freezer.freeze(object);

      expect(frozen).to.be.deep.equal({
        foo: 'bar',
        baz: {
          foo: 'bar',
        },
      });

      expect(Object.isFrozen(frozen)).to.be.equal(true);
      expect(Object.isFrozen(frozen.foo)).to.be.equal(true);
    });
  });
});
