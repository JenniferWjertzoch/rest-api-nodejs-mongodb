const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const winston = require("winston");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const {
  OrderModel
} = require("./models.js");
const database = require("./database.js");
const swaggerDocument = YAML.load('./swagger.yaml');

async function createApp(config) {
  // async 
  await database(config.mongoUrl)

  const app = express();

  // Middleware: parse the body to json
  app.use(bodyParser.json());

  // Middleware: for request and error logging of express.js
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );

  // API documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // REST endpoints
  // CREATE Order
  app.post("/orders", async (request, response) => {
    try {
      // 1. Get the data
      const orderData = request.body;

      // 2. Validate the data
      if (!orderData.id || !orderData.products) {
        response.status(400).send("The body cannot be empty.") // 400 Bad Request
      } else {
        // 3. Create the object in the database
        // orders.push(order);
        const createdOrder = await OrderModel.create({
          id: orderData.id,
          products: orderData.products
        })

        // 4. Return what we created
        response.json(createdOrder); // 200 OK
      }
    } catch (error) {
      console.log(error)
      // 5. Error handling
      response.status(500).send("Internal Error: Code2345")
    }
  });

  // UPDATE order
  app.put("/orders/:orderId", (request, response) => {
    const orderId = request.params.orderId;

    const updatedOrder = request.body;

    let newOrder = null;
    // update
    orders.forEach((order, index) => {
      if (order.id === orderId) {
        newOrder = {
          ...orders[index],
          ...updatedOrder,
        };
        orders[index] = newOrder;
      }
    });

    response.json(newOrder);
  });

  // GET order
  app.get("/orders/:orderId", async (request, response) => {
    try {
      // 1. Get the order id
      const orderId = request.params.orderId;

      // 2. Validate
      if (!orderId) {
        response.status(400).send("Order id ust be defined.")
      } else {
        // 3. Get order by id
        // const order = orders.find((prod) => prod.id === orderId);
        const myOrder = await OrderModel.find({
          id: orderId
        })

        if (!myOrder) {
          response.status(404);
        } else {
          // 4. Send the order back
          response.json(myOrder);
        }
      }
    } catch (error) {
      console.log(error)
      response.status(500).send("Internal Error: ")
    }

  });

  // DELETE order
  app.delete('/orders/:orderId', (request, response) => {
    const orderId = request.params.orderId;
    const order = orders.find((order) => order.id === orderId);

    const index = orders.indexOf(order);
    orders.splice(index, 1);

    response.send(order);
  });

  // Orders list
  app.get("/orders-list", (request, response) => response.json(orders));


}

module.exports = createApp();