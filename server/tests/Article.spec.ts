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


describe("articlesAPITests", () => {

    it('Fetching no articles', (done) => {
        chai.request(app)
            .get("/articles")
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [{ msg: 'Unauthorized' }] });
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });

    it('Fetching all articles', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rpbmd1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY4NDI2MDk2MiwiZXhwIjoxNjg0MjcxNzYyfQ.Cc_ga6yCsE7VjKUhfezMcz4q0LarePCyI5vmfQqnbag"
        chai.request(app)
            .get("/articles")
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('array').with.lengthOf(10);
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });

});