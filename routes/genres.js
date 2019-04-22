const express = require('express');
const router = express.Router();
const {
	Genre,
	validate
} = require('../models/genre');
const auth = require('../middleware/auth');


//GET
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, re) => {
	const genre = await Genre.findById(req.params.id)
	if (!genre) return res.status(404).send('The genre with the given id was not found.');
	res.send(genre);
});

//POST
router.post('/', auth, async (req, res) => {

	const {
		error
	} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre({
		name: req.body.name
	});
	await genre.save();
	res.send(genre);
});

//PUT
router.put('/:id', async (req, res) => {

	const {
		error
	} = validate(req.body);
	if (error) {
		res.send(400).send(error.details[0].message);
		return;
	}

	const genre = await Genre.findByIdAndUpdate(req.params.id, {
		name: req.body.name
	}, {
		new: true
	})

	//look up the genre
	//if doesn't exist return 404
	//const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('The movie genre with that given id was not found.');
	//validate genre
	//if invalid return 400

	res.send(genre);
});

//DELETE
router.delete('/:id', async (req, res) => {

	const genre = await Genre.findByIdAndRemove(req.params.id)

	if (!genre) return res.status(404).send('The movie genre with that given id was not found.');

	res.send(genre);
});


module.exports = router;