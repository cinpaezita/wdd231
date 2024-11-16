document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '642205110a867916ffc989e3880b05b0';
    const city = 'Lambare,py';
    const units = 'imperial'; // Cambiado a Fahrenheit

    // **Hamburger Menu Toggle**
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });


    // **Weather Data Fetching**
    async function getWeatherData() {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

        try {
            // Current Weather
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            // Update Current Weather
            document.getElementById("current-temperature").textContent = `${weatherData.main.temp.toFixed(1)}°F`;
            document.getElementById("current-conditions").textContent = weatherData.weather[0].description;
            document.getElementById("high-temp").textContent = `${weatherData.main.temp_max.toFixed(1)}°F`;
            document.getElementById("low-temp").textContent = `${weatherData.main.temp_min.toFixed(1)}°F`;
            document.getElementById("humidity").textContent = `${weatherData.main.humidity}%`;
            document.getElementById("sunrise").textContent = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById("sunset").textContent = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

            // Forecast
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

            // Update forecast
            const today = forecastData.list[0];
            const wednesday = forecastData.list[8]; // 3 hours per record -> 8 records ≈ 1 day later
            const thursday = forecastData.list[16]; // 16 records ≈ 2 days later

            document.getElementById("today-forecast").textContent = `${today.main.temp.toFixed(1)}°F`;
            document.getElementById("wednesday-forecast").textContent = `${wednesday.main.temp.toFixed(1)}°F`;
            document.getElementById("thursday-forecast").textContent = `${thursday.main.temp.toFixed(1)}°F`;
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Call function
    getWeatherData();

    // **Current Year and Last Modified**
    const currentYearElement = document.getElementById("currentyear");
    const lastModifiedElement = document.getElementById("lastModified");

    currentYearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;


    
// Members of Chambers of Commerce
async function fetchMembers() {
    const response = await fetch('./data/members.json');
    const members = await response.json();
    return members;
  }
  
  function createGridView(member) {
    return `
      <div class="member-card">
        <img src="./images/${member.image}" alt="${member.name}">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        <p>${member.description}</p>
      </div>
    `;
  }
  
  function createListView(member) {
    return `
      <div class="list">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
      </div>
    `;
  }
  
  async function displayMembers(view = 'grid') {
    const members = await fetchMembers();
    const container = document.querySelector('article');
    container.innerHTML = members.map(view === 'grid' ? createGridView : createListView).join('');
  }
  
  const gridButton = document.querySelector('#grid');
  const listButton = document.querySelector('#list');
  const display = document.querySelector('article');
  
  gridButton.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
    displayMembers('grid');
  });
  
  listButton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
    displayMembers('list');
  });
  
  // Default display
  displayMembers('grid');
  
});



