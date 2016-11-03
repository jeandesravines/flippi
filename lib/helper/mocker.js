/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Class representing a class mocker
 * @class Mocker
 */
class Mocker {
  /**
   * @constructor
   * @private
   * @throws Error
   */
  constructor() {
    throw new Error();
  }

  /**
   * Create an object with prototype and properties
   * @param {Object} parent
   * @param {Object} properties
   * @static
   * @return {Object} a new object with the structure specified
   *     in properties
   */
  static create(parent, properties) {
    const keys = Object.keys(properties);
    const Mocked = function Mocked() {
    };

    Mocked.prototype = Object.create(parent.prototype, keys.reduce((result, key) => {
      return Object.assign(result, {
        [key]: {
          value: properties[key],
          writable: true,
        },
      });
    }, {}));

    return Mocked;
  }
}


module.exports = Mocker;
