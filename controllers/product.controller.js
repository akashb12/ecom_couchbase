const ProductModel = require("../models/ProductModel");

// get all products
module.exports.getAllProducts = async function (req, res) {
  ProductModel.getAllProducts(function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

//get single product
module.exports.getProductDetails = async function (req, res) {
  const id = req.params.id;
  ProductModel.getProductDetails(id, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

// create product
module.exports.createProduct = async function (req, res) {
  const data = req.body;
  ProductModel.createProduct(data, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

// update product
module.exports.updateProduct = async function (req, res) {
  const data = req.body;
  ProductModel.updateProduct(data, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

// delete product
module.exports.deleteProduct = async function (req, res) {
  const id = req.params.id;
  ProductModel.deleteProduct(id, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};
