/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Characteristic = require('bleno/lib/characteristic');
const Descriptor = require('bleno/lib/descriptor');
const PrimaryService = require('bleno/lib/primary-service');
const Bleno = require('bleno/lib/bleno');

Bleno.Characteristic = Characteristic;
Bleno.Descriptor = Descriptor;
Bleno.PrimaryService = PrimaryService;

module.exports = Bleno;