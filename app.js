document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);


    // --- Part 2: Language Switcher Logic ---
    const languageSelect = document.getElementById('language-select');

    const setLanguage = (language) => {
        document.body.className = ''; 
        const rtlLanguages = ['ar', 'ur', 'fa', 'he'];
        if (rtlLanguages.includes(language)) {
            document.body.classList.add('rtl');
        }
        document.body.classList.add(`lang-${language}`);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        
        htmlElement.lang = language;
        localStorage.setItem('language', language);
    };

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });

        const savedLanguage = localStorage.getItem('language') || 'en';
        if ([...languageSelect.options].some(option => option.value === savedLanguage)) {
             languageSelect.value = savedLanguage;
        }
        setLanguage(savedLanguage);
    }

    // --- Part 3: Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // --- Part 4: Scroll Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

});