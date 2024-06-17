const express = require("express");
const sql = require("mssql");
const app = express();
const { config } = require("./config");
const appPool = new sql.ConnectionPool(config);
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const url = process.env.URL;
const PORT = process.env.PORT;
const { auth } = require("./auth");

appPool.connect().then(function (pool) {
  // app.locals.db = pool;
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(url + "/login", require("./routes/Login"));
app.use(url + "/server", require("./routes/Server"));
app.use(url + "/posts", auth, require("./routes/Posts"));
