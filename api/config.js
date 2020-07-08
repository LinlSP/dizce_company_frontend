const config = {
  dbUriClient: process.env.DB_URI_CLIENT,
  dbUriCompany: process.env.DB_URI_COMPANY,
  port: process.env.PORT || 5000,
  host: process.env.HOST || "http://localhost",
};

module.exports = config;
