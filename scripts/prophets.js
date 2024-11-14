// JSON data URL
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Selecting the cards container
const cards = document.querySelector('#cards');

// Fetch and display prophet data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

getProphetData();

// Function to build and display prophet cards
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements for each card
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthInfo = document.createElement('div');
    let portrait = document.createElement('img');

    // Populate the full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Configure the birth info
    birthInfo.classList.add('birth-info');
    birthInfo.innerHTML = `<p>Date of Birth: ${prophet.birthdate}</p><p>Place of Birth: ${prophet.birthplace}</p>`;

    // Configure the portrait image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append elements to card and card to the container
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};
