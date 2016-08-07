/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Motor} = require('johnny-five');

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
		 * The Board
		 * @private
		 * @type {Board}
		 */
		this._board = new Board({
			debug: true,
			repl: false
		});

		/**
		 * The motor
		 * @private
		 * @type {Motor}
		 */
		this._motor = null;


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._board.on('ready', () => {
			this._motor = new Motor(channel);
		});
	}

	/**
	 * Get the motor
	 * @return {Motor}
	 */
	get motor() {
		return this._motor;
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value
	 */
	set value(value) {
		const speed = parseInt(value * 255, 10) || 0;

		if (speed === 0) {
			this._motor.stop();
		} else {
			this._motor.start(speed);
		}
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;