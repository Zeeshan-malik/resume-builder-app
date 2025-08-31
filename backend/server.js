// First, we import all the packages we installed earlier.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// We load our environment variables from the .env file.
// This is a critical security practice to keep sensitive data out of our code.
dotenv.config();

// Initialize the Express app.
const app = express();

// We use Express middleware to parse incoming JSON data and enable CORS.
// This allows our frontend to communicate with our backend.
app.use(express.json());
app.use(cors());

// Define a simple route to make sure our server is working.
// This is called a "home" or "root" route.
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Now, we connect to our MongoDB database.
// We use the MONGO_URI from our .env file.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, we log the error and exit the process.
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Call the function to connect to the database.
connectDB();

// We define the port from our environment variables.
const PORT = process.env.PORT || 5000;

// Finally, we start our server and listen for incoming requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
