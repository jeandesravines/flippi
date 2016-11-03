/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const Catcher = require('@jdes/catcher');
const {Pin} = require('johnny-five');
const ProxyBoard = require('../../../mock/proxy/proxy-board');
const EngineController = require('../../../../lib/controller/five-engine-controller');

describe('FiveEngineController', () => {
  const channel = 7;
  let controller;
  let board;

  beforeEach('Create', () => {
    board = new ProxyBoard();
    controller = new EngineController(channel, board);
  });

  describe('Create', () => {
    it('should eventually create an instance. (Coverage)', () => {
      Catcher.resolve(() => new EngineController(channel));
    });
  });

  describe('Update', () => {
    const values = [
      {in: 0.5, out: 127},
      {in: 0, out: 0},
      {in: NaN, out: 0}];

    values.forEach((args) => {
      it(`should set the value to ${args.in}`, () => {
        const mock = sinon.mock(controller._board);
        const expectations = mock.expects('analogWrite')
            .once()
            .withArgs(channel, args.out);

        return Promise.resolve()
            .then(() => board.emit('ready'))
            .then(() => controller.setValue(args.in))
            .then(() => expectations.verify())
            .then(() => mock.restore());
      });
    });
  });

  describe('Events', () => {
    it('should init the pin', () => {
      const spy = sinon.spy(board, 'pinMode');

      return Promise.resolve()
          .then(() => board.emit('ready'))
          .then(() => expect(spy.withArgs(channel, Pin.PWM).calledOnce))
          .then(() => spy.restore());
    });
  });

  describe('Stop', () => {
    it('should be stopped', () => {
      const mock = sinon.mock(controller._board);
      const expectations = mock.expects('analogWrite')
          .once()
          .withArgs(channel, 0);

      return Promise.resolve()
          .then(() => board.emit('ready'))
          .then(() => controller.stop())
          .then(() => expectations.verify())
          .then(() => mock.restore());
    });
  });
});
