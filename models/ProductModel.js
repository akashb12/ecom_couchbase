var uuid = require("uuid");
const { bucket, cluster } = require("../config");
const collection = bucket.collection("Products");

function ProductModel() {}
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

// get single product
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
    if (!result.rows.length) {
      callback({ message: "product not found" }, null);
    }
    callback(null, result.rows[0]);
  });
};

// create product
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

// update product
ProductModel.updateProduct = function (data, callback) {
  var jsonObject = {
    name: data.name,
    description: data.description,
    price: data.price,
    userId: data.userId,
  };
  var documentId = data.id;

  collection.upsert(documentId, jsonObject, function (error, result) {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, { message: "success", data: result });
  });
};

// delete product
ProductModel.deleteProduct = function (id, callback) {
  collection.remove(id, function (error, result) {
    if (error) {
      return callback(error, null);
    }
    callback(null, result);
  });
};

module.exports = ProductModel;
