const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const winston = require("winston");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

// Store the orders in memory
const orders = [
  {
    id: "order_1",
    products: ["Shorts", "T-Shirt", "Hoodie"],
    amount: 85
  },
  {
    id: "order_2",
    products: ["Shoes", "Jacket"],
    amount: 195
  },
  {
    id: "order_3",
    products: ["T-Shirt", "Jacket", "Hat"],
    amount: 130
  },
];

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
app.post("/orders", (request, response) => {
  const order = request.body;
  orders.push(order);
  response.json(order);
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
app.get("/orders/:orderId", (request, response) => {
  const orderId = request.params.orderId;

  const order = orders.find((prod) => prod.id === orderId);

  if (!order) response.status(404);

  response.json(order);
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
app.get("/orders", (request, response) => response.json(orders));

module.exports = app;
