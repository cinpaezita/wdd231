const apiKey = '642205110a867916ffc989e3880b05b0';
const city = 'Lambare,py';
const units = 'imperial';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

async function fetchWeatherData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
}

export async function setupWeather() {
  try {
    const weatherData = await fetchWeatherData(weatherUrl);
    const forecastData = await fetchWeatherData(forecastUrl);

    const currentTemp = document.querySelector('#current-temperature');
    const currentConditions = document.querySelector('#current-conditions');
    const highTemp = document.querySelector('#high-temp');
    const lowTemp = document.querySelector('#low-temp');
    const humidity = document.querySelector('#humidity');
    const sunrise = document.querySelector('#sunrise');
    const sunset = document.querySelector('#sunset');

    currentTemp.textContent = `${weatherData.main.temp.toFixed(1)}°F`;
    currentConditions.textContent = weatherData.weather[0].description;
    highTemp.textContent = `${weatherData.main.temp_max.toFixed(1)}°F`;
    lowTemp.textContent = `${weatherData.main.temp_min.toFixed(1)}°F`;
    humidity.textContent = `${weatherData.main.humidity}%`;
    sunrise.textContent = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    sunset.textContent = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    const weatherIcon = document.querySelector('#weather-icon');
    if (weatherData.weather[0].icon) {
      weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      weatherIcon.alt = weatherData.weather[0].description;
    } else {
      weatherIcon.src = 'images/placeholder-image.svg'; 
      weatherIcon.alt = 'Weather icon not available';
    }

    const options = { weekday: 'long' };
    const todayForecast = document.querySelector('#today-forecast');
    const tomorrowForecast = document.querySelector('#tomorrow-forecast');
    const dayAfterTomorrowForecast = document.querySelector('#day-after-tomorrow-forecast');

    todayForecast.textContent = `${new Date(forecastData.list[0].dt * 1000).toLocaleDateString('en-US', options)}: ${forecastData.list[0].main.temp.toFixed(1)}°F`;
    tomorrowForecast.textContent = `${new Date(forecastData.list[8].dt * 1000).toLocaleDateString('en-US', options)}: ${forecastData.list[8].main.temp.toFixed(1)}°F`;
    dayAfterTomorrowForecast.textContent = `${new Date(forecastData.list[16].dt * 1000).toLocaleDateString('en-US', options)}: ${forecastData.list[16].main.temp.toFixed(1)}°F`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
