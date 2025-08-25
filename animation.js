// --- SCROLL PAR ANIMATION KE LIYE SCRIPT ---

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Jab element screen par dikhe, to 'is-visible' class add karein
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
});

// Saare elements jin par 'animate-on-scroll' class hai, unko observe karein
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach((el) => observer.observe(el));