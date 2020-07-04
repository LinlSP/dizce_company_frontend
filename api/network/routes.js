const free = require("../components/free/network");
const personalized = require("../components/personalized/network");

const routes = function (server) {
  server.use("/free", free);
  server.use("/personalized", personalized);
};

module.exports = routes;
