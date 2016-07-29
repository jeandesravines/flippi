/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Gpio = require('@jdes/gpio');

/**
 * @class EngineController Representing the motor's controller
 */
class EngineController {
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
		 * @type {number}
		 */
		this.frequency = 100;

		/**
		 * The channels
		 * @private
		 * @type {Object.<string, Object>}
		 */
		this.channels = {
			output: {
				index: channel,
				direction: Gpio.direction.out
			}
		};

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		for (let i in this.channels) {
			this.gpio.open(this.channels[i].index, this.channels[i].direction)
				.catch((error) => {
					throw error;
				});
		}
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value
	 * @return {Promise}
	 */
	setValue(value) {
		const float = Number.parseFloat(String(value)) || 0;
		const index = this.channels.output.index;

		return this.gpio.setAnalogValue(index, float, this.frequency);
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;