/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const uuids = require('../constant/uuids');
const debug = require('../helper/debug');

/**
 * @class FlipPi
 * The FlipPi global controller.
 */
class FlipPi {
	/**
	 * Instantiate a FlipPi controller
	 * @constructor
	 * @param {EventEmitter} bleio
	 * @param {Object} engine
	 */
	constructor(bleio, engine) {
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
	}

	/**
	 *
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

		debug('updateValue', {value, uuid});
	}
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = FlipPi;