// import { surveyListInit } from './survey-list.js';

// export function navigateTo(page) {
//     console.log('Navigating to:', page);
//     history.pushState({}, "", `/admin/${page}`);
//     handleRouteChange();
// }

// function handleRouteChange() {
//     const path  = window.location.pathname.replace("/admin/", "");
    
//     console.log('Route changed:', path);
//     if(path === "create-survey") {
//         loadCreateSurveyPage();
//     } 
// }

// function updateStylesheet(href) {
//     let link = document.querySelector('link[rel="stylesheet"]');
//         link.setAttribute("href", href);
// }

// function loadCreateSurveyPage() {
//     //lazy loading for creating new survey  
//     console.log("loadCreateSurveyPage");
//     document.body.innerHTML = '';
//     if(window.createSurveyInit) {
//         window.createSurveyInit();
//         updateStylesheet("../create-survey/style.css");
//     } else {
//         import('../create-survey/script.js')
//             .then(m => {
//                 m.createSurveyInit();
//                 updateStylesheet("../../css/create-survey/style.css");
//             })
//             .catch(err => console.error('Failed to load create survey script:', err));
//     }
// }



