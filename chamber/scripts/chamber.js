import { setupMenuToggle } from './menuToggle.js';
import { setupWeather } from './weather.js';
import { setupDateHandler } from './dateHandler.js';
import { setupMembers } from './members.js';
import { setupSpotlight } from './spotlight.js'; 

document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();  // Menu configuration
  setupDateHandler();  // Date configuration
  setupSpotlight();  // Load and show spotlights

  
  const weatherContainer = document.querySelector('.weather');
  if (weatherContainer) {
    setupWeather();  // Works only if the container exists
  }

  // Check if grid and list buttons exist in directory.html
  const gridButton = document.querySelector('#grid');
  const listButton = document.querySelector('#list');
  const display = document.querySelector('article');

  if (gridButton && listButton && display) {
    gridButton.addEventListener('click', () => {
      display.classList.add('grid');
      display.classList.remove('list');
      setupMembers('grid');
    });

    listButton.addEventListener('click', () => {
      display.classList.add('list');
      display.classList.remove('grid');
      setupMembers('list');
    });

    setupMembers('grid');  // Show members on grid default
  }
});
