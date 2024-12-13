// Function to fetch data from the JSON file
async function fetchProducts() {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error("Failed to fetch products data");
    return response.json();
}

// Function to display products in the main container
function displayProducts(products, productContainer, productDetails, showProductDetails) {
    productContainer.innerHTML = ""; // Clear container
    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const imgElement = document.createElement("img");
        imgElement.src = product.image;
        imgElement.alt = product.description;
        imgElement.width = 300;
        imgElement.height = 200;

        if (index !== 0) {
            imgElement.loading = "lazy";
        }

        productCard.appendChild(imgElement);
        productCard.innerHTML += `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
        `;

        // Add event to show details on click
        productCard.addEventListener("click", () => showProductDetails(product, productContainer, productDetails));

        productContainer.appendChild(productCard);
    });
}

// Function to display product details
function showProductDetails(product, productContainer, productDetails) {
    productContainer.innerHTML = ""; // Clear container
    productDetails.className = "product-details active";
    productDetails.innerHTML = `
        <img src="${product.detailImage}" alt="${product.name}" loading="lazy" width="500" height="300">
        <h2>${product.name}</h2>
        <p>${product.detailedDescription}</p>
        <p><strong>Ingredients:</strong> ${product.ingredients}</p>
        <p><strong>Weight:</strong> ${product.weight}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <a href="order.html" target="_blank" class="buy-button">Buy Now</a>
    `;
}

// Function to filter products
function filterProducts(products, filterValue, productContainer, productDetails, displayProducts, showProductDetails) {
    if (filterValue === "all") {
        displayProducts(products, productContainer, productDetails, showProductDetails);
        productDetails.className = "product-details";
    } else {
        const filteredProducts = products.filter(product => product.id === filterValue);
        if (filteredProducts.length === 1) {
            showProductDetails(filteredProducts[0], productContainer, productDetails);
        } else {
            displayProducts(filteredProducts, productContainer, productDetails, showProductDetails);
            productDetails.className = "product-details";
        }
    }
}

// Export main functions
export { fetchProducts, displayProducts, showProductDetails, filterProducts };