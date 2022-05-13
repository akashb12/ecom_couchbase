const express = require("express");
const {
  getUserData,
  createUser,
  getUserProducts,
} = require("../controllers/user.controller");
const Router = express.Router;
const router = Router();
router.get("/get/:id", getUserData);
router.get("/userProducts/:id", getUserProducts);
router.post("/create", createUser);

module.exports = router;
