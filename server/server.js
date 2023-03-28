const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

const configRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, async () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
