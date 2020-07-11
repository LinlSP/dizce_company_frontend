const express = require("express");
const cors = require("cors");
const router = express.Router();
require("dotenv").config();

const config = require("./config");
const connectDB = require("./db");
const routes = require("./network/routes");

const app = express();
const { dbUriClient, dbUriCompany, port, host } = config;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(router);
app.use("/api", router);

app.use(express.static("public"));

///////
app.get("/*", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});
//////
(async () => {
  try {
    const companyCluster = await connectDB(dbUriCompany, "company");
    const clientsCluster = await connectDB(dbUriClient, "client");
    app.locals.coCluster = companyCluster;
    app.locals.cliCluster = clientsCluster;
    await app.listen(port);
    console.log(`App listening on ${host}:${port}`);
  } catch (error) {
    console.log(error);
  }
})();
