const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1);
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users)
app.use('/api/auth', auth);
mongoose
	.connect('mongodb://localhost/Vidly')
	.then(() => console.log('Connecting to MongoDb...'))
	.catch((err) => console.log('Could not connect to MongoDb...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
});