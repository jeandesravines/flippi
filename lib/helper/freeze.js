/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Copy and deeply freeze an object
 * @param {Object} object the object to copy and freeze
 * @return {Object} the frozen object
 */
const freeze = (object) => {
  if (typeof object !== 'object' || Object.isFrozen(object)) {
    return object;
  }

  const frozen = {};

  Object.keys(object).forEach((key) => {
    frozen[key] = freeze(object[key]);
  });

  return Object.freeze(frozen);
};


module.exports = freeze;
