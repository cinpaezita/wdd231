import { setupMenuToggle } from './menu.js';
import { setupDateHandler } from './date.js';
import { fetchProducts, displayProducts, showProductDetails, filterProducts } from './products.js';
import { setupOrderPage } from './order.js';

document.addEventListener("DOMContentLoaded", async () => {
    setupMenuToggle(); // Menu setup
    setupDateHandler();

    const subscriptionSection = document.getElementById('subscription-section');
    if (subscriptionSection) {
        function setDimensions() {
            if (window.innerWidth > 768) {
                // For desktop
                subscriptionSection.style.backgroundImage = "url('images/form-background.webp')";
                subscriptionSection.style.width = "1200px";
                subscriptionSection.style.height = "300px";
            } else {
                // For mobile
                subscriptionSection.style.backgroundImage = "url('images/form-background-mobile.webp')";
                subscriptionSection.style.width = "320px";
                subscriptionSection.style.height = "320px";
            }

            subscriptionSection.style.backgroundSize = "cover";
            subscriptionSection.style.backgroundPosition = "center";
        }

        // Set initial dimensions
        setDimensions();

        // Handle window resizing
        window.addEventListener('resize', setDimensions);

        const subscribeBtn = document.getElementById('subscribe-btn');
        const emailInput = document.getElementById('email-input');

        // Create a container to show error messages if it doesn't exist
        let errorMessage = document.createElement('p');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.9em';
        errorMessage.style.marginTop = '5px';
        emailInput.insertAdjacentElement('afterend', errorMessage);

        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                saveEmail(email);
                errorMessage.textContent = ''; // Clear any error messages
                alert(`Thank you for subscribing with ${email}!`); // Show an alert message
                emailInput.value = ''; // Clear the input
            } else {
                errorMessage.textContent = 'Please enter a valid email address.';
            }
        });

        // Validate email format
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Save email to localStorage
        function saveEmail(email) {
            const emailList = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
            emailList.push(email);
            localStorage.setItem('subscribedEmails', JSON.stringify(emailList));
        }
    }

    // Handle products only for catalog.html
    const productContainer = document.getElementById("productContainer");
    const productFilter = document.getElementById("productFilter");
    const productDetails = document.getElementById("productDetails");

    if (productContainer) { // Verify we're on catalog.html
        try {
            // Load products from JSON
            const products = await fetchProducts();

            // Display initial products
            displayProducts(products, productContainer, productDetails, showProductDetails);

            // Filter products when filter value changes
            productFilter.addEventListener("change", () => {
                const filterValue = productFilter.value;
                filterProducts(products, filterValue, productContainer, productDetails, displayProducts, showProductDetails);
            });
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }
    

    // Handle orders only for order.html
    const cookiesContainer = document.getElementById("cookies-container");
    if (cookiesContainer) {
        setupOrderPage(); // Initialize order page
    }

    const summaryContainer = document.getElementById('summary-container');

    if (summaryContainer) { // Verify we're on order-summary.html
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

        if (orderDetails) {
            summaryContainer.innerHTML = `
                <h2>Customer Info:</h2>
                <p>Name: ${orderDetails.customer.name} ${orderDetails.customer.lastname}</p>
                <p>Phone: ${orderDetails.customer.phone || 'N/A'}</p>
                <p>Email: ${orderDetails.customer.email || 'N/A'}</p>
                <p>Address: ${orderDetails.customer.address || 'N/A'}</p>
                
                <h2>Order Items:</h2>
                ${orderDetails.items.map(item => `<p>${item.quantity} x ${item.name} = $${item.subtotal.toFixed(2)}</p>`).join('')}
                
                <h3>Total: $${orderDetails.total.toFixed(2)}</h3>
                <p>Order Date: ${orderDetails.date}</p>
            `;
        } else {
            summaryContainer.innerHTML = '<p>No order details found.</p>';
        }
        
    }
});