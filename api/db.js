const MongoClient = require("mongodb").MongoClient;
async function connectDB(uri, clusterName) {
  const mongo = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await mongo.connect();
  if (db !== undefined) {
    console.log(`Successfuly connected to ${clusterName} cluster`);
    return db;
  }

  return Promise.reject("Problem with DB connection");
}

module.exports = connectDB;
