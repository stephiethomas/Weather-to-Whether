//global var
var searchBtnEl = document.querySelector("#searchBtn");
var cityInputEl = document.querySelector("#search-form");
var recentSearch = document.querySelector(".cities");
var forecastEl = document.querySelector("#forecast");
var cityContainerEl = document.querySelector("#city-container");



// console.log(currentDay) 

//api key
var apiKey = "a6f4e97706bc320bc77d0f64e4111a15"
//Current weather api- need to change
// data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    



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
                // console.log(currentUVI)
                
                
                var dateEl = document.createElement("h3");
                dateEl.innerHTML = 'Date: '  + currentDate;
                                
                var iconEl = document.createElement("img")
                iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + currentIcon + ".png");
                
                var tempEl = document.createElement("h4");
                tempEl.innerHTML = "Temp: "  + currentTemp + "\u00B0F";
                
                var humidityEl = document.createElement("h4")
                humidityEl.innerHTML = "Humidity: "  + currentHumidity;

                var windEl = document.createElement("h4")
                windEl.innerHTML = "Wind: "  + currentWind;
                
                var uviEl = document.createElement("h4")
                uviEl.innerHTML ="UV Index: "  +  currentUVI;

                
                cityContainerEl.append(dateEl);
                cityContainerEl.append(iconEl);
                cityContainerEl.append(tempEl);
                cityContainerEl.append(humidityEl);
                cityContainerEl.append(windEl);
                cityContainerEl.append(uviEl);
                //var currentIcon = document.createElement
                // console.log(currentUVI)

                //5 Day Forecast

                for (let i = 0; i < 5; i++) {
                    var dailyDate = new Date(data.daily[i].dt * 1000);
                    var dailyImg = data.daily[i].weather[0].icon;
                    var dailyTemp = data.daily[i].temp.day;
                    var dailyHumidity = data.daily[i].humidity;
                    var dailyWind  = data.daily[i].wind_speed;
                    var dailyUVI = data.daily[i].uvi;

                    var dailyContainer = document.createElement("div");
                    var dateDaily = document.createElement("h3");
                    var dailyIcon = document.createElement("img");
                    var tempDaily = document.createElement("p");
                    var windDaily = document.createElement('p');
                    var humidityDaily = document.createElement("p");

                    dailyContainer.className = "container"
                    dateDaily.innerHTML = '(' + dailyDate.toLocaleDateString() +')';
                    dailyIcon.setAttribute("src","http://openweathermap.org/img/wn/" + dailyImg + ".png");
                    dailyIcon.setAttribute('alt', "weather icon");
                    tempDaily.innerHTML = "Temp: " + dailyTemp + "\u00B0F";

                }

            })
        } else{
            alert("Error" + response.statusText)
        }
    })
};


var displayCity = function(cityName) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl2)
    .then(response => {
        if(response.ok){
            response.json()
            .then(function(data) {
                console.log(data)
             var cityEl = document.createElement("li")
             cityEl.innerText=cityName
             recentSearch.appendChild(cityEl);
            
                getForecast(data.coord.lat, data.coord.lon)
            })
        }
        })
};



var searchedCity = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    console.log(city)
    displayCity(city)
}
searchBtnEl.addEventListener('click', searchedCity);