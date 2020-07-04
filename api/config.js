const config = {
  dbUri: process.env.DB_URI,
  port: process.env.PORT || 5000,
  host: process.env.HOST || "http://localhost",
};

module.exports = config;
