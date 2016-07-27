'use strict';

/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

const Bleio = require('./Bleio');
const uuids = require('./uuids');
const EngineController = require('./EngineController');

/**
 * @class FlipPi
 * The FlipPi global controller.
 */
class FlipPi {
	/**
	 * Instantiate a FlipPi controller
	 */
	constructor() {
		/**
		 * A BLE IO manager
		 * @private
		 * @type {Bleio}
		 */
		this.bleio = new Bleio('FlipPi');

		/**
		 * An EngineController to control the motor
		 * @private
		 * @type {EngineController}
		 */
		this.engineController = new EngineController();


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