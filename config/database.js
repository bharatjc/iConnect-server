const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Bharat:2h1r1tjung@cluster0.t2vg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected!"));
