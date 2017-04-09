/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
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
   * @param {Array.<number>} channels
   */
  constructor(channels) {
    super();

    /**
     * Channels
     * @readonly
     * @type {Array.<number>}
     * @protected
     */
    this._channels = channels;

    /**
     *
     * @type {boolean}
     * @protected
     */
    this._ready = false;
  }

  /**
   * Close the process
   * @abstract
   */
  close() {
    throw new Error('Not set yet');
  }

  /**
   * Set the percent of max speed of the motor
   * @abstract
   */
  setValue() {
    throw new Error('Not set yet');
  }

  /**
   * Stop motors
   * @return {Promise.<Array>} A resolved Promise if the engine has been stopped
   */
  stop() {
    return this.setValue(0);
  }

  /**
   * Handle closure for each channels
   * @param {function(channel: number): Promise.<T>} closure
   * @return {Promise.<Array.<T>>} Resolved Promise if all closure returns a resolved Promise
   * @protected
   */
  _forEach(closure) {
    return Promise.all(this._channels.map((channel) => closure(channel) || Promise.resolve()));
  }

  /**
   * Handle when the board is ready
   * @protected
   */
  _onReady() {
    this._ready = true;
  }
}


module.exports = EngineControllerInterface;
