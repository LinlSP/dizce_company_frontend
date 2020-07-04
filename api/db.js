const MongoClient = require("mongodb").MongoClient;

async function connectDB(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect((err) => {
    if (err) throw err;
    console.log("DB succesfully connected");
    client.close();
  });
}

module.exports = connectDB;
