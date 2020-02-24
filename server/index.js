require('dotenv').config();
const { PORT, BUILD_ENV, SECRET } = process.env;

// Imports
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

// Local vs deployed config
const PORT_IN_USE = PORT || 8080;
const ENV = BUILD_ENV || 'production';

console.log('Running environment ', ENV);

// Initialize middleware
app.use(helmet());
app.use(xss());
app.use(express.static('dist'));
app.use(express.json({ extended: false, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    secret: SECRET,
    maxAge: 24 * 60 * 60 * 1000 // 24HR
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('../dist/index.html');
});
app.use('/menu', require('./routes/menu'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/orders', require('./routes/orders'));
app.use('/sms', require('./routes/sms'));
app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT_IN_USE, () =>
  console.log(`Server running on port ${PORT_IN_USE}`)
);
