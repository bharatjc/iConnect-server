const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoute = require("./route/auth");
const productRoute = require("./route/product");
require("./config/database");
const Joi = require("joi");

app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(fileUpload());

app.get("/", function (req, res) {
  res.send("Welcome to Ecommerce server");
});

app.use("/api", authRoute);

app.use("/api", productRoute);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running");
});
