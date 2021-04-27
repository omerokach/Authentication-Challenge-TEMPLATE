const express = require("express");
const router = express.Router();
const {
  userRegister_post,
  userLogin_post,
  tokenValidate_post,
  userToken_post
} = require("../routesControllers/userController");

router.post("/register", userRegister_post);
router.post("/login", userLogin_post);
router.post("/tokenValidate", tokenValidate_post);
router.post("/token", userToken_post);

module.exports = router;
