'use strict';

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title required!']
    },
    description: {
        type: String,
        required: [true, 'Description required!']
    },
    estimatedTime: {type: String},
    materialsNeeded: {type: String},
    steps: [{
        stepNumber: {type: Number},
        title: {
            type: String,
            required: [true, 'Step Title required!']
            },
        description: {
            type: String,
            required: [true, 'Step Description required!']
            }
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course };
