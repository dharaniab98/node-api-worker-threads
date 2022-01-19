const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'insuredMe';

module.exports.dbConnection = async () => {
  try{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db;
  }catch(err){
    console.log(err);
    console.log("err in connection");
  }
}

