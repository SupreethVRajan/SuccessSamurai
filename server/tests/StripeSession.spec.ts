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

    it('Fetching no session', (done) => {
        chai.request(app)
            .post("/subs/session")
            .send({
            priceId: 'price_1N7BOVSGRhw1UqYusyvnCmEm',
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal({ errors: [{ msg: 'Unauthorized' }] });
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });

    it('Fetching a session', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rpbmd1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTY4NDI2MDk2MiwiZXhwIjoxNjg0MjcxNzYyfQ.Cc_ga6yCsE7VjKUhfezMcz4q0LarePCyI5vmfQqnbag"
        chai.request(app)
            .post("/subs/session")
            .send({
            priceId: 'price_1N7BOVSGRhw1UqYusyvnCmEm',
            })
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('id').that.is.an('string');
                expect(res.body).to.have.property('url').that.is.an('string').and.is.not.empty;
                if (err) {
                    console.log("Unable to fetch articles", err);
                }
                done();
            })
    });
});