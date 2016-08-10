/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Gpio = require('@jdes/gpio');

/**
 * @class EngineController Representing the motor's controller
 */
class GpioEngineController {
	/**
	 * Instantiate an EngineController
	 * @constructor
	 * @param {number} channel
	 * @param {EventEmitter} [gpio]
	 */
	constructor(channel, gpio) {
		/**
		 * Channel index
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._channel = channel;

		/**
		 * The GPIO Adapter
		 * @private
		 * @type {Gpio}
		 */
		this._gpio = gpio || new Gpio();


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._gpio.open(channel, Gpio.direction.out);
	}

	/**
	 *
	 * @returns {Gpio}
	 */
	get gpio() {
		return this._gpio;
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float € [0,1]
	 * @return {Promise}
	 */
	setValue(value) {
		return this._gpio.setAnalogValue(this._channel, value || 0);
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = GpioEngineController;