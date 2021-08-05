// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// now API endpoint
app.get('/api', function (req,res) {
  let now = new Date()
  res.json({unix: now.getTime(), utc: now.toGMTString()})
})

// date API endpoint
app.get("/api/:date", function (req, res) {
  let reqDate = req.params.date.split('').every(char => char.match(/\d/)) ? new Date(parseInt(req.params.date)) : new Date(req.params.date)
  if(reqDate.toJSON())
    res.json({unix: reqDate.getTime(), utc: reqDate.toGMTString()})
  else
    res.json({error: "Invalid Date"})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
