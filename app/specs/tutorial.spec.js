let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let db = require('../../app/models');

chai.should();

chai.use(chaiHttp);

describe('Tutorials', () => {
    before(async () => {
        /*db.tutorials.destroy({
            where: {},
            truncate: false
        })
            .then(() => {
                done();
            });*/
        await db.tutorials.sync({ force: true });
    });
    describe('validations of HTTP Code', () => {
        it("should create a tutorial", (done) => {
            chai.request(server)
                .post('/api/tutorials/')
                .send({
                    title: 'tutorial',
                    description: 'tutorial description',
                    published: true
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should get a single tutorial', (done) => {
            chai.request(server)
                .get('/api/tutorials/1')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });

        it('should get all the tutorials', (done) => {
            chai.request(server)
                .get('/api/tutorials/')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });
    });
});
    