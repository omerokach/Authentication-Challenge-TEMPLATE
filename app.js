/* write your server code here */
const express = require("express");
const UserRouter = require("./routes/user/UserRouter");
const api = require("./routes/api/ApiRouter");
const UserRegister = require("./routes/user/UserRouter");
const app = express();

app.use(express.json());

app.use("/users", UserRouter);
app.use("/api", api)
module.exports = app;