/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const Catcher = require('@jdes/catcher');
const ProxyBoard = require('../../../lib/proxy/proxy-board');
const FiveEngineController = require('../../../../lib/controller/five-engine-controller');
const {Board, Pin} = require('johnny-five');

describe('FiveEngineController', () => {
  const channels = [5, 7];
  let board;
  let controller;

  beforeEach('Create', () => {
    board = new ProxyBoard();
    controller = new FiveEngineController(channels, board);
  });

  /* ************************************* */

  describe('Module check', () => {
    it('Board should be an EventEmitter', () => {
      expect(Board.prototype).to.be.an.instanceof(EventEmitter);
    });

    it('FiveEngineController should be an EventEmitter', () => {
      expect(FiveEngineController.prototype).to.be.an.instanceof(EventEmitter);
    });
  });

  describe('Create', () => {
    it('should eventually create an instance', () => {
      Catcher.resolve(() => {
        controller = new FiveEngineController(channels);
      });
    });
  });

  describe('Update', () => {
    const values = [
      {in: 0.5, out: 127},
      {in: 0, out: 0},
      {in: NaN, out: 0}];

    values.forEach((args) => {
      it(`should set the value to ${args.in}`, () => {
        const spy = sinon.spy(board, 'analogWrite');
        const expectations = [
          spy.withArgs(channels[0], args.out),
          spy.withArgs(channels[1], args.out),
        ];

        return controller.setValue(args.in)
          .then(() => {
            expectations.forEach((expectation) => {
              expect(expectation.calledOnce).to.be.equal(true);
            });
          })
          .then(() => spy.restore());
      });
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const spy = sinon.spy(controller, 'setValue');

      return controller.stop()
        .then(() => expect(spy.withArgs(0).calledOnce).to.be.equal(true))
        .then(() => spy.restore());
    });
  });

  describe('Events', () => {
    it('should init the pin', () => {
      const spy = sinon.spy(board, 'pinMode');
      const expectations = [
        spy.withArgs(channels[0], Pin.PWM),
        spy.withArgs(channels[1], Pin.PWM),
      ];

      controller = new FiveEngineController(channels, board);
      controller.on('ready', () => {
        expectations.forEach((expectation) => {
          expect(expectation.calledOnce).to.be.equal(true);
        });

        spy.restore();
        done();
      });

      board.emit('ready');
    });
  });

  describe('Close', () => {
    it('should close', () => {
      const spy = sinon.spy(controller, 'stop');

      controller.close()
        .then(() => expect(spy.calledOnce).to.be.equal(true))
        .then(() => spy.restore());
    });
  });
});
