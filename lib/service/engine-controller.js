/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');

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
				debug: process.env.NODE_ENV !== 'production',
				repl: false,
			});


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._gpio.on('ready', this.onReady.bind(this));
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

		return this._gpio.analogWrite(this._channel, speed) || Promise.resolve();
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;