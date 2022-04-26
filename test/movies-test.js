const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let tokenS, movieID;
describe('/api/movies/[GET]', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'Can2', password: 'dagcan5654' })
            .end((err, res) => {
                tokenS = res.body.token;
                //console.log(tokenS)
                done();
            });
    });

    describe('/GET Movies', () => {
        it('It  Should Get All Movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .send({'token': tokenS})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST Movie', () => {
        it('It  Should Post A  Movie', (done) => {
            const movie = {
                title: 'Test1Movie',
                director_id: '626473676054f6ae1ef67869',
                category: 'Comedy',
                country: 'USA',
                year: 1998,
                imdb_score: 8,
                token: tokenS
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieID = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:movie_id', ()=> {
        it('It should GET a movie by given id', (done) => {
            chai.request(server)
                .get('/api/movies/'+ movieID)
                .send({'token': tokenS})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieID);
                    done()
                });
        });
    });

    describe('/PUT/:movie_id Movie', () => {
        it('It  Should PUT Update To A  Movie by given id', (done) => {
            const movie = {
                title: 'Test2Movie',
                director_id: '626473676054f6ae1ef67868',
                category: 'Crime',
                country: 'ENG',
                year: 1999,
                imdb_score: 7,
                token: tokenS
            }
            chai.request(server)
                .put('/api/movies/' + movieID)
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);

                    done();
                });
        });
    });

    describe('/DELETE/:movie_id Movie', () => {
        it('It  Should DELETE  A  Movie by given id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movieID)
                .send({'token': tokenS})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });



});