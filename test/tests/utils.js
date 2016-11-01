/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Freezer = require('../../lib/helper/freezer');
const filename = '../../lib/configuration/configuration';
const env = Freezer.freeze(process.env);


/**
 *
 */
class Utils {
  /**
   * Remove the configuration from the package manager's cache
   */
  static clear() {
    Utils.deleteProperty(filename);
    Object.assign(process.env, env);
    Object.keys(process.env).forEach((key) => {
      if (typeof env[key] === 'undefined') {
        Reflect.deleteProperty(process.env, key);
      }
    });
  };

  /**
   *
   * @param {String} filename
   */
  static deleteProperty(filename) {
    Reflect.deleteProperty(require.cache, require.resolve(filename));
  }
}


module.exports = Utils;
