// Toggle menu for mobile
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}

// Open car detail modal with image gallery and optional slider
function openCarModal(title, color, engine, mileage, year, images) {
  // Set modal content
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalColor").textContent = color;
  document.getElementById("modalEngine").textContent = engine;
  document.getElementById("modalMileage").textContent = mileage;
  document.getElementById("modalYear").textContent = year;

  // Build gallery
  const gallery = document.getElementById("modalGallery");
  gallery.innerHTML = ''; // Clear previous content

  images.forEach((src, index) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("slider-images");

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${title} image ${index + 1}`;
    img.classList.add(index === 0 ? "active" : ""); // Optional for slider

    imgDiv.appendChild(img);
    gallery.appendChild(imgDiv);
  });

  // Optional: Auto slider functionality
  let currentIndex = 0;
  const allImages = document.querySelectorAll('.slider-images img');
  if (allImages.length > 1) {
    setInterval(() => {
      allImages[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % allImages.length;
      allImages[currentIndex].classList.add('active');
    }, 3000); // Change image every 3 seconds
  }

  // Show modal
  const modal = document.getElementById("carModal");
  modal.classList.add("open");
}

// Close the modal
function closeModal() {
  const modal = document.getElementById("carModal");
  modal.classList.remove("open");
}

// Close modal when clicking outside of content
window.onclick = function(event) {
  const modal = document.getElementById("carModal");
  if (event.target === modal) {
    modal.classList.remove("open");
  }
}

// Search function to filter car cards
function filterCars() {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const cars = document.querySelectorAll(".car-card");

  cars.forEach(car => {
    const carName = car.getAttribute("data-name").toLowerCase();
    if (carName.includes(searchQuery)) {
      car.classList.remove("hidden");
    } else {
      car.classList.add("hidden");
    }
  });
}
