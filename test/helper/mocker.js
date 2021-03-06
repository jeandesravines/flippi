/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const {EventEmitter} = require('events');
const Mocker = require('../../lib/helper/mocker');

describe('Mocker', () => {
  describe('Instance', () => {
    it('should throws an Error', () => {
      expect(() => new Mocker()).to.throws(Error);
    });
  });

  describe('Create', () => {
    it('should be a child of EventEmitter', () => {
      const Mock = Mocker.create(EventEmitter, {});

      expect(new Mock()).to.be.instanceOf(EventEmitter);
    });

    it('should be an overriden child of EventEmitter', () => {
      const mocked = new (Mocker.create(EventEmitter, {
        sayHello: () => 'Hello',
      }))();

      expect(mocked).to.be.instanceOf(EventEmitter);
      expect(mocked.sayHello()).to.be.equal('Hello');
    });
  });
});
