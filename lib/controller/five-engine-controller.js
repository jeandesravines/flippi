/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Board, Pin} = require('johnny-five');
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
   * @param {number} channel
   * @param {EventEmitter} [board]
   */
  constructor(channel, board) {
    super(channel);

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

    this._board.pinMode(this._channel, Pin.PWM);
    this.emit('ready');
  }

  /**
   * Set the percent of max speed of the motor
   * @override
   * @param {number} value float [0,1]
   * @return {Promise} a resolved Promise
   */
  setValue(value) {
    const speed = Math.floor(value * 255) || 0;

    if (this._ready) {
      this._board.analogWrite(this._channel, speed);
    }

    return Promise.resolve();
  }

  /**
   * Stop process
   * @override
   * @return {Promise} a resolved Promise if the engine has been stopped
   */
  stop() {
    return this.setValue(0);
  }
}


module.exports = FiveEngineController;
