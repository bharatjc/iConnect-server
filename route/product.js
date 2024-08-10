const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchData,
} = require("../controller/product");
const {
  checkAuthentication,
  isSeller,
} = require("../middleware/checkAuthentication");
const router = express.Router();

router.get("/product", fetchData);
router.post("/product", checkAuthentication, isSeller, createProduct);
router.put("/product", checkAuthentication, isSeller, updateProduct);
router.delete("/product/:id", checkAuthentication, isSeller, deleteProduct);

module.exports = router;
