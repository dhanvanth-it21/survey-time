import { sideBarInit } from "./side-bar.js"
import { navBarInit } from "./nav-bar.js"
import { surveyListInit } from "./survey-list.js"



export function adminPageInit() {
    //initializing the navBar
    navBarInit();
    
    const div = document.createElement('div');
    div.className = 'body-container';
    document.body.appendChild(div);
    
    //initializing the sideBar, appending the sideBar to the div
    sideBarInit(div);
    
    const page = document.createElement('div');
    page.className = 'page';
    div.appendChild(page);
}



