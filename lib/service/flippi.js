/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleio = require('./bleio');
const uuids = require('../constant/uuids');
const Authenticator = require('../helper/authenticator');
const EngineController = require('./engine-controller');

const ENGINE_CHANNEL = 7;

/**
 * @class FlipPi
 * The FlipPi global controller.
 */
class FlipPi {
	/**
	 * Instantiate a FlipPi controller
	 * @constructor
	 * @param {string} pin
	 */
	constructor(pin) {
		/**
		 * A BLE IO manager
		 * @private
		 * @type {Bleio}
		 */
		this.bleio = new Bleio('FlipPi', new Authenticator(pin));

		/**
		 * An EngineController to control the motor
		 * @private
		 * @type {EngineController}
		 */
		this.engineController = new EngineController(ENGINE_CHANNEL);


		///////////////////////////////////////
		///////////////////////////////////////

		this.bleio.on('updateValue', this.onUpdateValue.bind(this));
	}

	/**
	 * Handle when the value is updated
	 * @param {string|number} value
	 * @param {string} uuid
	 * @private
	 */
	onUpdateValue(value, uuid) {
		switch (uuid) {
			case uuids.characteristics.speed:
				this.engineController.setValue(Number.parseFloat(value));
				break;
			default:
				break;
		}
	}
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = FlipPi;