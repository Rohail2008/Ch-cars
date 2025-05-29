document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    // --- Mobile navigation toggle and auto-close (runs on all pages) ---
    mobileNavToggle.addEventListener('click', () => {
        const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileNavToggle.setAttribute('aria-expanded', !expanded);
        mainNav.classList.toggle('active'); // Toggle 'active' class for styling
        mobileNavToggle.classList.toggle('active'); // Toggle 'active' class for icon change
        // Prevent body scroll when nav is open
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile nav when a link inside it is clicked (runs on all pages)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) { // Check if nav is open
                mainNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto'; // Re-enable body scroll
            }
        });
    });


    // --- Logic specific to the Explore Cars page ---
    // Only proceed if 'car-grid' and 'car-details-modal' elements exist on the page
    const carGrid = document.getElementById('car-grid');
    const carDetailsModal = document.getElementById('car-details-modal');

    if (carGrid && carDetailsModal) { // Check if these elements exist
        const closeButton = carDetailsModal.querySelector('.close-button');
        const modalCarDetails = document.getElementById('modal-car-details');

        // Function to generate a random car image URL using Picsum
        function getRandomCarImageUrl(width = 400, height = 280, seed = Math.random()) {
            return `https://picsum.photos/seed/${seed}/id/${Math.floor(Math.random() * 100 + 1)}/${width}/${height}?gravity=south&blur=2&grayscale`;
        }

        // Generate multiple random images for the modal image slider
        function generateSliderImages(count = 4, width = 800, height = 400) {
            const images = [];
            const seeds = new Set();
            while (seeds.size < count) {
                seeds.add(Math.floor(Math.random() * 1000) + 1);
            }
            seeds.forEach(seed => {
                images.push(`https://picsum.photos/seed/${seed}/id/${Math.floor(Math.random() * 100 + 1)}/${width}/${height}?gravity=center`);
            });
            return images;
        }

        // Sample car data (only needed on explore-cars.html)
        const cars = [
            {
                id: 1,
                make: 'Audi',
                model: 'R8',
                year: 2024,
                price: 185000,
                mileage: 1500,
                description: 'Experience exhilarating performance and iconic design. A true supercar in **Vegas Yellow**.',
                fullDescription: 'The 2024 Audi R8 V10 performance quattro is a masterpiece of engineering. Its naturally aspirated V10 engine delivers breathtaking power and an unforgettable sound. This specific model features carbon ceramic brakes, magnetic ride suspension, and a Bang & Olufsen sound system. Impeccable condition, low mileage, and ready for its next thrill-seeking owner.',
                imageSeed: 'audi-r8-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            },
            {
                id: 2,
                make: 'McLaren',
                model: '720S',
                year: 2023,
                price: 299000,
                mileage: 2800,
                description: 'Sleek, aerodynamic, and incredibly fast. This **Volcano Orange** beauty is pure adrenaline.',
                fullDescription: 'This 2023 McLaren 720S redefines supercar performance. Its 4.0L twin-turbo V8 engine delivers 710 horsepower, propelling it to incredible speeds. Features include dihedral doors, carbon fiber monocoque, and advanced active aerodynamics. Full-service history, pristine interior, and ready for the track or open road.',
                imageSeed: 'mclaren-720s-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            },
            {
                id: 3,
                make: 'BMW',
                model: 'M4 Competition',
                year: 2024,
                price: 88990,
                mileage: 2100,
                description: 'Unleash raw power and precision with this vibrant **Sao Paulo Yellow** M4 Competition.',
                fullDescription: 'The 2024 BMW M4 Competition is engineered for enthusiasts. Its 3.0-liter M TwinPower Turbo inline 6-cylinder engine provides explosive acceleration. This model comes equipped with M Carbon Ceramic Brakes, M Drivers Package, and a premium leather interior. Immaculate condition, virtually new, ready for immediate delivery.',
                imageSeed: 'bmw-m4-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            },
            {
                id: 4,
                make: 'Audi',
                model: 'RS 7 Sportback',
                year: 2023,
                price: 125000,
                mileage: 6000,
                description: 'A fusion of elegance and ferocity, showcased in stunning **Tango Red Metallic**.',
                fullDescription: 'The 2023 Audi RS 7 Sportback offers breathtaking performance and cutting-edge design. Its twin-turbo V8 engine delivers immense power, complemented by quattro all-wheel drive. Inside, you\'ll find luxurious Valcona leather, Bang & Olufsen 3D sound, and a host of advanced driver assistance systems. One owner, non-smoker, meticulously maintained.',
                imageSeed: 'audi-rs7-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            },
            {
                id: 5,
                make: 'Ford',
                model: 'Mustang Shelby GT500',
                year: 2021,
                price: 79999,
                mileage: 12000,
                description: 'American muscle at its finest, commanding attention in iconic **Grabber Lime**.',
                fullDescription: 'This 2021 Shelby GT500 is a track-focused monster with a supercharged 5.2L V8 producing 760 horsepower. It features the Carbon Fiber Track Pack, Recaro leather-trimmed seats, and MagneRide damping system. This car is built for performance and turns heads everywhere it goes. Low mileage and in pristine condition.',
                imageSeed: 'shelby-gt500-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            },
            {
                id: 6,
                make: 'Chevrolet',
                model: 'Corvette Z06',
                year: 2023,
                price: 135000,
                mileage: 3000,
                description: 'The ultimate mid-engine supercar in a striking **Amplify Orange Tintcoat**.',
                fullDescription: 'The 2023 Corvette Z06 is designed to dominate. Its flat-plane crank LT6 engine revs to 8600 RPM, delivering incredible power. This Z06 comes with the Z07 package, carbon fiber wheels, and a performance exhaust. It\'s a race car for the street, offering unparalleled performance and a distinctive sound. Garage kept and in showroom condition.',
                imageSeed: 'corvette-z06-main',
                sliderImageUrls: generateSliderImages(4, 800, 400)
            }
        ];

        // Function to create a car card element
        function createCarCard(car) {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            const mainCardImageUrl = getRandomCarImageUrl(400, 280, car.imageSeed);

            carCard.innerHTML = `
                <img src="${mainCardImageUrl}" alt="${car.make} ${car.model}">
                <div class="car-details">
                    <h3>${car.year} ${car.make} ${car.model}</h3>
                    <p>${car.description}</p>
                    <p class="price">$${car.price.toLocaleString()}</p>
                    <button class="view-details-btn" data-car-id="${car.id}">View Details</button>
                </div>
            `;
            return carCard;
        }

        // Render cars to the grid
        cars.forEach(car => {
            carGrid.appendChild(createCarCard(car));
        });

        // --- Modal Logic with Image Slider ---
        let currentSlide = 0;
        let sliderImagesContainer;

        function showSlide(index) {
            const totalSlides = sliderImagesContainer.children.length;
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            sliderImagesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function createSliderHTML(imageUrls) {
            return `
                <div class="image-slider">
                    <div class="slider-images">
                        ${imageUrls.map(url => `<img src="${url}" alt="Car Image">`).join('')}
                    </div>
                    <button class="slider-nav-button prev-button">&laquo;</button>
                    <button class="slider-nav-button next-button">&raquo;</button>
                </div>
            `;
        }

        // Open the modal when "View Details" button is clicked
        carGrid.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                const carId = parseInt(event.target.dataset.carId);
                const selectedCar = cars.find(car => car.id === carId);

                if (selectedCar) {
                    modalCarDetails.innerHTML = `
                        ${createSliderHTML(selectedCar.sliderImageUrls)}
                        <h2>${selectedCar.year} ${selectedCar.make} ${selectedCar.model}</h2>
                        <p><strong>Mileage:</strong> ${selectedCar.mileage.toLocaleString()} miles</p>
                        <p>${selectedCar.fullDescription}</p>
                        <p class="modal-price">$${selectedCar.price.toLocaleString()}</p>
                        <button class="btn btn-primary" style="margin-top: 20px;">Contact Seller</button>
                    `;

                    sliderImagesContainer = modalCarDetails.querySelector('.slider-images');
                    const prevButton = modalCarDetails.querySelector('.prev-button');
                    const nextButton = modalCarDetails.querySelector('.next-button');

                    currentSlide = 0;
                    showSlide(currentSlide);

                    prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
                    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

                    carDetailsModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Close the modal when the close button (x) is clicked
        closeButton.addEventListener('click', () => {
            carDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close the modal if clicked outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === carDetailsModal) {
                carDetailsModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});




window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});




 window.addEventListener('DOMContentLoaded', function () {
    alert("🚧 This website is under construction. Please check back later!");
  });