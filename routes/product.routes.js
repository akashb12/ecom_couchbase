const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const Router = express.Router;
const router = Router();
router.get("/get", getAllProducts);
router.get("/get/:id", getProductDetails);
router.post("/create", createProduct);
router.put("/update", updateProduct);
router.delete("/delete/:id", deleteProduct);
module.exports = router;
