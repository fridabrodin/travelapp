// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// GET route that returns project data
app.get("/allProjectData", function (req, res) {
    res.send(projectData);
});

// POST route that adds incoming data to projectData

const data = [];

app.get("/all", function (req, res) {
    res.send(data);
    console.log(data);
});

app.post("/addWeather", addWeather);

function addWeather (req, res) {
    console.log(req.body);
    newEntry = {
        date: req.body.date,
        city: req.body.city,
        temp: req.body.temp,
        content: req.body.content,
    }
    data.push(newEntry);
    res.send(data);
  }