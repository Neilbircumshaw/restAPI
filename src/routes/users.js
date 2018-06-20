'use strict';
const express  = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const {authenticate} = require('../authenticate_middleware');



router.post('/', (req, res, next) => {

    User.findOne({ emailAddress: req.body.emailAddress })
        .exec((err, user) => {
          console.log(req.body.fullName)
            if (user) {
                const err = new Error('That email has already been used.');
                err.status = 401;
                return next(err);
            } else {
                User.create(req.body, function (err, user) {
                    if (!user.fullName || !user.emailAddress || !user.password) {
                        const err = new Error('Please enter all fields');
                        err.status = 401;
                        return next(err);
                    }
                    else {
                        res.location('/');
                        res.json({response: "User added!"})
                    }

                });
            }
        });
});

router.get("/", authenticate, (req, res, next) => {
res.json({response: "it's working dogggg"})
res.json(req.user)


})

module.exports = router;
