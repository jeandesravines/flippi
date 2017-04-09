/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const uuids = require('../constant/uuids');

/**
 * The Flippi global controller
 * @class Flippi
 * @extends EventEmitter
 */
class FlipPi extends EventEmitter {
  /**
   * Instantiate a FlipPi controller
   * @constructor
   * @param {EventEmitter} manager
   * @param {EventEmitter} engineController
   */
  constructor(manager, engineController) {
    super();

    /**
     * A Bluetooth Low Energy I/O manager
     * @private
     * @type {Manager}
     */
    this._bleno = manager;

    /**
     * An EngineControllerInterface to control the motor
     * @private
     * @type {EngineControllerInterface}
     */
    this._engineController = engineController;

    /* ************************************** */

    this._bleno.on('updateValue', this.onUpdateValue.bind(this));
    this._engineController.on('ready', this.onReady.bind(this));
  }

  /**
   * @return {Manager} the bluetooth manager
   */
  get manager() {
    return this._bleno;
  }

  /**
   * @return {EngineControllerInterface} the engine controller
   */
  get engineController() {
    return this._engineController;
  }

  /**
   * Stop bluetooth communication and motor
   */
  stop() {
    this._bleno.stop();
    this._engineController.stop();
  }

  /**
   * Handle when the value is updated
   * @private
   * @param {string|number} value
   * @param {string} uuid
   */
  onUpdateValue(value, uuid) {
    switch (uuid) {
      case uuids.speed:
        this._engineController.setValue(Number.parseFloat(value));
        break;
      default:
        break;
    }

    this.emit('updateValue', value, uuid);
  }

  /**
   * Handle when the engine is ready
   * @private
   */
  onReady() {
    this.emit('ready');
  }
}


module.exports = FlipPi;
