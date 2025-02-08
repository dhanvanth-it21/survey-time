import { createElement } from './js/generator.js';
import { navBar, login } from './data.js';

window.addEventListener('load', () => {
    console.log('Page loaded');
    handleRouteChange();
});

// Listen for back/forward navigation
window.addEventListener('popstate', handleRouteChange);

// Function to navigate to a page by changing the URL and loading the content
function navigateTo(page) {
    history.pushState({ page }, '', `/${page}`);
    handleRouteChange();
}



// Function to handle routing based on URL changes
function handleRouteChange() {
    console.log('Route changed:', window.location.pathname);
    const path = window.location.pathname.replace("/", ""); 
    document.body.innerHTML = '';

    if (path === "" || path === "login") {
        loadLoginPage();
    } else if (path === "admin") {
        lazyAdminInit();
    } else if (path === "user") {
        lazyUserInit();
    }
}

// Function to load the login page
function loadLoginPage() {
    createElement(navBar, document.body);
    createElement(login, document.body);
    updateStylesheet("style.css");

    document.getElementById('admin-button').addEventListener('click', () => {
        navigateTo("admin");
    });

    document.getElementById('user-button').addEventListener('click', () => {
        navigateTo("user");
    });
}

// Function to lazy load the admin module
function lazyAdminInit() {
    if (window.adminPageInit) {
        window.adminPageInit();
        updateStylesheet("css/admin-page/style.css");
    } else {
        import('./js/admin-page/script.js')
            .then(m => {
                m.adminPageInit();
                updateStylesheet("css/admin-page/style.css");
            })
            .catch(err => console.error('Failed to load admin page script:', err));
    }
}

// Function to lazy load the user module
function lazyUserInit() {
    if (window.userPageInit) {
        window.userPageInit();
        updateStylesheet("css/user-page/style.css");
    } else {
        import('./js/user-page/script.js')
            .then(m => {
                m.userPageInit();
                updateStylesheet("css/user-page/style.css");
            })
            .catch(err => console.error('Failed to load user page script:', err));
    }
}

function updateStylesheet(href) {
    let link = document.querySelector('link[rel="stylesheet"]');
        link.setAttribute("href", href);
}
