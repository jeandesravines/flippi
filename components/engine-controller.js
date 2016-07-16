'use strict';

/**
 * Copyright 2016 Jean
 */

const AnalogGpio = require('jdes-gpio');

/**
 *
 */
class EngineController {
    constructor() {
        /**
         * The GPIO Adapter
         * @type {AnalogGpio}
         * @private
         */
        this.io = new AnalogGpio();

        /**
         * Frequency in Hz
         * @private
         * @type {number}
         */
        this.frequency = 100;

        /**
         * The channels
         * @type {Object}
         * @private
         */
        this.channels = {
            output: {
                index: 7,
                direction: AnalogGpio.direction.out
            }
        };

        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////

        for (let i in this.channels) {
            this.io.open(this.channels[i].index, this.channels[i].direction)
                .catch(console.error);
        }

        let promise = () => {
            this.io.getAnalogValue(this.channels.output.index)
                .then((value) => {
                    console.log(value);
                    promise();
                });
        };

        promise();
    }

    /**
     * Set the percent of max speed of the motor
     * @param {number} value
     * @return {Promise}
     */
    setValue(value) {
        const float = parseFloat(value) || 0;
        const index = this.channels.output.index;
        const frequency = this.frequency;

        return this.io.setAnalogValue(index, parseFloat(float), frequency);
    }
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineController;