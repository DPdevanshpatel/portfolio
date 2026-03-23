// Sticky Navbar & Active Linking
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Transparent to solid navbar effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active linking based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const icon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Force Download Resume
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const pdfUrl = this.getAttribute('href');
        const fileName = this.getAttribute('download') || 'resume.pdf';
        
        fetch(pdfUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(() => {
                // Fallback if fetch fails (e.g., due to CORS on file:// protocol)
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = pdfUrl;
                a.download = fileName;
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    });
}
