// Requiring useful libraries
const express = require('express');

// Initializing express
const app = express();
// Setting up environment variable for a port or localhost:3000
const port = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
  res.send('This is my home display...');
});

// Starting Server
app.listen(port, () => {
  console.log(`iMakeTunesMovie is listening on port: ${port}`);
});
