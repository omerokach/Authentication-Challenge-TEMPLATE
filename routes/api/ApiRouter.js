const express = require("express");
const router = express.Router();
const { apiInformation_get,apiUsers_get } = require("../routesControllers/apiControllers");

router.get("/v1/information", apiInformation_get);
router.get("/v1/users", apiUsers_get);

module.exports = router;
