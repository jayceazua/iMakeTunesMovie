// Requiring useful modules
const path = require('path');
const express = require('express');
const http = require('http');
const https = require('https');
const hbs = require('express-handlebars');
// Initializing express
const app = express();
// Setting up environment variable for a port or localhost:3000
const port = process.env.PORT || 3000;
// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

let iMovies = 'https://itunes.apple.com/us/rss/topmovies/limit=28/json';

// Routes
app.get('/', (req, res) => {
  https.get(iMovies, (response) => {
    // The stream of data will be stored in the data variable
    let data = '';
    // A chunk of data has been recieved.
    response.on('data', (chunk) => {

      data += chunk;
    });
    // The whole response has been received. Print out the result.
    response.on('end', () => {
      let parsedData = JSON.parse(data).feed.entry
      res.render('home', {iMovies: parsedData});
    });
  }).on("error", (err) => {
    // If there is an error it will catch it and display the error on our console
    console.log("Error: " + err.message);
  });
});

app.get('/:id', (req, res) => {
  let movieId = req.params.id;
  // Could use refactoring to keep my code DRY
  https.get(iMovies, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      let parsedData = JSON.parse(data).feed.entry[movieId]
      res.render('details-movie', {iMovie: parsedData});
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


// Starting Server
app.listen(port, () => {
  console.log(`iMakeTunesMovie is listening on port: ${port}`);
});
