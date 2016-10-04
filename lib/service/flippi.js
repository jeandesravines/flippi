/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const EventEmitter = require('events').EventEmitter;
const uuids = require('../constant/uuids');

/**
 * @class FlipPi
 * The FlipPi global controller.
 */
class FlipPi extends EventEmitter {
	/**
	 * Instantiate a FlipPi controller
	 * @constructor
	 * @param {EventEmitter} bleio
	 * @param {Object} engine
	 */
	constructor(bleio, engine) {
		super();

		/**
		 * A BLE IO manager
		 * @private
		 * @type {Bleio}
		 */
		this._bleio = bleio;

		/**
		 * An EngineController to control the motor
		 * @private
		 * @type {EngineController}
		 */
		this._engine = engine;


		///////////////////////////////////////
		///////////////////////////////////////

		this._bleio.on('updateValue', this.onUpdateValue.bind(this));
		this._engine.on('ready', this.onReady.bind(this));
	}

	/**
	 * Stop bluetooth communication and motor
	 */
	stop() {
		this._bleio.stop();
		this._engine.stop();
	}

	/**
	 * Handle when the value is updated
	 * @private
	 * @param {string|number} value
	 * @param {string} uuid
	 */
	onUpdateValue(value, uuid) {
		switch (uuid) {
			case uuids.characteristics.speed:
				this._engine.setValue(Number.parseFloat(value));
				break;
			default:
				break;
		}

		this.emit('updateValue', value, uuid);
	}

	/**
	 * Handle when the engine is ready
	 * @private
	 */
	onReady() {
		this.emit('ready');
	}
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = FlipPi;
