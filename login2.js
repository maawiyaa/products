// Product form handling
const productForm = document.getElementById('productForm');
if (productForm) {
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('productName').value;
        const productionDate = document.getElementById('productionDate').value;
        const expiryDate = document.getElementById('expiryDate').value;

        const product = {
            name: productName,
            productionDate: productionDate,
            expiryDate: expiryDate
        };

        // Fetch existing products from LocalStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];

        // Add the new product to the products array
        products.push(product);

        // Save updated products to LocalStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Reload the product list
        loadProducts();

        // Reset the form
        productForm.reset();
    });
}

// Load products from LocalStorage and display them in the table
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    productsTable.innerHTML = ''; // Clear the table before adding new rows

    // Loop through the products and add them to the table
    products.forEach(product => {
        const newRow = productsTable.insertRow();
        newRow.innerHTML = `
                <td>${product.name}</td>
                <td>${product.productionDate}</td>
                <td>${product.expiryDate}</td>
                <td>${getStatus(product.expiryDate)}</td>
            `;
    });
}

// Determine product status (near expiry or active)
function getStatus(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry - today <= 7 * 24 * 60 * 60 * 1000 ? 'Near Expiry' : 'Active';
}

// Function to clear all data from LocalStorage
const clearDataButton = document.getElementById('clearData');
if (clearDataButton) {
    clearDataButton.addEventListener('click', function () {
        if (confirm("Are you sure you want to clear all products?")) {
            localStorage.removeItem('products'); // Remove 'products' from LocalStorage
            loadProducts(); // Reload the empty table
            alert("All products have been cleared.");
        }
    });
}

// Load products when the page loads
loadProducts();
