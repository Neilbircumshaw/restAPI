

const {data} = require('./data/data');
var seeder = require('mongoose-seed');



const seedDB = (req, res, next) => {
    seeder.connect('mongodb://localhost:27017/courseRatingAPI', () => {


        // Load Mongoose models
        seeder.loadModels([
            './src/models/user.js',
            './src/models/review.js',
            './src/models/course.js'
        ]);

        // refreshes database - lets not do this atm because it's easier to just have it remain with the data in it that I make.
      /*  seeder.clearModels(['User', 'Review', 'Course'], function() {

            seeder.populateModels(data, function() {

            });
        }); */

    });
};

//  execute seeding
seedDB()

module.exports = seedDB
