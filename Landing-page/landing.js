//Toggle responsive menu for navigation tab
document.getElementById('navbar-toggle').addEventListener('click', function() {
    var navbarRight = document.querySelector('.navbar-right');
    navbarRight.classList.toggle('active');
    this.classList.toggle('active');
});



// JavaScript for Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const words = ["Patients", "Hospitals", "Pharmacy"];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let typingForward = true;
    const typingSpeed = 100;
    const pauseBetweenWords = 1500;
    const element = document.getElementById('typing-effect');

    function typeWord() {
        if (typingForward) {
            if (currentCharIndex < words[currentWordIndex].length) {
                element.textContent += words[currentWordIndex][currentCharIndex];
                currentCharIndex++;
                setTimeout(typeWord, typingSpeed);
            } else {
                typingForward = false;
                setTimeout(typeWord, pauseBetweenWords);
            }
        } else {
            if (currentCharIndex > 0) {
                element.textContent = element.textContent.slice(0, -1);
                currentCharIndex--;
                setTimeout(typeWord, typingSpeed);
            } else {
                typingForward = true;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                setTimeout(typeWord, typingSpeed);
            }
        }
    }

    typeWord();
});



// JavaScript for features cards scroll
document.addEventListener('DOMContentLoaded', () => {
    const featuresSection = document.querySelector('.features-section');
    const featureCards = document.querySelectorAll('.feature-card');

    function handleScroll() {
        const sectionTop = featuresSection.getBoundingClientRect().top;
        const sectionBottom = featuresSection.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        if (sectionTop < viewportHeight && sectionBottom >= 0) {
            featuresSection.classList.add('visible');
            featureCards.forEach(card => card.classList.add('visible'));
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});



// JavaScript for navigation Features to navigate to Our features section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// JavaScript for Our features toggle FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});


//Javascript for Chatbot button
document.querySelector('.chatbot-container').addEventListener('click', function() {
    // Your code to open the chatbot or trigger an action
    alert('Chatbot clicked!');
});
