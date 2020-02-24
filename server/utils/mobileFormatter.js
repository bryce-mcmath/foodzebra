const mobileFormatter = number => {
  if (typeof number !== 'string' && typeof number !== 'number') return '';
  number = typeof number === 'string' ? number.trim() : number;
  number = typeof number === 'number' ? number.toString() : number;
  return number.replace(/\D+/g, '');
};

module.exports = mobileFormatter;
