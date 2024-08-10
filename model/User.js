const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  businessName: String,
  bAddress: String,
  bPhone: Number,
  city: String,
  postalCode: Number,
  cAddress: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
