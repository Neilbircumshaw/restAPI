'use strict';
const express  = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course').Course;
const User = require('../models/user');
const Review = require('../models/review').Review;
const {authenticate} = require('../authenticate_middleware');

//----------------------------------------------------------------------------------------------//
// GET /api/courses 200

router.get("/", (req, res, next) => {

  Course.find({}).select('title').exec(function (err, courses) {
        if (err) return next(err);
        res.json(courses);
    });
})
//----------------------------------------------------------------------------------------------//

//GET /api/course/:courseId review.user.fullName

router.get("/:courseId", (req, res, next) => {

// deep nested models. populate is just the way of grabbing assosiating models, like in SQL with tables.

Course.find({_id: req.params.courseId})
.populate({path: 'user', select: 'fullName'})
.populate({path: 'reviews', populate: {path: "user", select:"fullName", model: User} })
.exec((error, course) => {
			if (error) {
				return next(error);
			}

			return res.json(course);
})
});

//----------------------------------------------------------------------------------------------//

//POST /api/courses


router.post("/", authenticate, (req, res, next) => {
  Course.create(req.body, error => {
  		if (error) {
  			return next(error);
  		}

  		res.location('/');

  		return res.json("Course successfully posted!");
  	});

});

//----------------------------------------------------------------------------------------------//

// PUT /api/courses/:courseId 204

router.put("/:courseId", authenticate, (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body, error => {
  		if (error) {
        error.status = 400
  			return next(error);
  		}

  		res.location('/');

  		return res.json("Course successfully updated!");
  	});

});

//----------------------------------------------------------------------------------------------//

// POST /api/courses/:courseId/reviews 201

router.post("/:courseId/reviews", authenticate, (req, res, next) => {
  Review.create(req.body, (error, review) => {
  		if (error) {
  			return next(error);
  		}


 //push will push the review (the review id number) onto the reviews key of Course into an array of reviews.
  Course.findByIdAndUpdate(req.params.courseId,  { $push: { reviews: review._id } }).exec( error => {
        if (error) {
        return next(error);}

        res.location('/:courseId');
        res.status(201).json();

  	});

});
});

module.exports = router;
