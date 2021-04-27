const { USERS, INFORMATION, REFRESHTOKENS } = require("../../DB/main");
const bcrypt = require("bcrypt");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

module.exports.apiInformation_get = async (req, res) => {
  const token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }
  jwt.verify(token, "Rc123456!", (err, decodedToken) => {
    if (err) {
      res.status(403).send("Invalid Access Token");
    } else {
      let user;
      const body = [];
      INFORMATION.forEach((userInfo) => {
        if (userInfo.email === decodedToken.user.email) {
          user = userInfo;
        }
      });
      body.push(user);
      res.status(200).json(body);
    }
  });
};

module.exports.apiUsers_get = async (req, res) => {
  const token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }
  jwt.verify(token, "Rc123456!", (err, decodedToken) => {
    if (err) {
      res.status(403).send("Invalid Access Token");
    } else {
      res.status(200).json(USERS);
    }
  });
};
