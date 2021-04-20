require('dotenv').config()

const app = require("./app");

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`My first server is runnnin at http://localhost:${port}`)
);
