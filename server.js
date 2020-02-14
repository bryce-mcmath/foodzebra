require('dotenv').config();

// Imports
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.BUILD_ENV || 'production';
// const db = require('./db');

console.log('Running environment:', ENV);

// Initialize middleware
app.use(helmet());
app.use(xss());
app.use(express.static('dist'));
app.use(express.json({ extended: false, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.SECRET,
    maxAge: 24 * 60 * 60 * 1000
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

app.use('/menu', require('./routes/menu'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/orders', require('./routes/orders'));

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
