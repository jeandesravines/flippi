/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Freezer = require('../../lib/helper/freezer');

const environment = Freezer.freeze(process.env);
const modules = [
  require.resolve('../../lib/configuration/configuration'),
];

/**
 * @class Utils
 */
class Utils {
  /**
   * Remove the registred modules from the package
   * manager's cache
   */
  static clear() {
    Object.assign(process.env, environment);
    Object.keys(process.env).forEach((key) => {
      if (typeof environment[key] === 'undefined') {
        Reflect.deleteProperty(process.env, key);
      }
    });

    modules.forEach((key) => {
      Reflect.deleteProperty(require.cache, key);
    });
  }

  /**
   * Register modules
   * @param {Array.<string>} elements the modules to register
   */
  static register(elements) {
    elements.forEach((filename) => {
      const resolved = require.resolve(filename);
      const index = modules.indexOf(resolved);

      if (index < 0) {
        modules.push(resolved);
      }
    });
  }

  /**
   * Unregister modules
   * @param {Array.<string>} elements the modules to unregister
   */
  static unregister(elements) {
    elements.forEach((filename) => {
      const resolved = require.resolve(filename);
      const index = modules.indexOf(resolved);

      if (index >= 0) {
        modules.splice(index, 1);
      }
    });
  }
}


module.exports = Utils;
