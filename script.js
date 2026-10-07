// Smooth Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('[data-target]');
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

    // Dropdown: click/tap toggle (hover is handled in CSS)
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const open = dropdown.classList.toggle('open');
        dropdownToggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function() {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    });

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
                dropdownToggle.classList.toggle('has-active', !!(activeButton && dropdown.contains(activeButton)));
            }
        });
    });
});

// About: Load More / Show Less
document.addEventListener('DOMContentLoaded', function() {
    const aboutMore = document.getElementById('aboutMore');
    const aboutToggle = document.getElementById('aboutToggle');

    aboutToggle.addEventListener('click', function() {
        const open = aboutMore.classList.toggle('open');
        aboutToggle.textContent = open ? 'Show Less' : 'Load More';
        aboutToggle.setAttribute('aria-expanded', open);
    });
});

// Arrow-button carousel, shared by the news feed and the team section
function setupCarousel(container, prevBtn, nextBtn, cardSelector) {
    if (!container || !prevBtn || !nextBtn) return;

    // One card plus the gap between cards, whatever size the card is at this width
    function getScrollAmount() {
        const card = container.querySelector(cardSelector);
        const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    nextBtn.addEventListener('click', function() {
        container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', function() {
        container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    // Disable the arrows at either end
    function updateButtonStates() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        prevBtn.disabled = container.scrollLeft <= 0;
        nextBtn.disabled = container.scrollLeft >= maxScroll - 1; // -1 for rounding issues
    }

    updateButtonStates();
    container.addEventListener('scroll', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarousel(
        document.getElementById('newsContainer'),
        document.getElementById('prevBtn'),
        document.getElementById('nextBtn'),
        '.news-article'
    );
    setupCarousel(
        document.getElementById('teamContainer'),
        document.getElementById('teamPrev'),
        document.getElementById('teamNext'),
        '.director-card'
    );
});
