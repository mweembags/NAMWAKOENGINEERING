document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Image Gallery Modal
    const imageModal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const imageCaption = document.querySelector('.image-caption');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Initialize image gallery
    function initImageGallery() {
        images = Array.from(document.querySelectorAll('.gallery-item'));
        
        viewButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                currentImageIndex = index;
                openImageModal(this.dataset.image, this.dataset.caption);
            });
        });
    }
    
    function openImageModal(imageSrc, caption) {
        modalImage.src = `images/photography/${imageSrc}`;
        imageCaption.textContent = caption;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeImageModal() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigation between images
    document.querySelector('.prev-btn').addEventListener('click', function() {
        navigateImages(-1);
    });
    
    document.querySelector('.next-btn').addEventListener('click', function() {
        navigateImages(1);
    });
    
    function navigateImages(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        
        const activeImage = images[currentImageIndex];
        const imgElement = activeImage.querySelector('img');
        const btnElement = activeImage.querySelector('.view-btn');
        
        modalImage.src = imgElement.src;
        imageCaption.textContent = btnElement.dataset.caption;
    }
    
    // Close modal when clicking outside content
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imageModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeImageModal();
            } else if (e.key === 'ArrowLeft') {
                navigateImages(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImages(1);
            }
        }
    });
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.image-modal, .movie-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Initialize image gallery
    initImageGallery();
    
    // Music Player Functionality
    const audioPlayer = document.getElementById('main-audio');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            playlistItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update track info
            const title = this.querySelector('.item-title').textContent;
            const artist = this.querySelector('.item-artist').textContent;
            
            document.querySelector('.track-title').textContent = title;
            document.querySelector('.track-artist').textContent = artist;
            
            // Change audio source (in a real app, you would load the correct file)
            // For demo, we'll just play/pause
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    });
    
    // Movie Details Modal
    const movieModal = document.querySelector('.movie-modal');
    const movieDetailsButtons = document.querySelectorAll('.movie-details-btn');
    
    movieDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const movieId = this.dataset.movie;
            showMovieDetails(movieId);
        });
    });
    
    function showMovieDetails(movieId) {
        // In a real app, you would fetch movie details from a database or API
        // For demo, we'll use hardcoded data
        let movieData = {};
        
        switch(movieId) {
            case 'black_panther':
                movieData = {
                    title: 'Black Panther',
                    year: '2018',
                    rating: '7.3/10',
                    description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country\'s past.',
                    director: 'Ryan Coogler',
                    stars: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong\'o'
                };
                break;
            case 'queen_katwe':
                movieData = {
                    title: 'Queen of Katwe',
                    year: '2016',
                    rating: '7.4/10',
                    description: 'A young girl from the slums of Uganda discovers her prodigious talent for chess and begins a journey to become a world-class player.',
                    director: 'Mira Nair',
                    stars: 'Madina Nalwanga, David Oyelowo, Lupita Nyong\'o'
                };
                break;
        }
        
        // Populate modal content
        const modalContent = `
            <h2>${movieData.title} (${movieData.year})</h2>
            <p class="movie-modal-rating">Rating: ${movieData.rating}</p>
            <div class="movie-modal-body">
                <div class="movie-modal-poster">
                    <img src="images/movies/${movieId}.jpg" alt="${movieData.title}">
                </div>
                <div class="movie-modal-info">
                    <p><strong>Director:</strong> ${movieData.director}</p>
                    <p><strong>Stars:</strong> ${movieData.stars}</p>
                    <p class="movie-modal-description">${movieData.description}</p>
                </div>
            </div>
        `;
        
        document.querySelector('.movie-modal-content').innerHTML = modalContent;
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Scroll animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.hobby-section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionPoint = 150;
            
            if (sectionTop < windowHeight - sectionPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial animation state
    document.querySelectorAll('.hobby-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
    
    // Initial check on load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    mobileMenuToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Image Gallery Modal
    const imageModal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const imageCaption = document.querySelector('.image-caption');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');

    let currentImageIndex = 0;
    let images = [];

    // Initialize image gallery
    function initImageGallery() {
        images = Array.from(document.querySelectorAll('.gallery-item'));

        viewButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                currentImageIndex = index;
                openImageModal(this.dataset.image, this.dataset.caption);
            });
        });
    }

    function openImageModal(imageSrc, caption) {
        modalImage.src = `images/photography/${imageSrc}`;
        imageCaption.textContent = caption;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigation between images
    document.querySelector('.prev-btn').addEventListener('click', function () {
        navigateImages(-1);
    });

    document.querySelector('.next-btn').addEventListener('click', function () {
        navigateImages(1);
    });

    function navigateImages(direction) {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }

        const activeImage = images[currentImageIndex];
        const imgElement = activeImage.querySelector('img');
        const btnElement = activeImage.querySelector('.view-btn');

        modalImage.src = imgElement.src;
        imageCaption.textContent = btnElement.dataset.caption;
    }

    // Close modal when clicking outside content
    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (imageModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeImageModal();
            } else if (e.key === 'ArrowLeft') {
                navigateImages(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImages(1);
            }
        }
    });

    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.image-modal, .movie-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Initialize image gallery
    initImageGallery();

    // Music Player Functionality
    const audioPlayer = document.getElementById('main-audio');
    const playlistItems = document.querySelectorAll('.playlist-item');

    playlistItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            playlistItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Update track info
            const title = this.querySelector('.item-title').textContent;
            const artist = this.querySelector('.item-artist').textContent;

            document.querySelector('.track-title').textContent = title;
            document.querySelector('.track-artist').textContent = artist;

            // Change audio source (in a real app, you would load the correct file)
            // For demo, we'll just play/pause
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    });

    // Movie Details Modal
    const movieModal = document.querySelector('.movie-modal');
    const movieDetailsButtons = document.querySelectorAll('.movie-details-btn');

    movieDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const movieId = this.dataset.movie;
            showMovieDetails(movieId);
        });
    });

    function showMovieDetails(movieId) {
        // In a real app, you would fetch movie details from a database or API
        // For demo, we'll use hardcoded data
        let movieData = {};

        switch (movieId) {
            case 'black_panther':
                movieData = {
                    title: 'Black Panther',
                    year: '2018',
                    rating: '7.3/10',
                    description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country\'s past.',
                    director: 'Ryan Coogler',
                    stars: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong\'o'
                };
                break;
            case 'queen_katwe':
                movieData = {
                    title: 'Queen of Katwe',
                    year: '2016',
                    rating: '7.4/10',
                    description: 'A young girl from the slums of Uganda discovers her prodigious talent for chess and begins a journey to become a world-class player.',
                    director: 'Mira Nair',
                    stars: 'Madina Nalwanga, David Oyelowo, Lupita Nyong\'o'
                };
                break;
        }

        // Populate modal content
        const modalContent = `
            <h2>${movieData.title} (${movieData.year})</h2>
            <p class="movie-modal-rating">Rating: ${movieData.rating}</p>
            <div class="movie-modal-body">
                <div class="movie-modal-poster">
                    <img src="images/movies/${movieId}.jpg" alt="${movieData.title}">
                </div>
                <div class="movie-modal-info">
                    <p><strong>Director:</strong> ${movieData.director}</p>
                    <p><strong>Stars:</strong> ${movieData.stars}</p>
                    <p class="movie-modal-description">${movieData.description}</p>
                </div>
            </div>
        `;

        document.querySelector('.movie-modal-content').innerHTML = modalContent;
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Scroll animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.hobby-section');
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionPoint = 150;

            if (sectionTop < windowHeight - sectionPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial animation state
    document.querySelectorAll('.hobby-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });

    // Initial check on load
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});
