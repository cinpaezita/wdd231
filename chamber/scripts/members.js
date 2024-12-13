
async function fetchMembers() {
    const response = await fetch('./data/members.json');
    if (!response.ok) throw new Error("Failed to fetch members data");
    return response.json();
  }
  
  function createGridView(member) {
    return `
      <div class="member-card">
        <img src="./i// members.jsmages/${member.image}" alt="${member.name}" width="150" height="150">
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
  
  export async function setupMembers(view = 'grid') {
    try {
      const members = await fetchMembers();
      const container = document.querySelector('article');
      container.innerHTML = members.map(view === 'grid' ? createGridView : createListView).join('');
    } catch (error) {
      console.error("Error displaying members:", error);
    }
  }
  
  export async function loadMembers(container, viewType = 'grid') {
    const response = await fetch('members.json');
    const members = await response.json();
  
    // Clear container
    container.innerHTML = '';
  
    // Populate members based on view type
    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card', viewType);
  
      memberCard.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
  
      container.appendChild(memberCard);
    });
  }
  