document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    mobileNavToggle.addEventListener('click', () => {
        const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileNavToggle.setAttribute('aria-expanded', !expanded);
        mainNav.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });

    const carGrid = document.getElementById('car-grid');
    const carDetailsModal = document.getElementById('car-details-modal');

    if (carGrid && carDetailsModal) {
        const closeButton = carDetailsModal.querySelector('.close-button');
        const modalCarDetails = document.getElementById('modal-car-details');

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
                mainImageUrl: 'audi-r8-main.png',
                sliderImageUrls: [
                    '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
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
                mainImageUrl: 'mclaren-720s-main.png',
                sliderImageUrls: [
                      '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
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
                mainImageUrl: 'bmw-m4-main.png',
                sliderImageUrls: [
                  '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
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
                mainImageUrl: 'audi-r8-main.png',
                sliderImageUrls: [
                    '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
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
                mainImageUrl: 'shelby-gt500-main.png',
                sliderImageUrls: [
                    '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
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
                mainImageUrl: 'corvette-z06-main.png',
                sliderImageUrls: [
                   '1.png',
                    '2.png',
                    '3.png',
                    '4.png'
                ]
            }
        ];

        function createCarCard(car) {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <img src="${car.mainImageUrl}" alt="${car.make} ${car.model}">
                <div class="car-details">
                    <h3>${car.year} ${car.make} ${car.model}</h3>
                    <p>${car.description}</p>
                    <p class="price">$${car.price.toLocaleString()}</p>
                    <button class="view-details-btn" data-car-id="${car.id}">View Details</button>
                </div>
            `;
            return carCard;
        }

        cars.forEach(car => {
            carGrid.appendChild(createCarCard(car));
        });

        let currentSlide = 0;
        let sliderImagesContainer;

        function showSlide(index) {
            const totalSlides = sliderImagesContainer.children.length;
            currentSlide = (index + totalSlides) % totalSlides;
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

        closeButton.addEventListener('click', () => {
            carDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

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
