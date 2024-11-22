// spotlight.js
export async function setupSpotlight() {
    const spotlightContainer = document.querySelector('.spotlight-container');
    if (!spotlightContainer) return;  // If spotlights container does not exists, do not do anything.
  
    try {
      const response = await fetch('./data/members.json');
      const members = await response.json();
  
      // Filter to 'gold' or 'silver' members
      const filteredMembers = members.filter(member => {
        return member.membershipLevel === '3=gold' || member.membershipLevel === '2=silver';
      });
  
      // Randomly choice members
      const selectedMembers = [];
      while (selectedMembers.length < 3 && filteredMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        selectedMembers.push(filteredMembers.splice(randomIndex, 1)[0]);
      }
  
      // Create cards for selected members
      spotlightContainer.innerHTML = selectedMembers.map(member => `
        <div class="spotlight-card">
          <img src="./images/${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error("Error al cargar los miembros:", error);
    }
  }
  

  