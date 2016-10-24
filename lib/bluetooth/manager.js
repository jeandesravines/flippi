/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Bleno = require('./bleno');
const debug = require('../helper/debug');
const Service = require('./service');
const uuids = require('../constant/uuids');

/**
 * @class Manager Class to manage Bluetooth Low Energy I/O and its events
 * @extends EventEmitter
 */
class Manager extends EventEmitter {

	/**
	 * Instantiate a Manager
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
		 * @type {Service}
		 */
		this._service = new Service(uuids, this._authenticator);

		/**
		 * The BLE manager
		 * @private
		 * @type {Bleno}
		 */
		this._manager = manager || new Bleno();


		////////////////////////////////////////////////
		////////////////////////////////////////////////

		this._manager.on('accept', debug.bind(debug, 'Accept:'));
		this._manager.on('disconnect', debug.bind(debug, 'Disconnect:'));
		this._manager.on('advertisingStart', this.onAdvertisingStart.bind(this));
		this._manager.on('stateChange', this.onStateChange.bind(this));
		this._service.on('updateValue', this.onUpdateValue.bind(this));
	}

	/**
	 * Stop process
	 */
	stop() {
		this._manager.stopAdvertising();
	}

	/**
	 * Handle on Advertising started
	 * @private
	 */
	onAdvertisingStart() {
		this._manager.setServices([this._service], (error) => {
			debug('AdvertizingStart:', error ? 'error' : 'success');
		});
	}

	/**
	 * Handle on peripheral change state
	 * @private
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
		this.emit('updateValue', value, characteristic.uuid);
	}
}


module.exports = Manager;