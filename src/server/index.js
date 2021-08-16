const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const { response } = require('express');
const fetch = require("node-fetch");
const { resolveAny } = require('dns');

const app = express()

app.use(express.static('dist'))
app.use(express.json())

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
let baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const apiKey = process.env.API_KEY;
let url = "&url=";
let lang = "&lang=en";

app.post("/api", (req, res) => {
  console.log("I got a request!");
  console.log(req.body);

  // const results = await fetch(baseURL + apiKey + url + req.body.news + lang);
  // try {
  //   const data = await results.json();
  //   console.log(data);
  //   res.send(data);
  // } catch (error) {
  //   console.log("error:", error);
  // }


  fetch(baseURL + apiKey + url + req.body.news + lang)
  .then(res => res.json())
  .then(data => res.send(data));
}
);

