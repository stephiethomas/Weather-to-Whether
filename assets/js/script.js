//global var
var searchBtnEl = document.querySelector("#searchBtn");
var cityInputEl = document.querySelector("#search-form");
var recentSearch = document.querySelector("#recent-container");
var forecastEl = document.querySelector("#forecast");
var cityContainerEl = document.querySelector("#city-container");
var currentDay = new Date;
console.log(currentDay) 

//api key
var apiKey = "a6f4e97706bc320bc77d0f64e4111a15"
var lat = "29.7604"
var lon = "-95.3698"
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=29.7604&lon=-95.3698&appid=a6f4e97706bc320bc77d0f64e4111a15"

//prevent page from refreshing
var formSubmitHandler = function(event) {
    event.preventDefault();

//get value from input element
var city = cityInputEl.ariaValueMax.trim();
if (city) {
    displayCity(city);
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
} else {
    alert("Enter a City");
}

};


//get forecast from api
var getForecast = function() {
    fetch(apiUrl)
    .then(res => {
        res.json()
        .then(function(data) {
            console.log(data);
            displayCity(data);
            //append to container
          
        });
    });
};
getForecast();

//display city
var displayCity = function(city, searchInfo) {


}

