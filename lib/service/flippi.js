/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const configuration = require('../configuration/configuration');
const Bleio = require('./bleio');
const uuids = require('../constant/uuids');
const Authenticator = require('../helper/authenticator');
const EngineController = require('./gpio-engine-controller');

const CHANNEL_MOTOR_1 = configuration.channels.motor1;
const PIN = configuration.pin;

/**
 * @class FlipPi
 * The FlipPi global controller.
 */
class FlipPi {
	/**
	 * Instantiate a FlipPi controller
	 * @constructor
	 * @param {EventEmitter} [bleio]
	 */
	constructor(bleio) {
		/**
		 * A BLE IO manager
		 * @private
		 * @type {Bleio}
		 */
		this._bleio = bleio || new Bleio('Flippi', new Authenticator(PIN));

		/**
		 * An EngineController to control the motor
		 * @private
		 * @type {EngineController}
		 */
		this._engine = new EngineController(CHANNEL_MOTOR_1);


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
	}
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = FlipPi;