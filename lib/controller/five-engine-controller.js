/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');
const Catcher = require('@jdes/catcher');
const configuration = require('../configuration/configuration');
const EngineControllerInterface = require('./engine-controller-interface');

/**
 * Representing the motor's controller
 * @class FiveEngineController
 * @extends EngineControllerInterface
 */
class FiveEngineController extends EngineControllerInterface {
  /**
   * Instantiate an FiveEngineController
   * @constructor
   * @override
   * @param {Array.<number>} channels
   * @param {EventEmitter} [board]
   */
  constructor(channels, board) {
    super(channels);

    /**
     * The Board
     * @private
     * @type {Board}
     */
    this._board = board || new Board({
        debug: configuration.debug,
        repl: false,
      });

    /* ************************************** */

    this._board.on('ready', this._onReady.bind(this));
    this._board.on('exit', this.stop.bind(this));
  }

  /**
   * Execute when the board is ready
   * @private
   */
  _onReady() {
    super._onReady();

    this._forEach((channel) => this._board.pinMode(channel, Pin.PWM))
      .then(() => this.emit('ready'));
  }

  /**
   * Set the percent of max speed of the motors
   * @override
   * @param {number} value float [0,1]
   * @return {Promise.<Array>} a resolved Promise
   */
  setValue(value) {
    const speed = Math.floor(value * 255) || 0;

    return this._forEach((channel) => Catcher.resolve(() => {
      this._board.analogWrite(channel, speed);
    }));
  }

  /**
   * Close the process
   * @alias stop
   * @return {Promise.<Array>} a resolved Promise if the motors has been stopped
   */
  close() {
    return this.stop();
  }
}


module.exports = FiveEngineController;
