import { createElement } from './js/generator.js';
import { navBar, login } from './data.js';
import { surveyListInit } from './js/admin-page/survey-list.js';

export const serverIp = "localhost";


window.addEventListener('load', () => {
    handleRouteChange();
});

// Listen for back/forward navigation
window.addEventListener('popstate', handleRouteChange);

// Function to navigate to a page by changing the URL and loading the content
 export function navigateTo(page) {
    history.pushState({ page }, '', `/${page}`);
    handleRouteChange();
}



// Function to handle routing based on URL changes
function handleRouteChange() {
    const path = window.location.pathname.replace("/", ""); 

    const routes = {
        "": loadLoginPage,
        "login": loadLoginPage,
        "admin": lazyAdminInit,
        "user": lazyUserInit,
        "admin/create-survey": loadCreateSurveyPage,
        "user/survey": () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            loadSurveyPage(id);
        },
    };

    const routeAction = routes[path] || routes[window.location.pathname.replace("/", "")];
    if (routeAction) {
        routeAction();
    } else {
        console.error('No route found for path:', path);
    }
}

// Function to load the login page
function loadLoginPage() {
    document.body.innerHTML = '';
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
    document.body.innerHTML = '';
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
    document.body.innerHTML = '';
    if (window.userPageInit) {
        window.userPageInit();
        updateStylesheet("css/user-page/style.css");
    } else {
        import('./js/user-page/script.js')
            .then(m => {
                m.userPageInit();
                updateStylesheet("../css/user-page/style.css");
            })
            .catch(err => console.error('Failed to load user page script:', err));
    }
}

// Function to load the create survey page
function loadCreateSurveyPage() {
    document.body.innerHTML = '';
    //lazy loading for creating new survey  
    if(window.createSurveyInit) {
        window.createSurveyInit();
        updateStylesheet("css/create-survey/style.css");
    } else {
        import('./js/create-survey/script.js')
            .then(m => {
                m.createSurveyInit();
                updateStylesheet("../css/create-survey/style.css");
            })
            .catch(err => console.error('Failed to load create survey script:', err));
    }
}


// Function to load the survey page
function loadSurveyPage(id) {
    document.body.innerHTML = '';
    //lazy loading
    if(window.userFormInit) {
        window.userFormInit(id);
        updateStylesheet("css/user-form/style.css");
    } else {
        import('./js/user-form/script.js')
            .then(m => {
                m.userFormInit(id);
                updateStylesheet("../css/user-form/style.css");
            })
            .catch(err => console.error('Failed to load create survey script:', err));
    }
}







function updateStylesheet(href) {
    let link = document.querySelector('link[rel="stylesheet"]');
        link.setAttribute("href", href);
}

