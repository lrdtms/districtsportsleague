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
        // Function to get scroll amount based on screen size
        function getScrollAmount() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 480) {
                // Phone: 240px card + 10px gap
                return 250;
            } else if (screenWidth <= 768) {
                // Tablet: 280px card + 15px gap
                return 295;
            } else {
                // Desktop: 350px card + 30px gap
                return 380;
            }
        }
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            newsContainer.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            newsContainer.scrollBy({
                left: -getScrollAmount(),
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
        
        // Update scroll amount on window resize
        window.addEventListener('resize', function() {
            // Recalculate in case user rotates device or resizes window
            updateButtonStates();
        });
    }
});
