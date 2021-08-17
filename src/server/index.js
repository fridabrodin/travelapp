const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const { response } = require('express');
const fetch = require("node-fetch");
const { resolveAny } = require('dns');
const cors = require('cors');

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

//------------------------------------------------------------------------------------------------------------------------


// What we need to create an URL from the API
let baseURL = "http://api.geonames.org/searchJSON?q=";
const username = process.env.API_NAME;
let url = "&maxRows=1&username=";

app.post("/api", (req, res) => {
  console.log("I got a request!");
  console.log(req.body);


  fetch(baseURL + req.body.news + url + username)
  .then(res => res.json())
  .then(data => res.send(data));
}
);