let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let db = require('../../app/models');

chai.should();

chai.use(chaiHttp);

describe('Tutorials', () => {
    beforeEach((done) => {
        db.tutorials.destroy({
            where: {},
            truncate: false
        })
            .then(() => {
                done();
            });
    });
    describe('validations of HTTP Code', () => {
        it('should get all the tutorials', (done) => {
        chai.request(server)
            .get('/api/tutorials/')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
        });

        it("should create a tutorial", (done) => {
            chai.request(server)
                .post('/api/tutorials/')
                .send({
                    title: 'thing1',
                    description: 'thing1 description',
                    published: true
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should get a single thing', (done) => {
        chai.request(server)
            .get('/api/tutorials/1')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
        });
    });
});
    