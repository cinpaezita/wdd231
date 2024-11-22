// chamber.js
import { setupMenuToggle } from './menuToggle.js';
import { setupWeather } from './weather.js';
import { setupDateHandler } from './dateHandler.js';
import { setupMembers } from './members.js';
import { setupSpotlight } from './spotlight.js'; 

document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();  // Menu configuration
  setupWeather();  // Weather configuration
  setupDateHandler();  // Date configuration
  setupMembers('grid');  // Show members on grid view
  setupSpotlight();  // Load and show spotlights

  const gridButton = document.querySelector('#grid');
  const listButton = document.querySelector('#list');
  const display = document.querySelector('article');

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
});
