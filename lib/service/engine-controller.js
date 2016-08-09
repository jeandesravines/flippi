/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Motor, Pin} = require('johnny-five');

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
		this._board = new Board({
			debug: process.env.NODE_ENV !== 'production',
			repl: false,
		});


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._board.on('ready', () => {
			this._board.pinMode(channel, Pin.PWM);
		});
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float [0,1]
	 * @return {Promise}
	 */
	setValue(value) {
		const speed = Number.parseInt(value * 255, 10) || 0;

		return this._board.analogWrite(this._channel, speed) || Promise.resolve();
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;