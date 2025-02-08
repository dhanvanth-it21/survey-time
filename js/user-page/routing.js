
export function navigateTo(page) {
    console.log('Navigating to:', page);
    history.pushState({}, "", `/user/${page}`);
    handleRouteChange();
}

function handleRouteChange() {
    const path  = window.location.pathname.replace("/user/", "");
    console.log('Route changed:', path);
    document.body.innerHTML = '';
    if(path === "survey") {
        loadSurveyPage();
    }
}

function loadSurveyPage() {
    //lazy loading
    if(window.userFormInit) {
        window.userFormInit();
        updateStylesheet("../user-form/style.css");
    } else {
        import('../user-form/script.js')
            .then(m => {
                m.userFormInit();
                updateStylesheet("../../css/user-form/style.css");
            })
            .catch(err => console.error('Failed to load create survey script:', err));
    }
}

function updateStylesheet(href) {
    let link = document.querySelector('link[rel="stylesheet"]');
        link.setAttribute("href", href);
}

