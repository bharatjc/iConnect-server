const mongoose = require("mongoose");
// require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://bharat:2h1r1tjung@bharat.ysbba.mongodb.net/iConnect?retryWrites=true&w=majority&appName=Bharat"
  )
  .then(() => console.log("Connected!"));
