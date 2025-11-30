// Horizontal scrolling presentation navigation
let currentSlideIndex = 0;
const slidesContainer = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('totalSlides').textContent = totalSlides;

function showSlide(index) {
    // Clamp index
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    currentSlideIndex = index;
    
    // Calculate translateX offset
    const offsetX = -index * 100;
    slidesContainer.style.transform = `translateX(${offsetX}vw)`;
    
    // Update UI
    document.getElementById('currentSlide').textContent = index + 1;
    
    const progress = ((index + 1) / totalSlides) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Enable/disable buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === totalSlides - 1;
    
    // Scroll current slide to top
    setTimeout(() => {
        slides[index].scrollTop = 0;
    }, 100);
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

function goToSlide(slideNumber) {
    showSlide(slideNumber);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
        e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        previousSlide();
        e.preventDefault();
    } else if (e.key === 'Home') {
        showSlide(0);
        e.preventDefault();
    } else if (e.key === 'End') {
        showSlide(totalSlides - 1);
        e.preventDefault();
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left -> next slide
            nextSlide();
        } else {
            // Swipe right -> previous slide
            previousSlide();
        }
    }
}

// Initialize
showSlide(0);