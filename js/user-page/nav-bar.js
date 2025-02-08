import { createElement } from '../generator.js';
import { navBar } from './data.js';
import { navigateTo } from './routing.js';

export function navBarInit() {
  createElement(navBar, document.body);
}

