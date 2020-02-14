require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Twilio api call example, expects a phone num, a text message, and a callback
// Call back returns an object with an error property if problem

// const twilioAPI = require('./api/twilio_api');
// app.get('/twilio', (req, res) => {
//   let phonNum = '2501234567'
//   let message = 'some message'
//   twilioAPI.sendSMS(phonNum, message, response => {
//     if (response.error) {
//       res.status(500);
//     } else {
//       res.send(response);
//     }
//   });
// });

const numFormatAndValidator = number => {
  if (typeof number !== 'string' || typeof number !== 'number') return '';
  let formatted = number.trim();

  return formatted.replace(/\D+/g, '');
};

module.exports = {
  sendSMS: (toNumber, message = '', callback) => {
    const formattedNum = numFormatAndValidator(toNumber);

    client.messages
      .create({
        body: message,
        from: '+12362371332',
        to: `${formattedNum}`
      })
      .then(message => {
        callback({ data: message.sid });
      })
      .catch(err => {
        console.log('twilio err');
        callback({ error: err });
      });
  }
};
