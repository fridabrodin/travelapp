const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const { response } = require('express');
const fetch = require("node-fetch");
const { resolveAny } = require('dns');
const cors = require('cors');
const { createSecretKey } = require('crypto');

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

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// What we need to create an URL from the Geonames API
let baseURL = "http://api.geonames.org/searchJSON?q=";
const username = process.env.API_NAME;
let url = "&maxRows=1&username=";


// What we need to create an URL from the Weatherbit API : CURRENT AND PREDICTED FORECAST
let base1URL = "https://api.weatherbit.io/v2.0/current?lat=";
let base2URL = "https://api.weatherbit.io/v2.0/forecast/daily?&lat=";
let longurl = "&lon=";
const key = "&key=" + process.env.WEATHERBIT_KEY;



app.post("/api", async(req, res) => {
  console.log("I got a request!");
  console.log(req.body);

  // fetch(baseURL + req.body.news + url + username)
  // .then(res => res.json())
  // .then(data => console.log(data));

  try {
      const res = await fetch(baseURL + req.body.news + url + username);
      let data = await res.json();
      // console.log(data);
      projectData = data;
  }
  catch(error) {
      console.log("error",error);
  }

  // The parts we need from the first API to proceed with the second
  const lat = projectData.geonames[0].lat;
  let long = projectData.geonames[0].lng;
  let country = projectData.geonames[0].countryName;

  if (req.body.travelDate == "2021-08-18") {

    // Get the current weather
    console.log("yes");
    fetch(base1URL + lat + longurl + long + key)
    .then(res => res.json())
    .then(data => res.send(data));

  } else {

    //Get predicted weather
    console.log("nope");
    fetch(base2URL + lat + longurl + long + key)
    .then(res => res.json())
    .then(data => res.send(data));

  }

}
);



// // What we need to create an URL from the Weatherbit API : PREDICTED FORECAST
// let base2URL = "https://api.weatherbit.io/v2.0/forecast/daily?&lat=";
// let longurl = "&lon=";
// const key = "&key=" + process.env.WEATHERBIT_KEY;
// let lat = json.geonames[0].lat;
// let long = json.geonames[0].lng;
// let country = json.geonames[0].countryName;


// fetch(base2URL + lat + longurl + long + key)
// .then(res => res.json())
// .then(data => console.log(data));




  // if (req.body.travelDate == "2021-08-18") {

  //   // Get the current weather
  //   console.log("yes");

  // } else {

  //   //Get predicted weather
  //   console.log("nope");

  // }
