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
	 */
	constructor(channel) {
		/**
		 * The GPIO Adapter
		 * @private
		 * @type {Gpio}
		 */
		this.gpio = new Gpio();

		/**
		 * Frequency in Hz
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this.frequency = 100;

		/**
		 * Channel index
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._channel = channel;

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this.gpio.open(channel, Gpio.direction.out)
			.catch((error) => {
				throw error;
			});
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number|string} value
	 * @return {Promise}
	 */
	setValue(value) {
		const speed = Number.parseFloat(value) || 0;

		return this.gpio.setAnalogValue(this._channel, speed, this.frequency);
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;