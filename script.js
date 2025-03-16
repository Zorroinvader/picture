document.addEventListener('DOMContentLoaded', function() {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Find or create the current year link
    const currentYearLink = document.querySelector(`[href="#${currentYear}"]`);
    if (currentYearLink) {
        currentYearLink.classList.add('active');
    }

    // Handle smooth scrolling for all navigation items
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                window.scrollBy(0, -70);
            }
        });
    });

    // Handle image hover effects
    document.querySelectorAll('.carousel-item img').forEach(img => {
        img.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // X position within the element
            const y = e.clientY - rect.top;  // Y position within the element
            
            // Calculate distance from center (in percentage)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate how far from center the mouse is (0 to 1)
            const distanceX = Math.abs(x - centerX) / centerX;
            const distanceY = Math.abs(y - centerY) / centerY;
            
            // Calculate scale based on mouse position (closer to center = bigger scale)
            const maxScale = 1.03;
            const minScale = 1;
            const scale = maxScale - (Math.max(distanceX, distanceY) * (maxScale - minScale));
            
            // Apply the transform
            this.style.transform = `scale(${scale})`;
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Create an Intersection Observer to watch year groups
    const yearGroups = document.querySelectorAll('.year-group');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px',
        threshold: 0
    };

    const yearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const yearId = entry.target.id;
            const correspondingNavItem = document.querySelector(`[href="#${yearId}"]`);
            
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove('active'));
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);

    yearGroups.forEach(group => yearObserver.observe(group));

    // Scroll to current year on page load
    const currentYearElement = document.getElementById(currentYear.toString());
    if (currentYearElement) {
        setTimeout(() => {
            currentYearElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            window.scrollBy(0, -70);
        }, 100);
    }
}); 