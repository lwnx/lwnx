// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

// Language toggle functionality
const langToggle = document.getElementById('lang-toggle');
let isEnglish = true;

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Function to switch pages
function switchPage(targetId) {
    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked link
    const activeLink = Array.from(navLinks).find(link => 
        link.getAttribute('href') === `#${targetId}`
    );
    if (activeLink) {
        requestAnimationFrame(() => {
            activeLink.classList.add('active');
        });
    }
    
    // Handle page transitions
    const currentPage = Array.from(pages).find(p => p.classList.contains('active'));
    const targetPage = document.getElementById(targetId);
    
    if (currentPage) {
        currentPage.style.opacity = '0';
        setTimeout(() => {
            currentPage.classList.remove('active');
            if (targetPage) {
                targetPage.classList.add('active');
                requestAnimationFrame(() => {
                    targetPage.style.opacity = '1';
                });
            }
        }, 300);
    } else if (targetPage) {
        targetPage.classList.add('active');
        requestAnimationFrame(() => {
            targetPage.style.opacity = '1';
        });
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

// Handle theme toggle
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// Handle language toggle
langToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    // Add your language switch logic here
    const langIcon = langToggle.querySelector('.lang-icon');
    langIcon.style.transform = isEnglish ? 'rotate(0deg)' : 'rotate(180deg)';
});

// Handle URL hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
    }
});

// Set initial page based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        switchPage(hash);
    } else {
        // If no hash, show the first page
        const firstPage = pages[0];
        if (firstPage) {
            switchPage(firstPage.id);
        }
    }
});

// Add system theme detection
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    isDark = e.matches;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// Theme initialization
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.setAttribute('data-theme',
                document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
        });
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Navigation initialization
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = page.id === pageId ? 'block' : 'none';
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').slice(1) === pageId);
        });
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').slice(1);
            showPage(pageId);
            history.pushState(null, '', `#${pageId}`);
        });
    });

    // Handle initial page load and back/forward
    window.addEventListener('popstate', () => {
        const pageId = location.hash.slice(1) || 'about';
        showPage(pageId);
    });

    // Show initial page
    const initialPage = location.hash.slice(1) || 'about';
    showPage(initialPage);
}

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
    
    // Theme initialization
    initTheme();
    
    // Navigation initialization
    initNavigation();
});

// Also initialize when hash changes (for single page navigation)
window.addEventListener('hashchange', () => {
    console.log('Hash changed, reinitializing blog tabs');
    filterBlogPosts('all');
});
