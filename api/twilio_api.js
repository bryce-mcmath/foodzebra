require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const numFormatAndValidator = number => {
  if (typeof number !== 'string' && typeof number !== 'number') return '';
  number = typeof number === 'string' ? number.trim() : number;
  number = typeof number === 'number' ? number.toString() : number;
  return number.replace(/\D+/g, '');
};

module.exports = {
  sendSMS: (toNumber, message = '', callback) => {
    const cleanNum = numFormatAndValidator(toNumber);
    if (cleanNum) {
      client.messages
        .create({
          body: message,
          from: '+12362371332',
          to: `${cleanNum}`
        })
        .then(msg => {
          callback({ data: msg });
        })
        .catch(err => {
          console.log('twilio err');
          callback({ error: err });
        });
    } else {
      callback({ data: 'No mobile number' });
    }
  }
};
