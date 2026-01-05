// Smooth Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Add click event listener to each button
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target section ID from the data-target attribute
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate the offset for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add active state to nav buttons based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to the corresponding button
                const activeButton = document.querySelector(`[data-target="${section.id}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    });
});

// News Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('newsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (newsContainer && prevBtn && nextBtn) {
        const scrollAmount = 380; // Card width (350px) + gap (30px)
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            newsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            newsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button states based on scroll position
        function updateButtonStates() {
            const scrollLeft = newsContainer.scrollLeft;
            const maxScroll = newsContainer.scrollWidth - newsContainer.clientWidth;
            
            // Disable prev button at start
            prevBtn.disabled = scrollLeft <= 0;
            
            // Disable next button at end
            nextBtn.disabled = scrollLeft >= maxScroll - 1; // -1 for rounding issues
        }
        
        // Initial button state
        updateButtonStates();
        
        // Update button states on scroll
        newsContainer.addEventListener('scroll', updateButtonStates);
    }
});
