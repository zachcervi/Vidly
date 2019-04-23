const mongoose = require('mongoose');

module.exports = function () {
    mongoose
        .connect('mongodb://localhost/Vidly')
        .then(() => console.log('Connecting to MongoDb...'))
        .catch((err) => console.log('Could not connect to MongoDb...'));
}