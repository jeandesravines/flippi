/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Freezer = require('../../../lib/helper/freezer');

const defaultKeys = Object.keys(require.cache);
const defaultEnv = Freezer.freeze(process.env);
const registered = [];

/**
 * Class used to clean require.cache
 * @class Cleaner
 */
class Cleaner {
  /**
   * Clean require.cache
   * @static
   */
  static clean() {
    Object.assign(process.env, defaultEnv);
    Object.keys(process.env).forEach((key) => {
      if (typeof defaultEnv[key] === 'undefined') {
        Reflect.deleteProperty(process.env, key);
      }
    });

    registered.forEach((key) => {
      Cleaner.deleteProperty([key].concat(defaultKeys));
    });
  }

  /**
   * Delete module on the top of the stack
   * @param {Array.<string>} stack modules to delete
   * @private
   */
  static deleteProperty(stack) {
    const name = stack[0];
    const module = require.cache[name];

    if (module === undefined) {
      return;
    }

    module.children.forEach((child) => {
      if (stack.includes(child.id) === false) {
        Cleaner.deleteProperty([child.id].concat(stack));
      }
    });

    Reflect.deleteProperty(require.cache, name);
  }

  /**
   * Register modules
   * @param {Array.<string>} names the modules to register
   * @static
   */
  static register(names) {
    names.forEach((name) => {
      const resolved = require.resolve(name);

      if (registered.includes(resolved) === false) {
        registered.push(resolved);
      }
    });
  }
}


module.exports = Cleaner;
