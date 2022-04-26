const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: [true, 'You must give a title name!'],
        maxlength: [15, '{PATH} -> {VALUE} is should had less then {MAXLENGTH} character!'],
        minlenght: [1, '{PATH} is should had more then 0 character!']
    },
    category: String,
    country: String,
    year: {
        type: Number,
        max: 2050,
        min: 1970
    },
    imdb_score: {
        type: Number,
        min: 0,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movies', MovieSchema)