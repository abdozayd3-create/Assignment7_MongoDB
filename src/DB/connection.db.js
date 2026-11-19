const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'assignment7_library';
const client = new MongoClient(uri);
const db = client.db(dbName);

const connectDB = async () => {
    await client.connect();
    console.log(`Connected successfully to MongoDB database: ${dbName}`);
};

const closeDB = async () => client.close();

module.exports = { connectDB, closeDB, db };
