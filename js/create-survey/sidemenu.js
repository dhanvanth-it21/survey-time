// Import dependencies
import { createElement } from "../generator.js";

import {
  questionContainerFun,
  deleteQuestionContainerFun,
} from "./question-container.js";

import { sideMenuElements } from "./data.js";



// here the side menu is created and appended to the body
export const sideMenuInit = () => {
  createElement(sideMenuElements, document.body);
  // event listner for add question button in the sidemenu
  const addQuestion = document.querySelector(".add-question");
  addQuestion.addEventListener("click", () => {
    questionContainerFun();
    sideMenuPosition(document.querySelector(".active-box"));
  });
  // event listner for delete question button in the sidemenu
  const deleteQuestion = document.querySelector(".delete-question");
  deleteQuestion.addEventListener("click", () => {
    deleteQuestionContainerFun();
    // sideMenuPosition(document.querySelector(".active-box"));
  });
  //handling the active-box after deleting a question container
  // deleteQuestion.addEventListener("click", () => {
  // });
};



//select the active div and adjust the sidemenu to the div's scaling accordingly
//achieved by using a click event listener for the div

export function sideMenuEventListener(div) {
  div.addEventListener("click", () => {
    //Marking the active div
    removeOtherActiveBox();
    div.classList.add("active-box");
    sideMenuPosition(div);
  });
}


//positioning the sidemenu to the active-box 
export function sideMenuPosition(div) {
  //side-menu positioning
  const rect = div.getBoundingClientRect();
  const sideMenu = document.querySelector(".side-menu");
  sideMenu.style.left = `${rect.right  + 10}px`;
  sideMenu.style.top = `${rect.top + window.scrollY + rect.height - 120}px`;
  sideMenu.style.height = `120px`;
  sideMenu.style.display = "flex";
}

function removeOtherActiveBox() {
  const listOfDiv = document.querySelectorAll(".form-body-container > div");
  listOfDiv.forEach((div) => {
    div.classList.remove("active-box");
  });
}
