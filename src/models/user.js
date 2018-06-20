const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true
    },
    emailAddress: {
        type: String,
        required: [true, 'Email is required and must have a minimum length of 1'],
        trim: true,
        minlength: 1,
        unique: [true, 'The email address is already taken'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});


UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ emailAddress: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                let error = new Error('User not found');
                error.status = 401;
                return callback(error);
            }

            bcrypt.compare(password, user.password, function (error, user) {
                         if (user) {
                             return callback(null, user);
                         } else {
                           let err = new Error();
                err.message = 'User password not validated';
                err.status = 401;
                return callback(err);
                         }
                     });
                 });
         }

         // hash password before saving to database
         UserSchema.pre('save', function (next) {
             let user = this;
             bcrypt.hash(user.password, 10, function (err, hash) {
                 if (err) {
                     return next(err);
                 }
                 user.password = hash;
                 next();
             });
         });


const User = mongoose.model("User", UserSchema);
module.exports = User;
