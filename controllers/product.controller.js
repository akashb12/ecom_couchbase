const ProductModel = require("../models/ProductModel");

module.exports.createProduct = async function (req, res) {
  const data = req.body;
  ProductModel.createProduct(data, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

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
