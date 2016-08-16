/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const FlipPi = require('./lib/service/flippi');
const pin = process.env.PIN || '1234';


////////////////////////////////////////////////////
////////////////////////////////////////////////////

new FlipPi(pin);