/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Catcher = require('@jdes/catcher');
const Bleno = require('./bleno');
const debug = require('../helper/debug');
const Service = require('./service');
const uuids = require('../constant/uuids');

/**
 * Class to manage Bluetooth Low Energy I/O and its events
 * @class Manager
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
    this._bleno = manager || new Bleno();

    /* **************************** */

    this._bleno.on('accept', debug.bind(debug, 'Accept:'));
    this._bleno.on('disconnect', debug.bind(debug, 'Disconnect:'));
    this._bleno.on('advertisingStart', this.onAdvertisingStart.bind(this));
    this._bleno.on('stateChange', this.onStateChange.bind(this));
    this._service.on('updateValue', this.onUpdateValue.bind(this));
  }

  /**
   * Stop process
   */
  stop() {
    this._bleno.stopAdvertising();
  }

  /**
   * Handle on Advertising started
   * @private
   */
  onAdvertisingStart() {
    this._bleno.setServices([this._service], (error) => {
      error && Catcher.reject(error);
    });
  }

  /**
   * Handle on peripheral change state
   * @private
   * @param {string} state the new state
   */
  onStateChange(state) {
    if ('poweredOn' === state) {
      this._bleno.startAdvertising(this.title, [this._service.uuid]);
    } else {
      this._bleno.stopAdvertising();
    }
  }

  /**
   * Handle on characteristic value changed
   * @param {string} value the new value
   * @param {Characteristic} characteristic the characteristic
   */
  onUpdateValue(value, characteristic) {
    this.emit('updateValue', value, characteristic.uuid);
  }
}


module.exports = Manager;
