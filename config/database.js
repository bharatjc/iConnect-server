const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://bharat:2h1r1tjung@bharat.ysbba.mongodb.net/iConnect-server?retryWrites=true&w=majority&appName=Bharat"
  )
  .then(() => console.log("Connected!"));
