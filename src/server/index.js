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

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

//------------------------------------------------------------------------------------------------------------------------

// An empty JS object that will hold our data
let projectData = {};

// Our API keys
const geonamesUser = process.env.GEO_NAME;
const pixKey = "&key=" + process.env.PIXABAY_KEY;
const weatherbitKey = process.env.WEATHERBIT_KEY;

//Post route with API data
app.post("/api", async (req, res) => {
  console.log("I got a request!");
  console.log(req.body);
  const userInputCity = req.body.location;

     //Pixabay images for the location
     fetch(`https://pixabay.com/api/?key=${pixKey}&q=${userInputCity}&image_type=photo`)
     .then(res => res.json())
     .then((json) => {

       const images = {
         image: json.hits[0].webformatURL,
       };
       projectData["images"] = images;
     });

  // Get latitude, longitude and country from Geonames
  try {
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${userInputCity}&maxRows=1&username=${geonamesUser}`);
    let data = await res.json();
    projectData = data;
  }
  catch (error) {
    console.log("error", error);
  }

  //The parts we need from the first API to proceed with the second
  const lat = projectData.geonames[0].lat;
  let long = projectData.geonames[0].lng;
  let country = projectData.geonames[0].countryName;

    //Information about the country the user is going to
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then((json) => {
      const countryInfo = {
        region: json[0].subregion,
        country: json[0].name,
        population: json[0].population,
        flag: json[0].flag,
      };
      projectData["countryInfo"] = countryInfo;
    });

  //What we need for our countdown
  let travelDate = new Date(req.body.travelDate);
  let today = new Date();
  let distance = travelDate - today;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let weather;

  if (days < 7) {

    // Get the current weather and send back to client
    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${weatherbitKey}`)
      .then(res => res.json())
      .then((json) => {

        weather = {
          city: json.data[0].city_name,
          description: json.data[0].weather.description,
          temp: json.data[0].temp,
          days: days + 1,
        };
        projectData["weather"] = weather;
        res.send(projectData);
      });


  } else {

    //Get predicted weather and send back to client
    console.log("nope");
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${weatherbitKey}`)
      .then(res => res.json())
      .then((json) => {
        weather = {
          city: json.city_name,
          description: json.data[8].weather.description,
          temp: json.data[8].temp,
          days: days + 1,
        };
        projectData["weather"] = weather;
        res.send(projectData);
      });
  }

});
