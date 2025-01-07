// const mongoose = require('mongoose');

// const dbURL = "mongodb+srv://mikhailnikulin01:He3OGE8uKAjPRWJ7@cloud.lt7k5.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=cloud";


// async function testConnection() {
//   try {
//     console.log("Attempting to connect to MongoDB Atlas...");
//     await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Connected to MongoDB Atlas successfully");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   }
// }

// testConnection();


const mongoose = require('mongoose');
const uri = "mongodb+srv://mikhailnikulin01:He3OGE8uKAjPRWJ7@cloud.lt7k5.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=cloud";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);