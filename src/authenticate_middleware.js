'use strict';

const auth   = require('basic-auth');
const User = require('./models/user');

const authenticate = (req, res, next) => {

    const Credentials = auth(req);
    if (Credentials) {
      console.log(Credentials);
        User.authenticate(Credentials.name, Credentials.pass, (err, user) => {
            if ( err || !user ) {
                let err = new Error();
                err.message = 'Wrong email or password.';
                err.status = 401;
                return next(err);
            } else {
              // this req.user means "true" - as in the credintials are correct
                req.user = user;
                console.log(user)
                return next();
            }
        });
    } else {
        let err = new Error();
        err.message = 'Unauthorized to view page.';
        err.status = 401;
        return next(err);
    }
};

module.exports = {authenticate};
