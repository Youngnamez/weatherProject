// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8080, function() {
    console.log("server running on port 8080");
});

app.get("/getWeatherData", function getWeatherData(req, res) {
    console.log("Temperature is " + req.body.temperature);
    console.log("Date is " + req.body.date);
    console.log("User Response is " + req.body.userResponse);
    res.send(projectData);
});

app.post("/postWeatherData", function (req, res) {
    console.log("req \n")
    console.log(req.body)
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    console.log(projectData);
});

