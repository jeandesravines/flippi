/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Freezer = require('../../../lib/helper/freezer');

const keys = Object.keys(require.cache);
const environment = Freezer.freeze(process.env);

/**
 * Class used to clean require.cache
 * @class Cleaner
 */
class Cleaner {
  /**
   * Clean require.cache
   * @param {string} file the current test file
   */
  static clean(file) {
    const modules = require.cache[require.resolve(file)]
      .children.map((module) => {
        return module.id;
      });
    const currentKeys = keys.concat(modules).concat([file]);

    Object.assign(process.env, environment);
    Object.keys(process.env).forEach((key) => {
      if (typeof environment[key] === 'undefined') {
        Reflect.deleteProperty(process.env, key);
      }
    });

    Object.keys(require.cache).forEach((key) => {
      if (currentKeys.includes(key) === false) {
        Cleaner.detach([key].concat(modules));
      }
    });
  }

  /**
   * Delete module on the top of the stack
   * @param {Array.<string>} stack modules to delete
   * @private
   */
  static detach(stack) {
    const name = stack[0];
    const module = require.cache[name];

    if (module === undefined) {
      return;
    }

    if (stack.slice(1).includes(module.parent.id)) {
      return;
    }

    module.children.forEach((child) => {
      if (stack.includes(child.id) === false) {
        Cleaner.detach([child.id].concat(stack));
      }
    });

    Reflect.deleteProperty(require.cache, name);
  }
}


module.exports = Cleaner;
