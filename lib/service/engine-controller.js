/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');
const configuration = require('../configuration/configuration');

/**
 * @class EngineController Representing the motor's controller
 */
class EngineController {
	/**
	 * Instantiate an EngineController
	 * @constructor
	 * @param {number} channel
	 * @param {EventEmitter} [board]
	 */
	constructor(channel, board) {
		/**
		 * Channel index
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._channel = channel;

		/**
		 * The Board
		 * @private
		 * @type {Board}
		 */
		this._gpio = board || new Board({
				debug: configuration.environment === 'debug',
				repl: false,
			});


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._gpio.on('ready', this.onReady.bind(this));
	}

	/**
	 * Stop process
	 * @returns {Promise}
	 */
	stop() {
		return this.setValue(0);
	}

	/**
	 * Execute when the board is ready
	 * @private
	 */
	onReady() {
		this._gpio.pinMode(this._channel, Pin.PWM);
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float [0,1]
	 * @return {Promise} an empty resolved Promise
	 */
	setValue(value) {
		const speed = Math.floor(value * 255) || 0;

		return new Promise((resolve) => {
			this._gpio.analogWrite(this._channel, speed);
			resolve();
		});
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;