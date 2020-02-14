const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('New phone, who dis');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router;
