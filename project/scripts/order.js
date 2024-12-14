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

        // Add event listener to update order summary on quantity change
        const quantityInput = document.getElementById(`quantity-${cookie.id}`);
        quantityInput.addEventListener('input', () => {
            updateOrderSummary(cookies);
        });
    });

    // Dynamic order summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'order-summary';
    container.appendChild(summaryDiv);
    updateOrderSummary(cookies); // Initial summary update

    // Submit event for order form
    const orderForm = document.querySelector('form');

    // Create feedback modal
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

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isValid = validateForm(cookies);
        const messageElement = document.getElementById('modal-message');

        if (!isValid) {
            messageElement.textContent = 'Please select at least one product to order.';
            modal.showModal();
        } else {
            messageElement.textContent = 'Your order has been submitted successfully!';
            modal.showModal();

            setTimeout(() => {
                closeModal();
                generateOrderDetails(cookies);
                orderForm.reset(); // Reset the form after submission
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
    // Validate at least one product selected
    const hasSelectedProducts = cookies.some(cookie => {
        const quantity = parseInt(document.getElementById(`quantity-${cookie.id}`).value, 10);
        return quantity > 0;
    });

    return hasSelectedProducts;
};

// Generate order details and save to localStorage
export const generateOrderDetails = (cookies) => {
    const customerDetails = {
        first: document.querySelector('input[name="first"]').value.trim(),
        last: document.querySelector('input[name="last"]').value.trim(),
        phone: document.querySelector('input[name="phone"]').value.trim(),
        email: document.querySelector('input[name="email"]').value.trim(),
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
    window.location.href = 'order-summary.html'; // Redirect to summary page
};

// Set up the order page on load
export const setupOrderPage = async () => {
    const cookies = await fetchCookies();
    renderCookies(cookies);
};