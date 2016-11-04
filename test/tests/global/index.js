/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */
/* eslint-disable no-invalid-this */

'use strict';

const {afterEach} = require('mocha');
const Cleaner = require('../../lib/helper/cleaner');

/* ********************************** */

afterEach('Clean require.cache', function() {
  Cleaner.clean(this.currentTest.file);
});
