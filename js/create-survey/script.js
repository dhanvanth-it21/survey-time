import {
  sideMenuEventListener,
  sideMenuInit,
} from "./sidemenu.js";
import { headingInit, navBarInit } from "./header.js";
import { convertToJson } from "./form-json.js";
import { completeValidation, singleQCValidation } from "./validator.js";

export function createSurveyInit() {
  navBarInit(); //nav bar creation
  headingInit(); //form heading creation
  sideMenuInit(); // side menu creation
  sideMenuEventListener(document.querySelector(".form-body-container > div")); // adding event listener to the heading container
  // validation part for qeustion container and the form heading
  const create = document.querySelector(".create");
  create.addEventListener("click", () => {
    if (completeValidation()) {
      const json = convertToJson();
    }
  });
  const validate = document.querySelector(".top-validate");
  validate.addEventListener("click", () => completeValidation());
}