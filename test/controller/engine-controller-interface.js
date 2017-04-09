/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {beforeEach, describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');
const EngineController = require('../../lib/controller/engine-controller-interface');

describe('EngineControllerInterface', () => {
  const channels = [5, 7];
  let controller;

  beforeEach('Create', () => {
    controller = new EngineController(channels);
  });

  /* ************************************* */

  describe('Update', () => {
    it('should throws an exception', () => {
      expect(() => controller.setValue(0)).to.throws(Error);
    });
  });

  describe('Stop', () => {
    it('should stop', () => {
      const spy = sinon.spy(controller, 'setValue');

      return Promise.resolve()
        .then(() => controller.stop())
        .catch((error) => expect(error.message).to.be.equal('Not set yet'))
        .then(() => expect(spy.withArgs(0).calledOnce).to.be.equal(true))
        .then(() => spy.restore());
    });
  });

  describe('Close', () => {
    it('should throws an exception', () => {
      expect(() => controller.close()).to.throws(Error);
    });
  });

  describe('ForEach', () => {
    it('should resolve correctly', () => {
      return controller._forEach((channel) => channel)
        .then((values) => {
          expect(values).to.be.deep.equal(channels);
        });
    });

    it('should resolve with wrong callback', () => {
      return controller._forEach((channel) => undefined)
        .then((values) => {
          expect(values.length).to.be.equal(channels.length);
        });
    });

    it('should reject', () => {
      return controller._forEach((channel) => Promise.reject('OK'))
        .catch((error) => {
          expect(error).to.be.equal('OK');
        });
    });
  });
});
