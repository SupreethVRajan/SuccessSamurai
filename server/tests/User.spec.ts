import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { before, after, describe } from "node:test";

chai.use(chaiHttp);

const should = chai.should();

before((done) => {
    done();
})

after((done) => {
    done();
})


describe("userAPITests", () => {

    it('Logging in User - Valid User', (done) => {
        chai.request(app)
            .post("/auth/login")
            .send({
                'email': "testinguser@email.com",
                'password': "testing"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('errors').that.is.an('array').with.lengthOf(0);
                expect(res.body).to.have.property('data').that.is.an('object').and.is.not.empty;
                if (err) {
                    console.log("Unable to log in test user", err);
                }
                done();
        })
    }) 

    it('Logging in User - Invalid User', (done) => {
        chai.request(app)
            .post("/auth/login")
            .send({
                'email': "testinguser@email.com",
                'password': "testi"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [ { msg: 'Invalid credentails' } ], data: null });
                if (err) {
                    console.log("Unable to log in test user", err);
                }
                done();
        })
    }) 

    it('Signing up User - Invalid credentials', (done) => {
        chai.request(app)
            .post("/auth/signup")
            .send({
                'email': "testingusail.com",
                'password': "testing"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [ { msg: 'Invalid email id' } ], data: null });
                if (err) {
                    console.log("Unable to log in test user", err);
                }
                done();
        })
    }) 

    it('Signing up User - Signed up user', (done) => {
        chai.request(app)
            .post("/auth/signup")
            .send({
                'email': "testinguser@email.com",
                'password': "testing"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [ { msg: 'Email already exists' } ], data: null });
                if (err) {
                    console.log("Unable to log in test user", err);
                }
                done();
        })
    }) 
});