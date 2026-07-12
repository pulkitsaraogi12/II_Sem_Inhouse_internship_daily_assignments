document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme in local storage, default to dark if not found
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode'); // Our default based on HTML
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to local storage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // 2. Countdown Timer Logic (Targeting July 10th of the current year)
    const countdown = () => {
        const now = new Date();
        let currentYear = now.getFullYear();
        let targetDate = new Date(`July 18, ${currentYear} 00:00:00`).getTime();

        // If July 10th has already passed this year, set for next year
        if (now.getTime() > targetDate) {
            targetDate = new Date(`July 10, ${currentYear + 1} 00:00:00`).getTime();
        }

        const currentTime = new Date().getTime();
        const difference = targetDate - currentTime;

        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update DOM
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    // Run immediately, then update every second
    countdown();
    setInterval(countdown, 1000);

    // 3. Form Submission Mock
    const form = document.getElementById('registration-form');
    const successMsg = document.getElementById('success-message');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual page reload

        // Basic validation check (handled mostly by HTML required attributes)
        
        // Change button state to show processing
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Processing...';
        submitBtn.disabled = true;

        // Simulate network request with a timeout
        setTimeout(() => {
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            // Hide form elements, show success message
            const inputs = form.querySelectorAll('.input-group');
            inputs.forEach(input => input.style.display = 'none');
            submitBtn.style.display = 'none';
            
            successMsg.style.display = 'block';
            
            // Optional: reset form fields
            form.reset();
        }, 1500); // 1.5 second delay simulation
    });
});
