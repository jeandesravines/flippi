/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const grab = require('ps-grab');
const FlipPi = require('./lib/service/flippi');
const pin = grab('-p') || '1234';


////////////////////////////////////////////////////
////////////////////////////////////////////////////

new FlipPi(pin);