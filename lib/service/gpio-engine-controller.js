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
	 * @param {number} [frequency] in Hz
	 */
	constructor(channel, frequency = 100) {
		/**
		 * Channel index
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._channel = channel;
		
		/**
		 * Last speed set
		 * @private
		 * @type {number}
		 */
		this._speed = 0;
		
		/**
		 * The GPIO Adapter
		 * @private
		 * @type {Gpio}
		 */
		this._board = new Gpio();

		/**
		 * Frequency in Hz
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._frequency = frequency;

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._board.open(channel, Gpio.direction.out)
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
		this._speed = Number.parseFloat(value) || 0;

		return this._board.setAnalogValue(this._channel, this._speed, this._frequency);
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = GpioEngineController;