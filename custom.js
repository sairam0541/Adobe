const mob_nav_icon = document.querySelector(".mobile-nav-icon");
const mob_nav_wrap = document.querySelector(".header-menu");
const mob_nav_close = document.querySelector(".close");
document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productsList");
  const productCount = document.getElementById("product-count");
  const sortDropdown = document.getElementById("sort");
  const categoryCheckboxes = document.querySelectorAll(
    ".categories .form-group input[type='checkbox']"
  );

  let products = []; // Original products from API
  let filteredProducts = []; // Filtered products based on user input

  // Fetch products from Fake Store API
  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      products = await response.json();
      filteredProducts = products; // Initially, show all products
      displayProducts(filteredProducts);
      productCount.textContent = `${filteredProducts.length} Results`;
    } catch (error) {
      console.error("Error fetching products:", error);
      productCount.textContent = "Failed to load products.";
    }
  }

  // Function to display products in the grid
  function displayProducts(productList) {
    productGrid.innerHTML = ""; // Clear previous products
    productList.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-box";

      productCard.innerHTML = `
        <div class="image">
        <a href="product-details.html">
        <img src="${product.image}" alt="${product.title}" /></a></div>
             <h3>${product.title.substring(0, 20)}...</h3>

        <div class="price">$${product.price}</div>
        <div class="icon-product-list"><img src="images/heart-icon.png"</div>
       
      `;

      productGrid.appendChild(productCard);
    });
  }

  // Filtering products based on category
  function filterProducts() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) =>
        checkbox.getAttribute("data-value").trim().toLowerCase()
      );

    if (selectedCategories.length > 0) {
      filteredProducts = products.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    } else {
      filteredProducts = products; // No filters applied, show all products
    }

    displayProducts(filteredProducts);
    productCount.textContent = `${filteredProducts.length} Results`;
  }

  // Sorting products
  function sortProducts() {
    const selectedOption = sortDropdown.value;

    if (selectedOption === "price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "name") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayProducts(filteredProducts);
  }

  // Event listeners
  sortDropdown.addEventListener("change", sortProducts);
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
  });

  // Initial Fetch
  fetchProducts();
});
function toggleFilterPanel() {
  const filterPanel = document.getElementById("filter-panel");
  filterPanel.classList.toggle("open");
}

/* ******************* CATEGORIES / FILTERS : SHOW HIDE ******************* */

const filtersBtn = document.getElementById("filter-clickon");

filtersBtn.addEventListener("click", function () {
  document.getElementById("categories-wrapper").style.display = "block";
});

const filtersClose = document.getElementById("filters-close");

filtersClose.addEventListener("click", function () {
  document.getElementById("categories-wrapper").style.display = "none";
});

/* *******************  ******************* */
/* *******************  ******************* */

mob_nav_icon.addEventListener("click", () => {
  // alert("hi");
  mob_nav_wrap.classList.add("show_nav_mob");
});

mob_nav_close.addEventListener("click", () => {
  mob_nav_wrap.classList.remove("show_nav_mob");
});
