const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
mongoose
	.connect('mongodb://localhost/Vidly')
	.then(() => console.log('Connecting to MongoDb...'))
	.catch((err) => console.log('Could not connect to MongoDb...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
});