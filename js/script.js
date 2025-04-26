document.addEventListener('DOMContentLoaded', function() {
    // Lógica del menú hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (hamburgerMenu && navbarMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Carrusel de imágenes
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let intervalId;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    }

    prevBtn.addEventListener('click', function() {
        prevImage();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', function() {
        nextImage();
        resetAutoplay();
    });

    function startAutoplay() {
        intervalId = setInterval(nextImage, 5000); // cambia cada 5 segundos
    }

    function resetAutoplay() {
        clearInterval(intervalId);
        startAutoplay();
    }

    // Inicializar
    showImage(currentIndex);
    startAutoplay();
});
