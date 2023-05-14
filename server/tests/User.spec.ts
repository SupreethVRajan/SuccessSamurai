import chai from "chai";
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

    it('Logging in User', (done) => {
        chai.request(app)
            .post("/auth/login")
            .send({
                'email': "testinguser@email.com",
                'password': "testing"
            })
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log("Unable to log in test user", err);
                }
                done();
        })
    }) 
});