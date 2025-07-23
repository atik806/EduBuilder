// Smooth scroll and active nav
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 80;
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Contact form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const message = this.querySelector('textarea').value;
    const button = this.querySelector('button');
    button.disabled = true;
    button.textContent = 'Sending...';
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        const result = await response.json();
        alert(result.message);
        this.reset();
    } catch (err) {
        alert('There was an error sending your message. Please try again later.');
    }
    button.disabled = false;
    button.textContent = 'Send';
}); 