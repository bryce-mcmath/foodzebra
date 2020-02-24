require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const mobileFormatter = require('../utils/mobileFormatter');

module.exports = {
  sendSMS: (toNumber, message, callback) => {
    const cleanNum = mobileFormatter(toNumber);
    if (cleanNum && typeof message === 'string') {
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
          callback({ error: err });
        });
    } else {
      callback({ error: 'Invalid mobile number or message' });
    }
  }
};
