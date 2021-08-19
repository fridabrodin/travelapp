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

// // What we need to create an URL from Pixabay API
// let base3URL = "https://pixabay.com/api/?key=";
// const pixKey = "&key=" + process.env.PIXABAY_KEY;
// let search = "&q=";
// let photo = "&image_type=photo";

app.post("/api", async(req, res) => {
  console.log("I got a request!");
  console.log(req.body);

  // Get latitude, longitude and country from Geonames
  try {
      const res = await fetch(baseURL + req.body.news + url + username);
      let data = await res.json();
      projectData = data;
  }
  catch(error) {
      console.log("error",error);
  }

  // The parts we need from the first API to proceed with the second
  const lat = projectData.geonames[0].lat;
  let long = projectData.geonames[0].lng;
  let country = projectData.geonames[0].countryName;

  //What we need for our countdown
  let travelDate = new Date(req.body.travelDate);
  let today = new Date();
  let distance = travelDate - today;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  if (days < 7) {

    // Get the current weather and send back to client
    fetch(base1URL + lat + longurl + long + key)
    .then(res => res.json())
    .then((json) => {

      const current = {
        city: json.data[0].city_name,
        description: json.data[0].weather.description,
        temp: json.data[0].temp,
        days: days + 1,
      };
      console.log(current);
      res.send(current);
    });


    // fetch(base3URL + pixKey + search + country + photo)
    // .then(res => res.json())
    // .then(data => console.log(data))


  } else {

    //Get predicted weather and send back to client
    console.log("nope");
    fetch(base2URL + lat + longurl + long + key)
    .then(res => res.json())
    .then((json) => {
      const predicted = {
        city: json.city_name,
        description: json.data[8].weather.description,
        temp: json.data[8].temp,
        days: days + 1,
      };
      console.log(predicted);
      res.send(predicted);
    });
  }


}
);