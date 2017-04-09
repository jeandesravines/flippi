/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Gpio = require('@jdes/gpio');
const EngineControllerInterface = require('./engine-controller-interface');

/**
 * Representing the motor's controller using Raspberry Gpio
 * @class GpioEngineController
 * @extends EngineControllerInterface
 */
class GpioEngineController extends EngineControllerInterface {
  /**
   * Instantiate an GpioEngineController
   * @constructor
   * @override
   * @param {Array.<number>} channels The motors' channels
   * @param {EventEmitter} [gpio] The GPIO manager
   */
  constructor(channels, gpio) {
    super(channels);

    /**
     * The GPIO Adapter
     * @private
     * @readonly
     * @type {Gpio}
     */
    this._gpio = gpio || new Gpio();

    /* ****************************************** */

    this._gpio.on('ready', this._onReady.bind(this));
  }

  /**
   * Open the defined channels
   * @private
   */
  _onReady() {
    super._onReady();

    this._forEach((channel) => this._gpio.open(channel, Gpio.direction.out))
      .then(() => this.emit('ready'))
      .catch(() => undefined);
  }

  /**
   * Close the process
   * @return {Promise.<Array>} A resolved Promise if the process has been closed
   */
  close() {
    return this._forEach((channel) => this._gpio.close(channel));
  }

  /**
   * Set the percent of max speed of the motors
   * @override
   * @param {number} value A float € [0,1]
   * @return {Promise.<Array>} A resolved Promise
   */
  setValue(value) {
    return this._forEach((channel) => this._gpio.setAnalogValue(channel, value || 0));
  }
}


module.exports = GpioEngineController;
