var uuid = require("uuid");
const { cluster } = require("../config");
const config = require("../config");
const bucket = config.bucket;
const collection = bucket.scope("_default").collection("Users");
function UserModel() {}
// user details
UserModel.getUserDetails = function (id, callback) {
  collection.get(id, function (error, result) {
    if (error) {
      return callback(error, null);
    }
    callback(null, result);
  });
};

// save user
UserModel.saveUser = function (data, callback) {
  var jsonObject = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
  };
  var documentId = uuid.v4();

  collection.insert(documentId, jsonObject, function (error, result) {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, { message: "success", data: result });
  });
};

// get my products
UserModel.getUserProducts = function (id, callback) {
  const statement =
    "SELECT userData,products FROM ecom._default.Users userData " +
    "NEST ecom._default.Products products on META(userData).id=products.userId ";
  cluster.query(statement, function (error, result) {
    if (error) {
      return callback(error, null);
    }
    callback(null, result.rows);
  });
};

module.exports = UserModel;
