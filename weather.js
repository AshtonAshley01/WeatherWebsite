const apiKey = 'fa06d6ed50a88ad415fa21bc289b82b8';

const submitButton = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastWeatherDiv = document.getElementById('forecast-weather');

submitButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location.trim() === '') {
        alert('Please Enter a Location');
        return;
    }

    fetchWeather(location);
});

async function fetchWeather(location) {
    try {
        // Fetch Current weather data
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        const currentWeatherResponse = await fetch(currentWeatherURL);
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch Forecast weather data
        const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const forecastWeatherResponse = await fetch(forecastWeatherURL);
        const forecastWeatherData = await forecastWeatherResponse.json();

        // Display Current Weather
        displayCurrentWeather(currentWeatherData);

        // Display Forecast Weather
        displayForecastWeather(forecastWeatherData);
    } catch (error) {
        console.log('Error: ', error);
        alert('An Error occurred while fetching weather data');
    }
}

function displayCurrentWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const dateTime = new Date(data.dt * 1000).toLocaleString();
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${location}</h2>
        <p>${dateTime}</p>
        <p></p>
        <h1>${temperature} °C</h1>
        <p>${weatherDescription}</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Humidity: ${humidity}%</p>
    `;
}


function displayForecastWeather(data) {
    const forecast = data.list;
    let forecastHTML = '<h3>Forecast Weather</h3>';

    forecast.forEach(day => {
        const date = day.dt_txt;
        const maxTempC = day.main.temp_max;
        const minTempC = day.main.temp_min;
        const condition = day.weather[0].description;

        forecastHTML += `
            <p>Date: ${date}</p>
            <p>Max Temperature: ${maxTempC}°C</p>
            <p>Min Temperature: ${minTempC}°C</p>
            <p>Condition: ${condition}</p>
            <hr>
        `;
    });

    forecastWeatherDiv.innerHTML = forecastHTML;
}
