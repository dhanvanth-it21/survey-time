import { createElement } from '../generator.js';
import { sideBar } from './data.js';
import { surveyListInit } from './survey-list.js';
import { responseListInit } from './response-list.js';
import { navigateTo } from '../../script.js';

export function sideBarInit(div) {
    createElement(sideBar, div);
    const surveyList = document.querySelector('.survey-list');
    const responseList = document.querySelector('.response-list');
    surveyList.addEventListener('click', () => {
        navigateTo('admin/survey-list', false);
    });
    responseList.addEventListener('click', () => {
        // const page = document.querySelector('.page');
        // page.innerHTML = '';
        // responseListInit(page);
        navigateTo('admin/response-list', false);
    });
}

