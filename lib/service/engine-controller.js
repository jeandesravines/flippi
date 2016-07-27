/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const AnalogGpio = require('@jdes/gpio');

/**
 * @class EngineController Representing the motor's controller
 */
class EngineController {
	/**
	 * Instantiate an EngineController
	 */
	constructor() {
		/**
		 * The GPIO Adapter
		 * @private
		 * @type {AnalogGpio}
		 */
		this.io = new AnalogGpio();

		/**
		 * Frequency in Hz
		 * @private
		 * @type {number}
		 */
		this.frequency = 100;

		/**
		 * The channels
		 * @private
		 * @type {Map.<string, Object>}
		 */
		this.channels = new Map({
			output: {
				index: 7,
				direction: AnalogGpio.direction.out
			}
		});

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		for (let channel of this.channels) {
			this.io.open(channel.index, channel.direction)
				.catch(console.error);
		}
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value
	 * @return {Promise}
	 */
	setValue(value) {
		const float = Number.parseFloat(value) || 0;
		const index = this.channels.output.index;
		const frequency = this.frequency;

		return this.io.setAnalogValue(index, float, frequency);
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;