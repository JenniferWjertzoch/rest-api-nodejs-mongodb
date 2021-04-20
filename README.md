# Design a REST API with Node.js

Build a scalable RESTful API with NodeJS and Express. I used MongoDB Atlas for hosting my  database.

## Table of Content

1. [Getting Started](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#1-getting-started-)

2. [Sequence Diagrams](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#2-sequence-diagrams)
    * [2.1. Add Order API](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#21-add-order-api)
    * [2.2. Get Order List API](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#22-get-order-list-api)
    * [2.3. Get Order API](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#23-get-order-api)
    * [2.4. Update Order API](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#24-update-order-api)
    * [2.5. Remove Order API](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#25-remove-order-api)
3. [System Architecture](https://github.com/JenniferWjertzoch/rest-api-nodejs-mongodb#3-system-architecture)

---
## 1. Getting Started 🚀

Please install dependenies by running:

`npm install`

Run the app using:

`npm start`

Go to localhost:3000

---

## 2. Sequence Diagrams

We use sequence diagrams to document and communicate what happens once an API endpoint is called.


### 2.1. Add Order API

The following image shows the sequence diagram for the Add New Order functionality. The request arrives in the REST API and is eventually processed to create the document in the database.

![Add Order API](/img/swimlanes-a70d15cc4887d61a42502b2624cd205d.png)


### 2.2. Get Order List API

The GET request is sent to the REST API to retrieve the list of orders. The query parameters of the request are parsed to extract all the search information from the database. Then the list of orders will be fetched for the search query from the database REST API. Finally, the retrieved order list is returned to the client in the response object.

![Add Order API](/img/swimlanes-17cf37fb3cd8bd71fa74580e8fe1bd6f.png)

### 2.3. Get Order API

The flow for the get an order functionality starts with the request that comes with the order id to retrieve the information. The REST API receives the request and retrieves the customer details from the database.

![Add Order API](/img/swimlanes-90b0ee3bc5021cd8788e43e005b98187.png)

### 2.4. Update Order API

This is a sequence diagram for updating the order functionality. The request comes to the REST API with the changed order details and from there makes the document update in the database.

![Add Order API](/img/swimlanes-767c22fa314ba42553e4b0c5dee6911c.png)

### 2.5. Remove Order API

The delete a customer request comes with the order id which needs to be removed from the database.

![Add Order API](/img/swimlanes-20a498bd688d74c5a4b4cf88aae6afdf.png)

---

## 3. System Architecture
The image shows the architecture of a very simple service (REST API & Database).

![System Architecture](/img/system-architecture.jpg)
