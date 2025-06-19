document.addEventListener('DOMContentLoaded', () => {
    // Skills Accordion functionality
    const skillHeaders = document.querySelectorAll('.skill-header');
    
    function toggleAccordion(header) {
        const content = document.getElementById(header.getAttribute('aria-controls'));
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        
        // Update ARIA attributes and toggle visibility
        header.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
        content.hidden = isExpanded;
        
        // Optional: close other accordions
        if (!isExpanded) {
            skillHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.setAttribute('aria-hidden', 'true');
                    otherContent.hidden = true;
                }
            });
        }
    }

    skillHeaders.forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
        
        // Keyboard navigation
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(header);
            }
        });
    });

    // Navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add fade-in animation to sections
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
