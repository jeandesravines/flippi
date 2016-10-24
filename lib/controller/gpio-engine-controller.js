/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Gpio = require('@jdes/gpio');
const EngineControllerInterface = require('./engine-controller-interface');

/**
 * @class FiveEngineController Representing the motor's controller
 * @extends EngineControllerInterface
 */
class GpioEngineController extends EngineControllerInterface {
	/**
	 * Instantiate an EngineController
	 * @constructor
	 * @param {number} channel
	 * @param {EventEmitter} [gpio]
	 */
	constructor(channel, gpio) {
		super(channel);

		/**
		 * The GPIO Adapter
		 * @private
		 * @readonly
		 * @type {Gpio}
		 */
		this._gpio = gpio || new Gpio();


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this._gpio.on('ready', this._onReady.bind(this));
	}

	/**
	 * Open the channel
	 * @private
	 */
	_onReady() {
		return this._gpio.open(this._channel, Gpio.direction.out)
			.then(() => this.emit('ready'))
			.catch(() => undefined);
	}

	/**
	 * Stop process
	 * @override
	 * @returns {Promise}
	 */
	stop() {
		return this.setValue(0)
			.then(() => this._gpio.close(this._channel));
	}

	/**
	 * Set the percent of max speed of the motor
	 * @override
	 * @param {number} value float € [0,1]
	 * @return {Promise}
	 */
	setValue(value) {
		return this._gpio.setAnalogValue(this._channel, value || 0);
	}
}

module.exports = GpioEngineController;