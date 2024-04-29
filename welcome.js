
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const startBtn = document.getElementById('startBtn');

// Ascundem butonul "Previous" la început
prevBtn.style.display = 'none';

function showSlides() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    if (slideIndex === slides.length - 1) {
        next.style.display = 'none';
        startBtn.style.display = 'block'; // Afișează butonul "Începeți acum" pe ultimul slide
    } else {
        next.style.display = 'block';
        startBtn.style.display = 'none'; // Ascunde butonul "Începeți acum" pe celelalte slide-uri
    }

    if (slideIndex === 0) {
        prev.style.display = 'none';
    } else {
        prev.style.display = 'block';
    }
}

function nextSlide() {
    if (slideIndex < slides.length - 1) {
        slideIndex++;
        showSlides();
    }
}

function prevSlide() {
    if (slideIndex > 0) {
        slideIndex--;
        showSlides();
    }
}


function redirectToRegistration() {
    // Redirecționează utilizatorul către pagina de înregistrare
    window.location.href = "location.html";
}

// Afișează slide-urile la încărcarea paginii
document.addEventListener('DOMContentLoaded', showSlides);



