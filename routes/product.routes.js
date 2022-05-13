const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductDetails,
} = require("../controllers/product.controller");
const Router = express.Router;
const router = Router();
router.get("/get", getAllProducts);
router.get("/get/:id", getProductDetails);
router.post("/create", createProduct);
module.exports = router;
