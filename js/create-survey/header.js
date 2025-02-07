import { createElement } from "../generator.js";
import { navBarElements, headingElements } from "./data.js";

// here the nav bar is created and appended to the body
export const navBarInit = () => createElement(navBarElements, document.body);


// here the form heading is created and appended to the body
export const headingInit = () => createElement(headingElements, document.body);

//

