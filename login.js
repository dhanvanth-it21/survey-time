 import { navBar } from "./data.js";
 import { login } from "./data.js";
 import { navigateTo } from "./script.js";
 import { createElement } from "./js/generator.js";

 export function loginInit() {
      createElement(navBar, document.body);
      createElement(login, document.body);
    
      document.getElementById("admin-button").addEventListener("click", () => {
        navigateTo("admin");
        
      });
    
      document.getElementById("user-button").addEventListener("click", () => {
        navigateTo("user");
      });

 }

