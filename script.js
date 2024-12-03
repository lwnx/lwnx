// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
let isDark = localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Function to switch pages
function switchPage(targetId) {
    // Remove active class from all pages and links
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to target page and link
    const targetPage = document.getElementById(targetId);
    const activeLink = Array.from(navLinks).find(link => 
        link.getAttribute('href') === `#${targetId}`
    );
    
    if (targetPage && activeLink) {
        targetPage.classList.add('active');
        activeLink.classList.add('active');
        
        // Smooth transition
        pages.forEach(page => {
            page.style.opacity = page === targetPage ? '1' : '0';
        });
        
        // Update URL without triggering page reload
        history.pushState(null, '', `#${targetId}`);
    }
}

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        switchPage(targetId);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'about';
    switchPage(hash);
});

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1) || 'about';
    switchPage(hash);
});

// Language toggle functionality
const langToggle = document.getElementById('lang-toggle');
let isEnglish = true;

// Language toggle event listener
langToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    // Add your language switch logic here
    const langIcon = langToggle.querySelector('.lang-icon');
    langIcon.style.transform = isEnglish ? 'rotate(0deg)' : 'rotate(180deg)';
});

// Blog post filtering
function filterBlogPosts(category) {
    console.log('Filtering posts for category:', category);
    
    // Update active state of buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Filter posts
    document.querySelectorAll('.blog-post').forEach(post => {
        const postCategory = post.dataset.category;
        const shouldShow = category === 'all' || postCategory === category;
        
        if (shouldShow) {
            post.classList.remove('hidden');
            setTimeout(() => post.style.opacity = '1', 10);
        } else {
            post.style.opacity = '0';
            setTimeout(() => post.classList.add('hidden'), 300);
        }
    });
}

// Initialize blog
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    filterBlogPosts('all');
});

// Also initialize when hash changes (for single page navigation)
window.addEventListener('hashchange', () => {
    console.log('Hash changed, reinitializing blog tabs');
    filterBlogPosts('all');
});
