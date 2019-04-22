const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {
    User,
    validate
} = require('../models/user');

const express = require('express');
const router = express.Router();
const _ = require('lodash');


//GET
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
})
//POST
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth_token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router