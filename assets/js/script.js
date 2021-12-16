// global variables
const search = document.querySelector("#search");
const historyEl = document.querySelector("#searchHistory");
const forecast = document.querySelector("#todaysForecast");
const fiveday = document.querySelector("#fiveDay");
const inputEl = document.querySelector("#searched");
const buttonEl = document.querySelector("#searchBtn");

//api key
const apiKey = "a6f4e97706bc320bc77d0f64e4111a15"

const getForecast = (city, lat, lon) => {
    //api call for weather information
    const apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}+&units=imperial&exclude={minutely,hourly,alert}&appid=" + apiKey;
    //fetching information from api call
    fetch(apiUrl)
    .then(function (response){
        if (response.ok) {
            response.json()
            .then(function(data){
                // adding data into variables
                let curDate = new Date(data.current.dt * 1000);
                let curImg = data.current.weather[0].icon;
                let curTemp = data.current.temp;
                let curWind = data.current.wind_speed;
                let curHumidity = data.current.humidity;
                let curFeelLike = data.current.feels_like;
                let curUvIndex = data.current.uvi;
                
                const today = document.createElement("h3")
                today.innerHTML - city + '(' + curDate.toLocaleDateString() +')';
                forecast.append(today);
            
                // Set img attribute


                
            
            })
        }
    })
}