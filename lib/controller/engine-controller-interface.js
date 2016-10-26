/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');

/**
 * Interface represententing an engine controller
 * @abstract
 * @extends EventEmitter
 */
class EngineControllerInterface extends EventEmitter {
  /**
   * @constructor
   * @abstract
   * @protected
   * @param {Number} channel
   */
  constructor(channel) {
    super();

    /**
     * Channel index
     * @readonly
     * @type {number}
     */
    this._channel = channel;
  }

  /**
   * Stop process
   * @abstract
   */
  stop() {
    throw new Error('Not set yet');
  }

  /**
   * Set the percent of max speed of the motor
   * @abstract
   */
  setValue() {
    throw new Error('Not set yet');
  }
}


module.exports = EngineControllerInterface;
