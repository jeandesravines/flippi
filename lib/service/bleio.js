/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleno = require('bleno/lib/bleno');
const {EventEmitter} = require('events');
const FlipPiService = require('./../helper/flippi-service');
const uuids = require('../constant/uuids');

/**
 * @class Bleio Class to manage BLE IOs and its events
 * @extends EventEmitter
 */
class Bleio extends EventEmitter {

	/**
	 * Instantiate a Bleio
	 * @param {string} title the app's name
	 * @param {Authenticator} authenticator
	 * @param {EventEmitter} [manager]
	 */
	constructor(title, authenticator, manager) {
		super();

		/**
		 * The peripheral name
		 * @type {string}
		 */
		this.title = title;

		/**
		 * The authenticator to check the pin in every write requests
		 * @private
		 * @type {Authenticator}
		 */
		this._authenticator = authenticator;

		/**
		 * The default service
		 * @private
		 * @type {FlipPiService}
		 */
		this._service = new FlipPiService(uuids, this._authenticator);

		/**
		 * The BLE manager
		 * @private
		 * @type {Bleno}
		 */
		this._manager = manager || new Bleno();


		////////////////////////////////////////////////
		////////////////////////////////////////////////

		this._manager.on('accept', console.log.bind(console, 'Accept:'));
		this._manager.on('disconnect', console.log.bind(console, 'Disconnect:'));
		this._manager.on('advertisingStart', this.onAdvertisingStart.bind(this));
		this._manager.on('stateChange', this.onStateChange.bind(this));
		this._service.on('updateValue', this.onUpdateValue.bind(this));
	}

	/**
	 * Handle on Advertising started
	 * @orivate
	 */
	onAdvertisingStart() {
		this._manager.setServices([this._service], () => {
			console.log('AdvertizingStart');
		});
	}

	/**
	 * Handle on peripheral change state
	 * @orivate
	 * @param {string} state the new state
	 */
	onStateChange(state) {
		if ('poweredOn' === state) {
			this._manager.startAdvertising(this.title, [this._service.uuid]);
		} else {
			this._manager.stopAdvertising();
		}
	}

	/**
	 * Handle on characteristic value changed
	 * @param {string} value the new value
	 * @param {FlipPiCharacteristic} characteristic the characteristic
	 */
	onUpdateValue(value, characteristic) {
		super.emit('updateValue', value, characteristic.uuid);
	}
}


///////////////////////////////////////////////
///////////////////////////////////////////////

module.exports = Bleio;