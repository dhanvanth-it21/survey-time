import { createElement } from "../generator.js";
import { userJsonConverter } from "./user-json-converter.js";
import { survey, navBar } from "./data.js";
import { isFormValid } from "./user-validation.js";
import { serverIp } from "../../script.js";

export async function userFormInit(id, name, email) {
  //initializing the navBar

  createElement(navBar, document.body);

  const survey  = await  fetchSurveyCard(id);
  userPage(survey.surveyObject);

  //user page
  function userPage(survey) {
    createElement(userJsonConverter(survey), document.body);
  }

  //-------------------------------adding the constrains to the user question and answer
  // submitting the form data
  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const finalResponse = {
      name: name,
      email: email,
      surveyId: id,
    };
    //checking for the validation error are persent and return the error message
    if (isFormValid()) {
      const formData = new FormData(document.querySelector("form"));
      const responseObject = {};
      formData.forEach((value, key) => {
        //if condition is for the checkboxs multiple values
        if (responseObject[key]) {
          if (!Array.isArray(responseObject[key])) {
            responseObject[key] = [responseObject[key]];
          }
          responseObject[key].push(value);
        }
        //else condition is for the single value
        else {
          responseObject[key] = value;
        }
      });
      finalResponse["responseObject"] = responseObject;
      console.log(finalResponse);
      postResponse(finalResponse);
    }
  });
}



export async  function AdminPreviewInit(id) {
  createElement(navBar, document.body);

  const submit = document.querySelector(".submit");
  submit.style.display = "none";

  const survey  = await  fetchSurveyCard(id);
  userPage(survey.surveyObject);

  //user page
  function userPage(survey) {
    createElement(userJsonConverter(survey), document.body);
    const inputList = document.querySelectorAll("input");
    inputList.forEach(input => {
      input.disabled = true;
    })
    const textAreaList = document.querySelectorAll("textarea");
    textAreaList.forEach(textarea => {
      textarea.disabled = true;
    })
  }

  
}


async function fetchSurveyCard(id) {
  const apiuri = `http://${serverIp}:8080/survey/${id}`;

  const response = await fetch(apiuri);

  const data =  await response.json();
  return data;
}

function postResponse(response) {
  const apiuri = `http://${serverIp}:8080/response`;
  const responseOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  }
  fetch(apiuri, responseOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}