'use strict';

const mongoose = require('mongoose');

const ReviewSchema =  new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedOn: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        min: [1, 'Minimum Value is 1'],
        max: [5, 'Maximum Value is 5'],
        required: [true, 'Rating required (between 1 and 5)!']
    },
    review: String,
});


const Review = mongoose.model('Review', ReviewSchema);

module.exports = {Review};
