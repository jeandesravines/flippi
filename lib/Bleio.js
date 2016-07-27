'use strict';

/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

const Bleno = require('bleno/lib/bleno'),
	{EventEmitter} = require('events'),
	FlipPiService = require('./FlipPiService'),
	Authenticator = require('./Authenticator');

/**
 * @class Bleio Class to manage BLE IOs and its events
 * @extends EventEmitter
 */
class Bleio extends EventEmitter {

	/**
	 * Instantiate a Bleio
	 * @param {string} title the app's name
	 */
	constructor(title) {
		super();

		/**
		 * The pin to secure write requests
		 * @private
		 * @type {string}
		 */
		this._pin = '1234';

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
		this._authenticator = new Authenticator(this._pin);

		/**
		 * The default service
		 * @private
		 * @type {FlipPiService}
		 */
		this.service = new FlipPiService(this._authenticator);

		/**
		 * The BLE manager
		 * @private
		 * @type {Bleno}
		 */
		this.manager = new Bleno();


		////////////////////////////////////////////////
		////////////////////////////////////////////////

		this.manager.on('accept', this.onAccept.bind(this));
		this.manager.on('advertisingStart', this.onAdvertisingStart.bind(this));
		this.manager.on('disconnect', this.onDisconnect.bind(this));
		this.manager.on('stateChange', this.onStateChange.bind(this));

		this.service.on('updateValue', this.onUpdateValue.bind(this));
	}

	/**
	 * Handle on client connected
	 * @orivate
	 * @param {string} address the client address
	 */
	onAccept(address) {
		console.log('Accept, client: ' + address);
	}

	/**
	 * Handle on Advertising started
	 * @orivate
	 */
	onAdvertisingStart() {
		this.manager.setServices([this.service], (err) => {
			console.log('AdvertizingStart: ' + (err ? 'error' : 'success'));
		});
	}

	/**
	 * Handle on client disconnected
	 * @orivate
	 * @param {string} address the client address
	 */
	onDisconnect(address) {
		console.log('Disconnect, client: ' + address);
	}

	/**
	 * Handle on peripheral change state
	 * @orivate
	 * @param {string} state the new state
	 */
	onStateChange(state) {
		if ('poweredOn' === state) {
			this.manager.startAdvertising(this.title, [this.service.uuid]);
		} else {
			this.manager.stopAdvertising();
		}
	}

	/**
	 * Handle on characteristic value changed
	 * @param {string} value the new value
	 * @param {string} uuid the characteristic uuid
	 */
	onUpdateValue(value, uuid) {
		super.emit('updateValue', value, uuid);
	}
}


///////////////////////////////////////////////
///////////////////////////////////////////////

module.exports = Bleio;