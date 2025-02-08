import { createElement } from '../generator.js';
import { navBar } from './data.js';
import { navigateTo } from '../../script.js';

export function navBarInit() {
  createElement(navBar, document.body);
  addCreateButtonEventListener();
}

function addCreateButtonEventListener() {
  document.querySelector('.create').addEventListener('click', () => {
    navigateTo('admin/create-survey');
  });
}
