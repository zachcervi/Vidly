const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/genres', genres);
mongoose
	.connect('mongodb://localhost/Vidly')
	.then(() => console.log('Connecting to MongoDb...'))
	.catch((err) => console.log('Could not connect to MongoDb...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
});
