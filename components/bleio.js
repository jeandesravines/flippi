'use strict';

const Bleno = require('bleno/lib/bleno');
const {EventEmitter} = require('events');
const FlipPiService = require('./flippi-service');
const Authenticator = require('./authenticator');

/**
 * Class to manage BLE IOs and its events
 */
class Bleio extends EventEmitter {

    /**
     * Instantiate a Bleio
     */
    constructor(title) {
        super();

        /**
         * The pin to secure write requests
         * @private
         * @type {string}
         */
        this.pin = '1234';

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
        this.authenticator = new Authenticator(this.pin);

        /**
         * The default service
         * @private
         * @type {FlipPiService}
         */
        this.service = new FlipPiService(this.authenticator);

        /**
         * The BLE manager
         * @private
         * @type {Bleno}
         */
        this.manager = new Bleno();


        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        this.manager.on('advertisingStart', this.onAdvertisingStart.bind(this));
        this.manager.on('stateChange', this.onStateChange.bind(this));
        this.manager.on('accept', this.onAccept.bind(this));
        this.manager.on('disconnect', this.onDisconnect.bind(this));
        this.service.on('updateValue', this.onUpdateValue.bind(this));
    }

    /**
     * Handle on characteristic value changed
     * @param {string} value the new value
     * @param {string} uuid the characteristic uuid
     */
    onUpdateValue(value, uuid) {
        this.emit('updateValue', value, uuid);
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
     * Handle on peripheral change state
     * @orivate
     * @param {String} state the new state
     */
    onStateChange(state) {
        if ('poweredOn' === state) {
            this.manager.startAdvertising(this.title, [this.service.uuid]);
        } else {
            this.manager.stopAdvertising();
        }
    }

    /**
     * Handle on client connected
     * @orivate
     * @param {String} address the client address
     */
    onAccept(address) {
        console.log('Accept, client: ' + address);
    }

    /**
     * Handle on client disconnected
     * @orivate
     * @param {String} address the client address
     */
    onDisconnect(address) {
        console.log('Disconnect, client: ' + address);
    }
}


///////////////////////////////////////////////
///////////////////////////////////////////////

module.exports = Bleio;