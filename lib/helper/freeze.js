/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Deeply freeze an object
 * @param {Object} object the object to freeze
 * @return {Object} the frozen object
 */
const freeze = (object) => {
  if (typeof object !== 'object' || Object.isFrozen(object)) {
    return object;
  }

  Object.keys(object).forEach((key) => {
    freeze(object[key]);
  });

  return Object.freeze(object);
};


module.exports = freeze;
