const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const createApp = require("./app.js");

let app, mongod;

beforeAll(async () => {
  // setup work
  mongod = new MongoMemoryServer();
  const dbUrl = await mongod.getUri();

  // bootsrap the app
  // create App ...
  app = await createApp({ mongoUrl: dbUrl })
})

afterAll(async () => {
    // await mongoose
  await mongod.stop();
})

describe("The Product API", function () {
  it("1. Can create a produc", function (done) {

    request(app)
      .post("/prders")
      .send({
          id: "order_1",
          products: [
              {
                  id: "product_1",
                  name: "T-Shirt"
              }
          ]
      })
      .expect(200)
      .end(function (err, res) {
        expect(res.body).toHavePropery("id", "order_1");
        if (err) return done(err);
        done();
      });
  });

});