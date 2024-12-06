export function setupDiscover() {
    setupVisitorMessage();
    setupLazyLoading();
}

function setupVisitorMessage() {
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    localStorage.setItem('lastVisit', currentVisit);

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysBetween < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
}

function setupLazyLoading() {
    const gallery = document.querySelector('.gallery-grid');

    const images = [
        { 
            desktop: { src: 'images/lambare-river.webp', width: 800, height: 400 }, 
            mobile: { src: 'images/lambare-river-small.webp', width: 500, height: 250 }, 
            alt: 'Buildings on the river bank', 
            title: 'Lambare River' 
        },
        { 
            desktop: { src: 'images/boat-ride.webp', width: 800, height: 400 }, 
            mobile: { src: 'images/boat-ride-small.webp', width: 500, height: 250 }, 
            alt: 'People around the boats on the river bank', 
            title: 'Boat Ride' 
        },
        { 
            desktop: { src: 'images/lambare-night.webp', width: 800, height: 400 }, 
            mobile: { src: 'images/lambare-night-small.webp', width: 500, height: 250 }, 
            alt: 'City Dusk View', 
            title: 'City Dusk' 
        },
        { 
            desktop: { src: 'images/lapacho-tree.webp', width: 800, height: 400 },
            mobile: { src: 'images/lapacho-tree-small.webp', width: 500, height: 250 },
            alt: 'Streets covered with flowering lapachos', 
            title: 'Flowered Lapacho Tree' 
        },
        { 
            desktop: { src: 'images/lambare-hill.webp', width: 800, height: 400 },
            mobile: { src: 'images/lambare-hill-small.webp', width: 500, height: 250 }, 
            alt: 'View of the city from Lambare Hill', 
            title: 'Top Down City View' 
        },
        { 
            desktop: { src: 'images/costanera.webp', width: 800, height: 400 },
            mobile: { src: 'images/costanera-small.webp', width: 500, height: 250 },
            alt: 'People walking on waterfront', 
            title: 'Walks on the Waterfront' 
        },
    ];

    images.forEach(({ desktop, mobile, alt, title }) => {
        const figure = document.createElement('figure');
        figure.classList.add('gallery-item');

        const img = document.createElement('img');
        img.setAttribute('alt', alt);
        img.setAttribute('data-src', desktop.src); // Lazy load for desktop
        img.setAttribute('data-src-mobile', mobile.src); // Lazy load for mobile
        img.classList.add('lazy-image');

        // Set explicit dimensions for CLS prevention
        img.setAttribute('width', desktop.width); // Desktop width as default
        img.setAttribute('height', desktop.height); // Desktop height as default
        img.style.aspectRatio = `${desktop.width} / ${desktop.height}`; // Keeps aspect ratio consistent

        const caption = document.createElement('figcaption');
        caption.textContent = title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });

    // Lazy loading logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Determine which source to load based on viewport width
                const isMobile = window.innerWidth <= 767;
                img.src = isMobile ? img.getAttribute('data-src-mobile') : img.getAttribute('data-src');

                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    const imagesToLoad = document.querySelectorAll('.gallery-grid img.lazy-image');
    imagesToLoad.forEach(img => observer.observe(img));
}
