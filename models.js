const mongoose = require("mongoose");

// TODO: Uncomment the lines beloow to finish the databse model
const Product = new mongoose.Schema({
    id: String,
    name: String
});

const OrderModel = mongoose.model("Orders", {
  id: String,
  products: [Product]
});

module.exports = {OrderModel}
