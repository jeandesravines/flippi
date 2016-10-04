/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');
const configuration = require('../configuration/configuration');
const EngineControllerInterface = require('./engine-controller-interface');

/**
 * @class EngineController Representing the motor's controller
 */
class EngineController extends EngineControllerInterface {
	/**
	 * Instantiate an EngineController
	 * @constructor
	 * @param {number} channel
	 * @param {EventEmitter} [board]
	 */
	constructor(channel, board) {
		super(channel);

		/**
		 * The Board
		 * @private
		 * @type {Board}
		 */
		this._gpio = board || new Board({
				debug: configuration.debug,
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
		this.emit('ready');
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float [0,1]
	 * @return {Promise} an empty resolved Promise
	 */
	setValue(value) {
		const speed = Math.floor(value * 255) || 0;

		return Promise.resolve(this._gpio.analogWrite(this._channel, speed));
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;