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
		 * Last speed set
		 * @private
		 * @readonly
		 * @type {number}
		 */
		this._speed = 0;
		
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
	 * @param {number} value
	 * @return {Promise}
	 */
	setValue(value) {
		this._speed = parseInt(value * 255, 10) || 0;
		this._board.analogWrite(this._channel, this._speed);

		return Promise.resolve();
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;