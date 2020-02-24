const { VARCHAR_MAX, SMALL_INT_MAX, INT_MAX } = require('../constants');

const isValidVarChar = inputString =>
  typeof inputString === 'string' && inputString.length <= VARCHAR_MAX;

const isValidInt = inputNum =>
  !isNaN(inputNum) && Math.abs(inputNum) <= INT_MAX;

const isValidSmallInt = inputNum =>
  !isNaN(inputNum) && Math.abs(inputNum) <= SMALL_INT_MAX;

module.exports = { isValidVarChar, isValidInt, isValidSmallInt };
