//global var
var searchBtnEl = document.querySelector("#searchBtn");
var cityInputEl = document.querySelector("#search-form");
var recentSearch = document.querySelector("#recent-container");
var forecastEl = document.querySelector("#forecast");
var cityContainerEl = document.querySelector("#city-container");

// console.log(currentDay) 

//api key
var apiKey = "a6f4e97706bc320bc77d0f64e4111a15"
//Current weather api- need to change
// var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    

//5 Day api
var apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=&appid=" + apiKey

//prevent page from refreshing
var formSubmitHandler = function(event) {
    event.preventDefault();

//get value from input element
var city = cityInputEl.value.trim();
if (city) {
    displayCity(city);
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
} else {
    alert("Enter a City");
}

};


//get forecast from api- put api inside this function
var getForecast = function(lat, lon) {
    //input city, lat & lon parameters
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrl) 
    .then(response => {
        if(response.ok){
            response.json()
            .then(function(data){
                console.log(data);

                var currentDate = new Date(data.current.dt *1000).toLocaleDateString()
                var currentIcon = data.current.weather[0].icon
                var currentTemp = data.current.temp;
                var currentHumidity = data.current.humidity;
                var currentWind = data.current.wind_speed;
                var currentUVI = data.current.uvi;
                console.log(currentUVI)
                
                
                var dateEl = document.createElement("h3")
                dateEl.innerHTML=currentDate
                                
                var iconEl = document.createElement("img")
                iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + currentIcon + ".png");
                
                var tempEl = document.createElement("h4")
                tempEl.innerHTML=currentTemp
                
                var humidityEl = document.createElement("h4")
                humidityEl.innerHTML=currentHumidity

                var windEl = document.createElement("h4")
                windEl.innerHTML=currentWind
                
                var uviEl = document.createElement("h4")
                uviEl.innerHTML=currentUVI

                
                cityContainerEl.append(dateEl);
                cityContainerEl.append(iconEl);
                cityContainerEl.append(tempEl);
                cityContainerEl.append(humidityEl);
                cityContainerEl.append(windEl);
                cityContainerEl.append(uviEl);
                //var currentIcon = document.createElement
                console.log(currentUVI)
            })
        } else{
            alert("Error" + response.statusText)
        }
    })
};
getForecast();

var displayCity = function(cityName) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl2)
    .then(response => {
        if(response.ok){
            response.json()
            .then(function(data) {
                city.innerHTML = cityName
                getForecast(data.coord.lat, data.coord.lon)
            })
        }
        })
};
displayCity();


var searchedCity = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    getCity(city)
}
searchBtnEl.addEventListener('click', searchedCity);