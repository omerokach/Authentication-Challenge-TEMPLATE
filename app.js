/* write your server code here */
const express = require("express");
const UserRouter = require("./routes/user/UserRouter");
const api = require("./routes/api/ApiRouter");
const UserRegister = require("./routes/user/UserRouter");
const {getOptions_get} = require('./routes/routesControllers/optionControllers')
const app = express();

app.use(express.json());

app.use("/users", UserRouter);
app.use("/api", api);

app.options('/', getOptions_get);

module.exports = app;