/* Global Variables */

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "74b94287c045bb0a932cd33e7e5d3b74";

// Create a new date instance dynamically with JS
let d = new Date();
// Not sure why month comes out as the previous month and not the current
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();


async function getWeatherData (baseurl, zipCode, apiKey) {
    console.log(baseurl + zipCode + ",us&appid=" + apiKey);
    const response = await fetch(baseurl + zipCode + ",us&appid=" + apiKey);

    try {
        const newData = await response.json();
        console.log("Temperature from API is: " + newData.main.temp);
        return newData.main.temp;
    }
    catch(error) {
    console.log("error", error);
    }
}

async function postWeatherData (path, data) {
    const response = await fetch(path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8000/',
    },
    mode: 'cors',
    credentials: 'same-origin', 
    body: JSON.stringify(data),
   });
}

async function updateUIWithData(path) {
    const response = await fetch(path, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8000/',
        },
        mode: 'cors',
        credentials: 'same-origin', 
       });
    //some work to update the UI
    try {
        const updatedData = await response.json();
        console.log(updatedData);
        document.getElementById('content').innerHTML = updatedData.userResponse;
        document.getElementById('date').innerHTML = updatedData.date;
        document.getElementById('temp').innerHTML = updatedData.temperature;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
}


document.getElementById("generate").addEventListener('click', function() {
    // leaving zip code as const variable for now
    getWeatherData(apiUrl, document.getElementById('zip').value, apiKey)
    .then(function(tempResult) {
        let data = {
            temperature: tempResult,
            date: newDate,
            userResponse: document.getElementById('feelings').value //big help from here: https://knowledge.udacity.com/questions/515780
        }
        postWeatherData("/postWeatherData", data) }
    )
    .then(function(result) {
        updateUIWithData("/getWeatherData", result)
    })
});