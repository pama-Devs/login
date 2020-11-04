const express = require('express');
const router = express();
const User = require('../models/user');

router.post('/:token', (req, res, next) => {
    User.updateOne({ token: req.params.token }, { $set: { token: '', isLoggedIn: false } })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Logged Out Successfully'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

module.exports = router;

