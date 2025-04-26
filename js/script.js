document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (hamburgerMenu && navbarMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Carrusel de imágenes
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const intervalTime = 2000; // 2 segundos

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Mostrar la primera imagen al cargar la página
    showSlide(currentIndex);

    // Iniciar el carrusel automático
    setInterval(nextSlide, intervalTime);
});