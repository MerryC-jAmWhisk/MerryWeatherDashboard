var city_name = encodeURI(document.querySelector('input').value)
var city = document.querySelector('input').value
var API_key = '542559bf8f1de85b7659a97261de20e1'
var api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + API_key

console.log(api)
var currentEl = document.getElementById('current')
var forecastEl = document.getElementById('forecast')

var today = moment().format("MM/DD/YYYY")

// shows all necessary weather info
function getWeather() {
    
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
            const name = document.createElement('h2')
            const img = document.createElement('img')
            img.setAttribute('class', 'icon');
            img.setAttribute('src', ' http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png');
            name.textContent = city;
            name.appendChild(img);
            const p1 = document.createElement('p')
            p1.textContent = 'Temp: ' + data.current.temp + ' °F'; 
            const p2 = document.createElement('p')
            p2.textContent = 'Wind: ' + data.current.wind_speed + ' MPH'; 
            const p3 = document.createElement('p')
            p3.textContent = 'Humidity: ' + data.current.humidity + ' %'; 
            const p4 = document.createElement('p')
            p4.textContent = 'UV Index: ' + data.current.uvi;
            currentEl.append(name,p1,p2,p3,p4);
            

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


//one card with the current weather (dynamic), append and use current weather object
//for loop for the 5 day forecast, current day is 0, so loop from index 1 (i<6)
//within the for loop create dynamic cards
//save the input value in local storage and creat a button/card that display the name and get weather data
//when click on the button get weather data from local storage






getWeather()