/** Express server index file
 * @module server
 * @requires express
 */

require('dotenv').config();
const { BUILD_ENV, SECRET } = process.env;

// Imports
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

// Local vs deployed config
const PORT = process.env.PORT || 8080;
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

/**
 * Route serving base application
 * @name get/
 * @function
 * @memberof server
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
app.get('/', (_, res) => {
	res.render('../dist/index.html');
});

/**
 * Routers
 */
app.use('/menu', require('./routes/menu'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/orders', require('./routes/orders'));
app.use('/sms', require('./routes/sms'));

/**
 * Catch route to deal with unhandled GETs
 * @name get/*
 * @function
 * @memberof server
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
app.get('/*', (_, res) => {
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
