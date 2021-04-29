/* Global Variables */

// Got past cors issue with help from this link: https://forum.freecodecamp.org/t/calling-openweathermap-api-is-blocked-due-to-cors-header-access-control-allow-origin-missing/191868
// const corsUrl = "https://cors-anywhere.herokuapp.com/";
const corsUrl = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "74b94287c045bb0a932cd33e7e5d3b74";
let zipCode = "07050";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


async function getWeatherData (baseurl, zipCode, apiKey) {
    console.log("hello")
    console.log(baseurl + zipCode + ",us&appid=" + apiKey);
    const response = await fetch(baseurl + zipCode + ",us&appid=" + apiKey, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8000/',
    },
    
    mode: 'cors',
    credentials: 'same-origin', 
   });

    try {
        const newData = await response.json();
        console.log("Temperature from API is: " + newData.main.temp);
        return newData.main.temp;
    }
    catch(error) {
    console.log("error", error);
    // appropriately handle the error
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
        document.getElementById('feelings').value = updatedData.userResponse;
        document.getElementById('date').value = updatedData.date;
        document.getElementById('temp').value = updatedData.temp;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
}


document.getElementById("generate").addEventListener('click', function() {

    // leaving zip code as const variable for now
    getWeatherData(corsUrl + apiUrl, zipCode, apiKey)
    .then(function(tempResult) {
        let data = {
            temperature: tempResult,
            date: document.getElementById('date').value,
            userResponse: document.getElementById('feelings').value //big help from here: https://knowledge.udacity.com/questions/515780
        }
        console.log(data);
        postWeatherData("/postWeatherData", data) }
    )
    .then(function(result) {
        updateUIWithData("/getWeatherData", result)
    })

    // let resp = getWeatherData(corsUrl + apiUrl, zipCode, apiKey)
    // .then(function(result) {
    //     console.log(result);
    //     postWeatherData("/postWeatherData", result);
    // })
    // .then(function() {
    //     console.log("made it")
    //     updatedServerData = getWeatherAndUpdateApp("/getWeatherData");
        
    //     document.getElementById("temp").innerText = "1";
    //     document.getElementById("date").innerText = "1";
    //     document.getElementById("content").innerText = "1";
    // })
    
});