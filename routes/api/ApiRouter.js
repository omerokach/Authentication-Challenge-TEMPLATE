const express = require("express");
const router = express.Router();
const { apiInformation_get } = require("../routesControllers/apiControllers");

router.get("/v1/information", apiInformation_get);

module.exports = router;
