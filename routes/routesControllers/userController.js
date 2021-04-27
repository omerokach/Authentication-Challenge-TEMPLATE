const { USERS, INFORMATION, REFRESHTOKENS } = require("../../DB/main");
const bcrypt = require("bcrypt");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const admin = {
  email: "admin@email.com",
  name: "admin",
  password: "Rc123456!",
  isAdmin: true,
};

// create json web token
const createToken = (user) => {
  return jwt.sign({ user }, "Rc123456!", {
    expiresIn: "10s",
  });
};
// create json web rifreshToken
const createRefreshToken = (user) => {
  return jwt.sign({ user }, "Rc123456!", {
    expiresIn: "40s",
  });
};

module.exports.userRegister_post = async (req, res) => {
  const { body } = req;
  let isExist = false;
  USERS.map((user) => {
    if (user.email === body.email) {
      isExist = true;
    }
  });
  if (isExist) {
    return res.status(409).send("user already exists");
  } else {
    const user = {
      email: body.email,
      name: body.name,
      password: hashSync(body.password, genSaltSync(10)),
      isAdmin: false,
    };
    USERS.push(user);
    INFORMATION.push({ email: body.email, info: `${body.name} info` });
    return res.status(201).send("Register Success");
  }
};

module.exports.userLogin_post = async (req, res) => {
  const { body } = req;
  let isExist = false;
  let savedUser;
  USERS.forEach((user) => {
    if (user.email === body.email) {
      isExist = true;
      savedUser = user;
    }
  });
  if (!isExist) {
    return res.status(404).send("cannot find user");
  }

  const ifPasswordCorrect = compareSync(body.password, savedUser.password);
  if (!ifPasswordCorrect) {
    return res.status(403).send("User or Password incorrect");
  }

  const token = createToken(body);
  const refreshToken = createRefreshToken(body);

  const response = {
    accessToken: token,
    refreshToken: refreshToken,
    email: savedUser.email,
    name: savedUser.name,
    isAdmin: savedUser.isAdmin,
  };

  return res.status(200).json(response);
};

module.exports.tokenValidate_post = async (req, res) => {
  const token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }
  jwt.verify(token, "Rc123456!", (err, decodedToken) => {
    if (err) {
      res.status(403).send("Invalid Access Token");
    } else {
      res.status(200).json({ valid: true });
    }
  });
};

module.exports.userToken_post = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).send("Refresh Token Required");
  }

  jwt.verify(refreshToken, "Rc123456!", async (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Invalid Refresh Token");
    } else {
      console.log(decodedToken);
      const newToken = createToken(decodedToken.user);
      return res.status(200).send({ accessToken: newToken });
    }
  });
};
