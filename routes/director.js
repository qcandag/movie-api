const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Directors')
const Movie = require("../models/Movie");

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json(error)
    });
});

router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'DirectorMovies'
            }
        },
        {
            $unwind: {
                path: '$DirectorMovies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$DirectorMovies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
               // bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ])
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
});

router.put('/:directorId', (req, res) => {
   const promise = Director.findByIdAndUpdate(req.params.directorId, req.body, { new: true });
   promise.then((data) => {
       res.json(data)
   }).catch((err) => {
       res.json(err);
   });
});

router.delete('/:directorId', (req, res) => {
    const promise = Director.findByIdAndRemove(req.params.directorId);

    promise.then((data) => {
        res.json({status : 1})
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:directorId', (req, res) => {
    const promise = Director.aggregate([
        {
          $match:{
              '_id': mongoose.Types.ObjectId(req.params.directorId)
          }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'DirectorMovies'
            }
        },
        {
            $unwind: {
                path: '$DirectorMovies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$DirectorMovies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                // bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ])
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
});



module.exports = router;
