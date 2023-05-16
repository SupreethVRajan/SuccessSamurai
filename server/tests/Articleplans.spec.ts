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


describe("articlePackagesAPITests", () => {

    it('Fetching no prices', (done) => {
        chai.request(app)
            .get("/subs/prices")
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [{ msg: 'Unauthorized' }] });
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });

    it('Fetching prices', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cHJlQGVtYWlsLmNvbSIsImlhdCI6MTY4NDIyMDA5NiwiZXhwIjoxNjg0MjMwODk2fQ.alaWJ_s7gq6HH5wLc9nZeJUm9UgGAcf2yxmrOBMtV3A"
        chai.request(app)
            .get("/articles")
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('array').with.lengthOf(3);
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });
});