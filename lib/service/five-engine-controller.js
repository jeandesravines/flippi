/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');
const configuration = require('../configuration/configuration');
const EngineControllerInterface = require('./engine-controller-interface');

/**
 * @class FiveEngineController Representing the motor's controller
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
		this._board = board || new Board({
				debug: configuration.debug,
				repl: false,
			});


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._board.on('ready', this._onReady.bind(this));
	}

	/**
	 * Execute when the board is ready
	 * @private
	 */
	_onReady() {
		this._board.pinMode(this._channel, Pin.PWM);
		this.emit('ready');
	}

	/**
	 * Stop process
	 * @override
	 * @returns {Promise}
	 */
	stop() {
		return this.setValue(0);
	}

	/**
	 * Set the percent of max speed of the motor
	 * @override
	 * @param {number} value float [0,1]
	 * @return {Promise} an empty resolved Promise
	 */
	setValue(value) {
		const speed = Math.floor(value * 255) || 0;

		return Promise.resolve(this._board.analogWrite(this._channel, speed));
	}
}

module.exports = EngineController;