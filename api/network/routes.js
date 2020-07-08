const client = require("../components/client/router");
const company = require("../components/company/router");

const routes = function (server) {
  server.use("/client", client);
  server.use("/company", company);
};

module.exports = routes;
