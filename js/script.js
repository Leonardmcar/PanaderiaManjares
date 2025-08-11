// script.js
// Store current slide positions for each carousel
const carouselPositions = {
  'panes-dulces': 0,
  'volovanes': 0,
  'pasteles': 0,
  'postres': 0
};

// Store maximum positions for each carousel
const maxPositions = {};

// Initialize the maximum positions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Calculate max positions for each carousel
  const categories = ['panes-dulces', 'volovanes', 'pasteles', 'postres'];
  
  categories.forEach(category => {
    const carousel = document.getElementById(`carousel-${category}`);
    const cards = carousel.querySelectorAll('.product-card');
    const containerWidth = carousel.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 15; // width + margin
    
    // Calculate how many cards can fit in one view
    const visibleCards = Math.floor(containerWidth / cardWidth);
    
    // Maximum position is total cards minus visible cards
    maxPositions[category] = Math.max(0, cards.length - visibleCards);
  });
});

// Function to toggle category visibility with animation
function toggleCategory(categoryId) {
  const categoryList = document.getElementById(categoryId);
  const categoryHeader = document.querySelector(`[onclick="toggleCategory('${categoryId}')"]`);
  const icon = categoryHeader.querySelector('i');
  
  if (categoryList.classList.contains('show')) {
    // Closing animation
    categoryList.classList.remove('show');
    categoryHeader.classList.remove('collapsed');
    
    // Reset carousel position when closing
    carouselPositions[categoryId] = 0;
    const carousel = document.getElementById(`carousel-${categoryId}`);
    if (carousel) {
      carousel.style.transform = 'translateX(0)';
    }
  } else {
    // Opening animation
    categoryList.classList.add('show');
    categoryHeader.classList.add('collapsed');
    
    // Animate in the product cards with delay
    setTimeout(() => {
      const cards = categoryList.querySelectorAll('.product-card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    }, 100);
  }
}

// Function to handle carousel navigation
function prevSlide(carouselId) {
  const carousel = document.getElementById(`carousel-${carouselId}`);
  const cardWidth = carousel.querySelector('.product-card').offsetWidth + 15; // width + margin
  
  if (carouselPositions[carouselId] > 0) {
    carouselPositions[carouselId]--;
    carousel.style.transform = `translateX(-${carouselPositions[carouselId] * cardWidth}px)`;
  }
}

function nextSlide(carouselId) {
  const carousel = document.getElementById(`carousel-${carouselId}`);
  const cardWidth = carousel.querySelector('.product-card').offsetWidth + 15; // width + margin
  
  if (carouselPositions[carouselId] < maxPositions[carouselId]) {
    carouselPositions[carouselId]++;
    carousel.style.transform = `translateX(-${carouselPositions[carouselId] * cardWidth}px)`;
  }
}