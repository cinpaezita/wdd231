// Fetch cookies data from JSON file
export const fetchCookies = async () => {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch cookies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cookies:', error);
        return [];
    }
};

// Render cookies on the page
export const renderCookies = (cookies) => {
    const container = document.getElementById('cookies-container');

    // Create cookie items
    cookies.forEach(cookie => {
        const cookieDiv = document.createElement('div');
        cookieDiv.className = 'cookie-item';
        cookieDiv.innerHTML = `
            <img src="${cookie.image}" alt="${cookie.name}" width="300" height="200" loading="lazy">
            <div class="cookie-details">
                <h2>${cookie.name}</h2>
                <p>Price: <strong>${cookie.price}</strong></p>
                <label for="quantity-${cookie.id}">Quantity:</label>
                <input type="number" id="quantity-${cookie.id}" name="quantity-${cookie.id}" min="0" value="0">
            </div>
        `;
        container.appendChild(cookieDiv);

        // Add event listener to update the order summary
        const quantityInput = cookieDiv.querySelector(`#quantity-${cookie.id}`);
        quantityInput.addEventListener('input', () => updateOrderSummary(cookies));
    });

    // Dynamic order summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'order-summary';
    container.appendChild(summaryDiv);
    updateOrderSummary(cookies); // Initial summary update

    // Customer details form
    const orderForm = document.createElement('form');
    orderForm.className = 'order-form';
    orderForm.innerHTML = `
        <h2>Customer Details</h2>
        <label for="customer-name">First Name:</label>
        <input type="text" id="customer-name" required>
        <label for="customer-lastname">Last Name:</label>
        <input type="text" id="customer-lastname" required>
        <label for="customer-phone">Phone:</label>
        <input type="tel" id="customer-phone" required>
        <label for="customer-email">Email:</label>
        <input type="email" id="customer-email" required>
        <label for="customer-address">Address:</label>
        <textarea id="customer-address" required></textarea>
        <button type="submit" id="submit-order-btn">Submit Order</button>
    `;
    container.appendChild(orderForm);

    // Modal for feedback messages
    const modal = document.createElement('dialog');
    modal.id = 'feedback-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p id="modal-message"></p>
            <button id="close-modal">❌</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => modal.close();
    modal.querySelector('#close-modal').addEventListener('click', closeModal);


    // Submit event for order form
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(cookies)) {
            modal.showModal(); // Use showModal to open the dialog
        } else {
            const message = document.getElementById('modal-message');
            message.textContent = 'Your order has been submitted successfully!';
            modal.showModal(); 

            setTimeout(() => {
                closeModal();
                generateOrderDetails(cookies);
            }, 2000);
        }
    });
};

// Update order summary based on selected cookies
export const updateOrderSummary = (cookies) => {
    const summaryDiv = document.getElementById('order-summary');
    summaryDiv.innerHTML = '<h2>Order Summary</h2>'; // Reset content

    let total = 0;

    cookies.forEach(cookie => {
        const quantity = parseInt(document.getElementById(`quantity-${cookie.id}`).value, 10) || 0;
        if (quantity > 0) {
            const price = parseFloat(cookie.price.replace('$', ''));
            const subtotal = quantity * price;
            total += subtotal;

            summaryDiv.innerHTML += `<p>${quantity} x ${cookie.name} = $${subtotal.toFixed(2)}</p>`;
        }
    });

    summaryDiv.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
};

// Validate the form input
export const validateForm = (cookies) => {
    const modalMessage = document.getElementById('modal-message');

    const customerDetails = {
        phone: document.getElementById('customer-phone').value.trim(),
        email: document.getElementById('customer-email').value.trim(),
    };

    const phoneRegex = /^[0-9]{10,15}$/; // Numbers only, between 10-15 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

    // Validate phone number
    if (!phoneRegex.test(customerDetails.phone)) {
        modalMessage.textContent = 'Please enter a valid phone number (10-15 digits).';
        return false;
    }

    // Validate email
    if (!emailRegex.test(customerDetails.email)) {
        modalMessage.textContent = 'Please enter a valid email address.';
        return false;
    }

    // Validate at least one product selected
    const hasSelectedProducts = cookies.some(cookie => {
        const quantity = parseInt(document.getElementById(`quantity-${cookie.id}`).value, 10);
        return quantity > 0;
    });

    if (!hasSelectedProducts) {
        modalMessage.textContent = 'Please select at least one product to order.';
        return false;
    }

    return true;
};

// Generate order details and save to localStorage
export const generateOrderDetails = (cookies) => {
    const customerDetails = {
        name: document.getElementById('customer-name').value.trim(),
        lastname: document.getElementById('customer-lastname').value.trim(),
        phone: document.getElementById('customer-phone').value.trim(),
        email: document.getElementById('customer-email').value.trim(),
        address: document.getElementById('customer-address').value.trim(),
    };

    const orderItems = cookies
        .map(cookie => {
            const quantity = parseInt(document.getElementById(`quantity-${cookie.id}`).value, 10) || 0;
            if (quantity > 0) {
                const price = parseFloat(cookie.price.replace('$', ''));
                return {
                    name: cookie.name,
                    quantity,
                    subtotal: quantity * price,
                };
            }
            return null;
        })
        .filter(item => item !== null);

    const orderDetails = {
        customer: customerDetails,
        items: orderItems,
        total: orderItems.reduce((sum, item) => sum + item.subtotal, 0),
        date: new Date().toLocaleString(),
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'order-summary.html';
};

// Set up the order page on load
export const setupOrderPage = async () => {
    const cookies = await fetchCookies();
    renderCookies(cookies);
};
