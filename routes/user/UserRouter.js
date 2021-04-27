const express = require("express");
const router = express.Router();
const {
  userRegister_post,
  userLogin_post,
  tokenValidate_post,
  userToken_post,
  userLogout_post
} = require("../routesControllers/userController");

router.post("/register", userRegister_post);
router.post("/login", userLogin_post);
router.post("/tokenValidate", tokenValidate_post);
router.post("/token", userToken_post);
router.post("/logout", userLogout_post);

module.exports = router;
