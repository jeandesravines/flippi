/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleno = require('./bleno');

/**
 * Representing a BLE Characteristic
 * @class Characteristic
 * @extends Bleno.Characteristic
 */
class Characteristic extends Bleno.Characteristic {
  /**
   * Instantiate a new Characteristic
   * @constructor
   * @override
   * @param {Object} options the Bleno.Characteristic options
   * @param {FiveEngineController} authenticator the authenticator
   * @param {string} [value] the default value
   */
  constructor(options, authenticator, value) {
    super(options);

    /**
     * @readonly
     * @protected
     * @type {Buffer}
     */
    this._default = Buffer.from(value || '');

    /**
     * @readonly
     * @protected
     * @type {FiveEngineController}
     */
    this._authenticator = authenticator;
  }

  /**
   * Update the value and emit an "updateValue" event
   * @param {*} value the new value
   */
  setValue(value) {
    this.value = Buffer.from(String(value));
    this.emit('updateValue', this.value.toString(), this);
  }

  /**
   * Returns the current value if exists and the default value else
   * @return {Buffer} the current value or the default value
   */
  getValue() {
    return this.value || this._default;
  }

  /**
   * Handle on a read request
   * @protected
   * @param {int} offset
   * @param {Function} callback
   */
  onReadRequest(offset, callback) {
    callback(Characteristic.RESULT_SUCCESS, this.getValue());
  }

  /**
   * Handle on a write request
   * @protected
   * @param {Buffer} data
   * @param {int} offset
   * @param {boolean} withoutResponse
   * @param {Function} callback
   */
  onWriteRequest(data, offset, withoutResponse, callback) {
    callback(Characteristic.RESULT_SUCCESS);
  }
}


module.exports = Characteristic;
