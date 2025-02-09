import { createElement } from "../generator.js";
import { userJsonConverter } from "./user-json-converter.js";
import { survey, navBar } from "./data.js";
import { isFormValid } from "./user-validation.js";
import { serverIp } from "../../script.js";

export async function userFormInit(id) {
  //initializing the navBar

  createElement(navBar, document.body);

  const survey  = await  fetchSurveyCard(id);
  userPage(survey.surveyObject);

  //user page
  function userPage(survey) {
    createElement(userJsonConverter(survey), document.body);
  }

  //-------------------------------adding the constrains to the user question and answer
  // checking for the validation error are persent and return the error message
  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (isFormValid()) {
      const formData = new FormData(document.querySelector("form"));
      const formObject = {};
      formData.forEach((value, key) => {
        //if condition is for the checkboxs multiple values
        if (formObject[key]) {
          if (!Array.isArray(formObject[key])) {
            formObject[key] = [formObject[key]];
          }
          formObject[key].push(value);
        }
        //else condition is for the single value
        else {
          formObject[key] = value;
        }
      });
      console.log(formObject);
    }
  });
}


async function fetchSurveyCard(id) {
  const apiuri = `http://${serverIp}:8080/survey/${id}`;

  const response = await fetch(apiuri);

  const data =  await response.json();
  return data;
}