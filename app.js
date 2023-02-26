// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an instance of the Express app
const app = express();

// Set up middleware to parse JSON data in the request body
app.use(bodyParser.json());

// Endpoint to handle login requests
app.post('/login', (req, res) => {
  // Read user data from JSON file
  const userData = JSON.parse(fs.readFileSync('users.json'));

  // Extract username and password from request body
  const { username, password } = req.body;

  // Find user with matching username and password
  const user = userData.find(u => u.username === username && u.password === password);

  // If user exists, return success message
  if (user) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
