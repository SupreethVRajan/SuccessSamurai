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


describe("articlesAPITests", () => {

    it('Fetching articles', (done) => {
        chai.request(app)
            .get("/articles")
            .end((err, res) => {
                res.should.have.status(200);
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
        })
    }) 
});