const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js')
const mongoose = require('mongoose');


chai.use(chaiHttp);

let tokenS, directorId

describe('/api/director/[GET | POST | PUT | DELETE ]', () => {

    before((done) => {
       chai.request(server)
           .post('/authenticate')
           .send({ username: 'Can2', password: 'dagcan5654' })
           .end((err, res) => {
               tokenS = res.body.token;
               //console.log(tokenS);
               done()
           });
    });

    describe('/POST Director', () => {
        it('It should POST A New Director', (done) => {
           const director = {
               name: 'NewDirectorName',
               surname: 'NewDirectorSurname',
               bio : 'NewDirectorBioNewDirectorBioNewDirectorBioNewDirectorBioNewDirectorBio',
               token: tokenS
           }
           chai.request(server)
               .post('/api/director')
               .send(director)
               .end((err, res) => {
                   res.should.have.status(200);

                   res.body.should.be.a('object');
                   res.body.should.have.property('name');
                   //res.body.should.have.property('surname');
                   //res.body.should.have.property('bio');

                   directorId = res.body._id
                   done();
               });
        });
    });

    describe('/GET All Director&(s)Movies', () => {
       it('It Should Return All Directors and Their Movies', (done) => {

           chai.request(server)
               .get('/api/director')
               .send( {'token': tokenS})
               .end((err, res) => {
                   res.should.have.status(200);

                   res.body.should.be.a('array');


                   /*
                   res.body.should.have.property('name');
                   res.body.should.have.property('movies');
                    */

                   done()
               });

       });

    });

    describe('/PUT Update Director by given Director ID', () => {
        it('It should update Director by given Director ID', (done) => {
            const director = {
                name: 'NewName12',
                surname: 'NewSurName12',
                bio: 'NewTestDirectorName12NewTestDirectorSurName12BioBioBioNewBio ',
                token: tokenS
            }


            chai.request(server)
                .put('/api/director/' + directorId)
                .send(director)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(200);

                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);

                    done()
                });
        });

    });

    describe('/GET by director id', () => {
        it('It Should Get Data by given Director ID', (done) => {

            console.log("ID: ", directorId)

            chai.request(server)



                .get('/api/director/' + directorId)
                .send({'token': tokenS})
                .end((err, res) => {
                    res.should.have.status(200);



                    res.body.should.be.a('array');

                    res.body[0].should.have.property('_id').eql(directorId);
                    res.body[0].should.have.property('name')
                    res.body[0].should.have.property('surname')
                    res.body[0].should.have.property('movies')

                    done()
                });
        });
    });

    describe('/DELETE delete director.', () => {
       it('It Should Delete Director by Given ID ', (done) => {
           chai.request(server)
               .delete('/api/director/' + directorId)
               .send({'token': tokenS})
               .end((err, res) => {
                  res.should.have.status(200);

                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(1);
                  done()
               });
       });
    });


});