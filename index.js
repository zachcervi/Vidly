const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [{
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Comdey'
    },
    {
        id: 3,
        name: 'Family'
    },
    {
        id: 4,
        name: 'Horror'
    },


]

//GET
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
});

//POST
app.post('/api/genres', (req, res) => {
    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

//PUT
app.put('/api/genres/:id', (req, res) => {
    //look up the genre
    //if doesn't exist return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The movie genre with that given id was not found.');
    //validate genre
    //if invalid return 400
    const {
        error
    } = validateGenre(req.body);
    if (error) {
        res.send(400).send(error.details[0].message);
        return;
    }

    genre.name = req.body.name;
    res.send(genre);

});

//DELETE
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The movie genre with that given id was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required()
    };
    return Joi.validate(genre, schema);
}