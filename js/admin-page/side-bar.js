import { createElement } from '../generator.js';
import { sideBar } from './data.js';
import { surveyListInit } from './survey-list.js';
import { responseListInit } from './response-list.js';

export function sideBarInit(div) {
    createElement(sideBar, div);
    const surveyList = document.querySelector('.survey-list');
    const responseList = document.querySelector('.response-list');
    surveyList.addEventListener('click', () => {
        const page = document.querySelector('.page');
        page.innerHTML = '';
        surveyListInit(page);
    });
    responseList.addEventListener('click', () => {
        const page = document.querySelector('.page');
        page.innerHTML = '';
        responseListInit(page);
    });
}

