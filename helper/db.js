const  mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://qcandag:Dagcan56@movieapi1.pjuhr.mongodb.net/movieapi1');
    mongoose.connection.on('open', () => {
        console.log("Connected!")
    });
    mongoose.connection.on('error', (err) => {
        console.log("Connection Error!!", err)
    });
    mongoose.Promise = global.Promise;
}
