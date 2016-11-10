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
  const channel = 7;
  let controller;
  let board;

  beforeEach('Create', () => {
    board = new ProxyBoard();
    controller = new FiveEngineController(channel, board);
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
        controller = new FiveEngineController(channel);
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

        board.emit('ready');
        controller.setValue(args.in);
        expect(spy.withArgs(channel, args.out).calledOnce);
        spy.restore();
      });
    });
  });

  describe('Events', () => {
    it('should init the pin', () => {
      const spy = sinon.spy(board, 'pinMode');

      board.emit('ready');
      expect(spy.withArgs(channel, Pin.PWM).calledOnce);
      spy.restore();
    });
  });

  describe('Stop', () => {
    it('should be stopped', () => {
      const spy = sinon.spy(board, 'analogWrite');

      board.emit('ready');
      controller.stop();
      expect(spy.withArgs(channel, 0).calledOnce);
      spy.restore();
    });
  });
});
