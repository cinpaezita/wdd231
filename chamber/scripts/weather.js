// weather.js
const currentTemp = document.querySelector('#current-temperature');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#current-conditions');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunriseElem = document.querySelector('#sunrise');
const sunsetElem = document.querySelector('#sunset');
const todayForecast = document.querySelector('#today-forecast');
const tomorrowForecast = document.querySelector('#tomorrow-forecast');
const dayAfterTomorrowForecast = document.querySelector('#day-after-tomorrow-forecast');

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-25.342493615788438&lon=-57.62515931089137&units=imperial&appid=642205110a867916ffc989e3880b05b0`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=-25.342493615788438&lon=-57.62515931089137&units=imperial&appid=642205110a867916ffc989e3880b05b0`;

// API
async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Tests
      return data; // Data return
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error to get data:', error);
  }
}

// Current weather
async function displayCurrentWeather() {
  // Verify if elements exits in the DOM
  if (currentTemp && weatherIcon && captionDesc && highTemp && lowTemp && humidity && sunriseElem && sunsetElem) {
    const data = await fetchWeatherData(currentWeatherUrl);

    if (data) {
      currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;F`;
      highTemp.textContent = `${data.main.temp_max.toFixed(1)}°F`;
      lowTemp.textContent = `${data.main.temp_min.toFixed(1)}°F`;
      humidity.textContent = `${data.main.humidity}%`;
      sunriseElem.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      sunsetElem.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      // Icon and description
      const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const desc = data.weather[0].description;
      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', data.weather[0].description);
      captionDesc.textContent = `${desc}`;
    }
  }
}

// Forecast
async function displayForecast() {
  if (todayForecast && tomorrowForecast && dayAfterTomorrowForecast) {
    const data = await fetchWeatherData(forecastUrl);

    if (data) {
      const today = data.list[0];
      const tomorrow = data.list[8];
      const dayAfterTomorrow = data.list[16];

      // Get the name of the day
      function getDayName(index) {
        const date = new Date(data.list[index].dt * 1000);
        const options = { weekday: 'long' };  // fullname day
        return date.toLocaleDateString('en-US', options);
      }

      todayForecast.textContent = `Today: ${today.main.temp.toFixed(1)}°F (${getDayName(0)})`;
      tomorrowForecast.textContent = `${getDayName(8)}: ${tomorrow.main.temp.toFixed(1)}°F`;
      dayAfterTomorrowForecast.textContent = `${getDayName(16)}: ${dayAfterTomorrow.main.temp.toFixed(1)}°F`;
    }
  }
}


export async function setupWeather() {
  await displayCurrentWeather();
  await displayForecast();
}
