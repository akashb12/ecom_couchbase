const UserModel = require("../models/UserModel");

module.exports.getUserData = async function (req, res) {
  const id = req.params.id;
  UserModel.getUserDetails(id, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

// add user
module.exports.createUser = async function (req, res) {
  UserModel.saveUser(req.body, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};

// get user products
module.exports.getUserProducts = async function (req, res) {
  const id = req.params.id;
  UserModel.getUserProducts(id, function (error, result) {
    if (error) {
      return res.status(400).send(error);
    }
    res.json(result);
  });
};
