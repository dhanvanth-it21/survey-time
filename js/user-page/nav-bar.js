import { createElement } from '../generator.js';
import { navBar } from './data.js';


export function navBarInit() {
  createElement(navBar, document.body);
}

