const { USERS, INFORMATION, REFRESHTOKENS } = require("../../DB/main");
const bcrypt = require("bcrypt");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

module.exports.getOptions_get = async (req, res) => {
    let token = req.get("Authorization");
  if(token){
    token = token.split(" ")[1];
  }

  res.set({ allow: "OPTIONS, GET, POST" });

  if (!token) {
    return res.status(200).json([
      {
        method: "post",
        path: "/users/register",
        description: "Register, Required: email, name, password",
        example: {
          body: {
            email: "user@email.com",
            name: "user",
            password: "password",
          },
        },
      },
      {
        method: "post",
        path: "/users/login",
        description: "Login, Required: valid email and password",
        example: { body: { email: "user@email.com", password: "password" } },
      },
    ]);
  }

  jwt.verify(token, "Rc123456!", (err, decodedToken) => {
    if (err) {
      res.status(200).json([
        {
          method: "post",
          path: "/users/register",
          description: "Register, Required: email, name, password",
          example: {
            body: {
              email: "user@email.com",
              name: "user",
              password: "password",
            },
          },
        },
        {
          method: "post",
          path: "/users/login",
          description: "Login, Required: valid email and password",
          example: { body: { email: "user@email.com", password: "password" } },
        },
        {
          method: "post",
          path: "/users/token",
          description: "Renew access token, Required: valid refresh token",
          example: { headers: { token: "*Refresh Token*" } },
        },
      ]);
    } else {
        console.log(decodedToken);
      if (!decodedToken.user.isAdmin) {
        res.status(200).json([ 
        { method: "post", path: "/users/register", description: "Register, Required: email, name, password", example: { body: { email: "user@email.com", name: "user", password: "password" } } },
        { method: "post", path: "/users/login", description: "Login, Required: valid email and password", example: { body: { email: "user@email.com", password: "password" } } },
        { method: "post", path: "/users/token", description: "Renew access token, Required: valid refresh token", example: { headers: { token: "\*Refresh Token\*" } } },
        { method: "post", path: "/users/tokenValidate", description: "Access Token Validation, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
        { method: "get", path: "/api/v1/information", description: "Access user's information, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
        { method: "post", path: "/users/logout", description: "Logout, Required: access token", example: { body: { token: "\*Refresh Token\*" } } },
        ]);
      } else {
        res.status(200).json(      [
            { method: "post", path: "/users/register", description: "Register, Required: email, name, password", example: { body: { email: "user@email.com", name: "user", password: "password" } } },
            { method: "post", path: "/users/login", description: "Login, Required: valid email and password", example: { body: { email: "user@email.com", password: "password" } } },
            { method: "post", path: "/users/token", description: "Renew access token, Required: valid refresh token", example: { headers: { token: "\*Refresh Token\*" } } },
            { method: "post", path: "/users/tokenValidate", description: "Access Token Validation, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
            { method: "get", path: "/api/v1/information", description: "Access user's information, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
            { method: "post", path: "/users/logout", description: "Logout, Required: access token", example: { body: { token: "\*Refresh Token\*" } } },
            { method: "get", path: "api/v1/users", description: "Get users DB, Required: Valid access token of admin user", example: { headers: { authorization: "Bearer \*Access Token\*" } } }
          ]);
      }
    }
  });
};
