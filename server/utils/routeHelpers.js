const invalidCredentials = (res) =>
	res.status(401).send('Wrong username or password');

const notOperator = (res) =>
	res.status(401).send('You are not signed in as an operator');

const dbError = (res) => res.status(500).send('Error updating database');

const twilioError = () => res.status(500).send('Error sending SMS');

module.exports = { invalidCredentials, notOperator, dbError, twilioError };
