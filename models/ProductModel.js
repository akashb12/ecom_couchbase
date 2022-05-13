var uuid = require("uuid");
const { bucket, cluster } = require("../config");
const collection = bucket.collection("Products");

function ProductModel() {}
ProductModel.createProduct = function (data, callback) {
  const jsonObj = {
    name: data.name,
    description: data.description,
    userId: data.userId,
    price: data.price,
  };
  const documentId = uuid.v4();
  collection.insert(documentId, jsonObj, function (error, result) {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, { message: "success", data: result });
  });
};

// get all products
ProductModel.getAllProducts = function (callback) {
  const statement =
    "SELECT product.name, product.description, product.price, META(product).id, product.userId,userData FROM ecom._default.Products product " +
    "JOIN ecom._default.Users As userData on product.userId=META(userData).id ";
  cluster.query(statement, function (error, result) {
    if (error) {
      return callback(error, null);
    }
    callback(null, result.rows);
  });
};

// get songle product
ProductModel.getProductDetails = function (id, callback) {
  var statement =
    "SELECT product.name, product.description, product.price, META(product).id, product.userId,userData " +
    "FROM ecom._default.Products AS product " +
    "JOIN ecom._default.Users As userData on product.userId=META(userData).id " +
    "WHERE META(product).id=$id";
  const options = { parameters: { id: id } };
  cluster.query(statement, options, function (error, result) {
    if (error) {
      return callback(error, null);
    }
    callback(null, result.rows);
  });
};
module.exports = ProductModel;
