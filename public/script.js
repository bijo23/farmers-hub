// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModalElm = document.querySelector('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const feedbackForm = document.getElementById('feedbackForm');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
// Sample Data
const products = [
    {
        id: 1,
        title: 'Hybrid Wheat Seeds',
        type: 'cereal',
        season: 'rabi',
        price: '₹450/kg',
        image: 'images/wheat-seeds.jpg'
    },
    {
        id: 2,
        title: 'NPK Fertilizer',
        type: 'fertilizer',
        season: 'all',
        price: '₹350/kg',
        image: 'images/npk-fertilizer.jpg'
    },
    {
        id: 3,
        title: 'Tomato Seeds',
        type: 'vegetable',
        season: 'kharif',
        price: '₹250/100g',
        image: 'images/tomato-seeds.jpg'
    },
    {
        id: 4,
        title: 'Organic Manure',
        type: 'fertilizer',
        season: 'all',
        price: '₹200/kg',
        image: 'images/organic-manure.jpg'
    }
];

const schemes = [
    {
        title: 'PM Kisan Samman Nidhi',
        description: 'Financial support of ₹6,000 per year to small and marginal farmers.',
        benefit: '₹6,000/year in 3 installments',
        eligibility: 'Small and marginal farmers',
        deadline: '31st December 2023'
    },
    {
        title: 'Soil Health Card Scheme',
        description: 'Provides farmers with soil health cards containing crop-wise recommendations.',
        benefit: 'Free soil testing and recommendations',
        eligibility: 'All farmers',
        deadline: 'Ongoing'
    }
];

const news = [
    {
        title: 'Government Announces New Agricultural Policy',
        excerpt: 'The new policy focuses on doubling farmers income by 2025 through various initiatives.',
        date: '15 Oct 2023',
        image: 'images/news1.jpg'
    },
    {
        title: 'Record Harvest Expected This Season',
        excerpt: 'Due to favorable monsoon conditions, experts predict a bumper crop this year.',
        date: '10 Oct 2023',
        image: 'images/news2.jpg'
    }
];

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModalElm.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));

        tab.classList.add('active');
        document.querySelector(`.auth-form[data-tab="${tabName}"]`).classList.add('active');
    });
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    feedbackForm.reset();
    document.querySelectorAll('.star-rating input').forEach(input => {
        input.checked = false;
    });
});

// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Login functionality will be implemented with backend');
//     loginModal.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });

// registerForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Registration successful! Please login.');
//     document.querySelector('.auth-tab[data-tab="login"]').click();
//     registerForm.reset();
// });


// Initialize Functions
function initProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <span class="product-type">${product.type}</span>
                <div class="product-price">${product.price}</div>
                <a href="#" class="product-btn">View Details</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function initSchemes() {
    const centralTab = document.getElementById('central');
    centralTab.innerHTML = '';

    schemes.forEach(scheme => {
        const schemeCard = document.createElement('div');
        schemeCard.className = 'scheme-card';
        schemeCard.innerHTML = `
            <h3 class="scheme-title">${scheme.title}</h3>
            <p class="scheme-desc">${scheme.description}</p>
            <div class="scheme-details">
                <div class="scheme-detail">
                    <i class="fas fa-hand-holding-usd"></i>
                    <span>Benefit: ${scheme.benefit}</span>
                </div>
                <div class="scheme-detail">
                    <i class="fas fa-user-check"></i>
                    <span>Eligibility: ${scheme.eligibility}</span>
                </div>
                <div class="scheme-detail">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Deadline: ${scheme.deadline}</span>
                </div>
            </div>
            <a href="#" class="scheme-btn">Apply Now</a>
        `;
        centralTab.appendChild(schemeCard);
    });
}

function initNews() {
    const mainNews = document.querySelector('.main-news');
    const secondaryNews = document.querySelector('.secondary-news');

    // Main news article
    mainNews.innerHTML = `
        <div class="main-news-image">
            <img src="${news[0].image}" alt="${news[0].title}">
        </div>
        <div class="main-news-content">
            <h3 class="main-news-title">${news[0].title}</h3>
            <div class="main-news-meta">
                <span><i class="far fa-calendar-alt"></i> ${news[0].date}</span>
                <span><i class="far fa-user"></i> Admin</span>
            </div>
            <p class="main-news-excerpt">${news[0].excerpt}</p>
            <a href="#" class="btn btn-primary">Read More</a>
        </div>
    `;

    // Secondary news articles
    secondaryNews.innerHTML = '';
    for (let i = 1; i < news.length; i++) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-item-image">
                <img src="${news[i].image}" alt="${news[i].title}">
            </div>
            <div class="news-item-content">
                <h4 class="news-item-title">${news[i].title}</h4>
                <div class="news-item-date">${news[i].date}</div>
                <p class="news-item-excerpt">${news[i].excerpt}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
        secondaryNews.appendChild(newsItem);
    }
}

function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // In a real app, you would fetch weather data from an API here
            document.getElementById('location').textContent = 'Your Farm Location';

            // Simulate weather data
            const forecastDays = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
            const forecastContainer = document.querySelector('.forecast-days');

            forecastDays.forEach(day => {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <span class="forecast-day">${day}</span>
                    <div class="forecast-temp">
                        <i class="fas fa-cloud-sun"></i>
                        <span>28° / 18°</span>
                    </div>
                `;
                forecastContainer.appendChild(forecastItem);
            });
        }, error => {
            console.error('Error getting location:', error);
            document.getElementById('location').textContent = 'Enable location for accurate weather';
        });
    } else {
        document.getElementById('location').textContent = 'Location not supported by your browser';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    initSchemes();
    initNews();
    initWeather();

    // Set first tab as active by default
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
});