document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    const currentDate = new Date();
    timestampField.value = currentDate.toISOString();
  
    // Membership data
    const memberships = [
        { id: 'NP', title: 'Non-Profit Membership', subtitle: 'Benefits include:', cost: 'Free', benefits: ["Plaque with mayor's stamp", "Ride on Saints Patty's Day float"] },
        { id: 'Bronze', title: 'Bronze Membership', subtitle: 'Benefits include:', cost: '$100/year', benefits: ["Special events access", "Bronze spotlight", "Monthly newsletter"] },
        { id: 'Silver', title: 'Silver Membership', subtitle: 'Benefits include:', cost: '$200/year', benefits: ["Priority support", "Silver spotlight", "Training sessions"] },
        { id: 'Gold', title: 'Gold Membership', subtitle: 'Benefits include:', cost: '$500/year', benefits: ["Event discounts", "Gold spotlight", "Annual gala invitation"] },
    ];
  
    const cardsContainer = document.querySelector('.membership-cards');
    const courseDetails = document.getElementById('courseDetails');
  
    // Generate cards
    memberships.forEach((membership) => {
        const card = document.createElement('div');
        card.className = 'membership-card';
        card.innerHTML = `
            <h3>${membership.title} Level</h3>
            <button class="modal-trigger" data-id="${membership.id}">Learn More</button>
        `;
        cardsContainer.appendChild(card);
    });
  
    // Modal functionality
    document.querySelectorAll('.modal-trigger').forEach(button => {
        button.addEventListener('click', event => {
            const membershipId = event.target.getAttribute('data-id');
            const membership = memberships.find(m => m.id === membershipId);
            
            if (membership) {
                // Populate modal content
                courseDetails.innerHTML = `
                    <button id="closeModal">❌</button>
                    <h3>${membership.title}</h3>
                    <h4>${membership.subtitle}</h4>
                    <ul>
                        ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                    <p><strong>Cost:</strong> ${membership.cost}</p>
                `;

                courseDetails.showModal();
                
                // Close modal functionality
                document.getElementById('closeModal').addEventListener('click', () => {
                    courseDetails.close();
                });
            }
        });
    });

    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        const orgTitleInput = document.querySelector('input[name="organization-title"]');
        
        // Check if the input is not empty and does not match the pattern
        if (orgTitleInput.value.trim() !== '' && !new RegExp(orgTitleInput.pattern).test(orgTitleInput.value)) {
            event.preventDefault(); // Prevent form submission
            alert("The organizational title must be at least 7 characters and can only contain letters, hyphens, and spaces."); // Show an alert
        }
    });
    
});

// Grab the entire url for this page including the attached GET values
const currentUrl = window.location.href;
// Divide the url into two halves
const everything = currentUrl.split('?');
let formData = everything[1].split('&');

function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40", "@")
        }
    }) // Represents each item as one element
    return (result);
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
    <p><strong>Application from</strong> ${show("first")} ${show("last")}</p>
    <p><strong>Business Name:</strong> ${show("organization")}</p>
    <p><strong>Your phone:</strong> ${show("phone")}</p>
    <p><strong>Your email:</strong> ${show("email")}</p>
    <p><strong>Form was submitted on</strong> ${show("timestamp")}</p>
    `



