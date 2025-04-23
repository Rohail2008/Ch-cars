// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}

// Toggle theme (light/dark) and save preference
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme preference and initialize car events
document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Add click event to car cards
  const carCards = document.querySelectorAll(".car-card");
  carCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-name");
      const color = card.getAttribute("data-color");
      const engine = card.getAttribute("data-engine");
      const mileage = card.getAttribute("data-mileage");
      const year = card.getAttribute("data-year");
      const images = JSON.parse(card.getAttribute("data-images") || "[]");

      openCarModal(title, color, engine, mileage, year, images);
    });
  });

  // Search input listener
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", filterCars);
  }
});

// Open modal with car info and image slider
function openCarModal(title, color, engine, mileage, year, images) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalColor").textContent = color;
  document.getElementById("modalEngine").textContent = engine;
  document.getElementById("modalMileage").textContent = mileage;
  document.getElementById("modalYear").textContent = year;

  const gallery = document.getElementById("modalGallery");
  gallery.innerHTML = "";

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${title} image ${index + 1}`;
    img.classList.add(index === 0 ? "active" : "");
    gallery.appendChild(img);
  });

  startSlider(images.length);
  document.getElementById("carModal").classList.add("open");
}

// Start image slider if there are multiple images
function startSlider(imageCount) {
  const images = document.querySelectorAll("#modalGallery img");
  let current = 0;

  if (imageCount > 1) {
    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % imageCount;
      images[current].classList.add("active");
    }, 3000);
  }
}

// Close modal
function closeModal() {
  document.getElementById("carModal").classList.remove("open");
}

// Close modal when clicking outside
window.addEventListener("click", event => {
  const modal = document.getElementById("carModal");
  if (event.target === modal) {
    closeModal();
  }
});

// Filter car cards by search input
function filterCars() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const cars = document.querySelectorAll(".car-card");

  cars.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}


