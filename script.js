var API_key = '542559bf8f1de85b7659a97261de20e1'
var forecastEl = document.getElementById('forecast')
var searchEl = document.getElementById('searchBtn')
var findEl = document.getElementById('find')
var h2El = document.getElementById('name')
var imgEl = document.getElementById('img')
var p1El = document.getElementById('p1')
var p2El = document.getElementById('p2')
var p3El = document.getElementById('p3')
var p4El = document.getElementById('p4')

var today = moment().format("MM/DD/YYYY")

// shows all necessary weather info
function getWeather() {
    var city = document.getElementById('input').value
    var city_name = encodeURI(document.getElementById('input').value)
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + API_key
    
    fetch(api)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        // use lat and lon values found in the current weather api in order to use one call api
        console.log(data)
        const lat = data.coord.lat
        const lon = data.coord.lon
        
        var api2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly,minutely,alerts&appid=' + API_key

        fetch(api2)
        .then(function(res){
            return res.json()
        }).then(function(data){

            // info for the current weather card
            h2El.textContent = city;
            imgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png');
            h2El.appendChild(imgEl);
            p1El.textContent = 'Temp: ' + data.current.temp + ' °F'; 
            p2El.textContent = 'Wind: ' + data.current.wind_speed + ' MPH'; 
            p3El.textContent = 'Humidity: ' + data.current.humidity + ' %'; 
            p4El.textContent = 'UV Index: ' + data.current.uvi;
            
            // clear forecast content so each search replace previous cards
            document.getElementById('forecast').innerHTML = "";

            // loop through and create cards for the next 5 days of weather forecast
            for(let i = 1; i < 6; i++){
                console.log(data)
                const card = document.createElement('div')
                card.setAttribute('class', 'col cards');
                const head = document.createElement('h4')
                head.textContent = moment().add(i, 'days').format("MM/DD/YYYY");
                const icon = document.createElement('img')
                var iconImg = data.daily[i].weather[0].icon
                icon.setAttribute('src', ' http://openweathermap.org/img/wn/' + iconImg + '.png');
                const p1 = document.createElement('p')
                p1.textContent = 'Temp: ' + data.daily[i].temp.day + ' °F'; 
                const p2 = document.createElement('p')
                p2.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH'; 
                const p3 = document.createElement('p')
                p3.textContent = 'Humidity: ' + data.daily[i].humidity + ' %'; 
                card.append(head,icon,p1,p2,p3);
                forecastEl.appendChild(card);
            }

            return data

        })

    })

}

// save the input value in local storage and creates a button for future use
function saveCity() {
    var city = document.getElementById('input').value

    // save an empty array if nothing is saved at the start
    if(localStorage.getItem('City Names') == null) {
        localStorage.setItem('City Names', '[]');
    }

    // get newly searched city name and add it to the array
    var cityNames = JSON.parse(localStorage.getItem('City Names'))
    cityNames.push(city);
    // save newly and previously searched city names to local storage in an array
    localStorage.setItem('City Names', JSON.stringify(cityNames))
    // create button element for the cities
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.setAttribute('class', 'w-100 btn');
    btn.setAttribute('id', 'btn')
    // if the same city is searched multiple times, do not create duplicate buttons
    if() {
        findEl.appendChild(btn);
    } else {}



}
// For each city in my cityNamesArray, append a button on the page
// for loop that iterates over this array to make the buttons when the page is loaded.

//when click on the button get weather data from local storage

searchEl.addEventListener('click', getWeather)
searchEl.addEventListener('click', saveCity)