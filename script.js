import { createElement } from './js/generator.js';
import { navBar, login } from './data.js';


createElement(navBar, document.body);
createElement(login, document.body);

document.getElementById('admin-button').addEventListener('click', () => {
    import('./js/admin-page/script.js').then(module => {
        const adminPageInit = module.adminPageInit;
        const body = document.body;
        body.innerHTML = '';
        adminPageInit();
        document.querySelector("link").setAttribute("href", "css/admin-page/style.css");
    }).catch(err => {
        console.error('Failed to load admin page script:', err);
    });
});

document.getElementById('user-button').addEventListener('click', () => {
    
});


