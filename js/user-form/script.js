import { createElement } from "../generator.js";
import { userJsonConverter } from "./user-json-converter.js";
import { survey, navBar } from "./data.js";
import { isFormValid } from "./user-validation.js";
import { navigateTo, serverIp } from "../../script.js";

export async function userFormInit(id, name, email) {
  //initializing the navBar

  createElement(navBar, document.body);

  const survey = await fetchSurveyCard(id);
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
    const isFormValidated = isFormValid();
    if (isFormValidated) {
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
      swal("Response Submited", "Your response has been recoreded", "success")
      .then(() => navigateTo("user"));
    }
  });
}

export async function AdminPreviewInit(id) {
  createElement(navBar, document.body);

  const submit = document.querySelector(".submit");
  submit.style.display = "none";

  const survey = await fetchSurveyCard(id);
  userPage(survey.surveyObject);

  //user page
  function userPage(survey) {
    createElement(userJsonConverter(survey), document.body);
    const inputList = document.querySelectorAll("input");
    inputList.forEach((input) => {
      input.disabled = true;
    });
    const textAreaList = document.querySelectorAll("textarea");
    textAreaList.forEach((textarea) => {
      textarea.disabled = true;
    });
  }
}

export async function AdminResponseInit(id, surveyId) {
  createElement(navBar, document.body);

  const submit = document.querySelector(".submit");
  submit.style.display = "none";

  const survey = (await fetchSurveyCard(surveyId)).surveyObject;
  console.log(survey);

  //fetching the response
  const response = (await fetchResponse(id)).responseObject;
  console.log(response);

  //mark the response

  userPage(survey, response);

  //user page
  function userPage(survey, response) {
    createElement(userJsonConverter(survey, response), document.body);
    const inputList = document.querySelectorAll("input");
    inputList.forEach((input) => {
      input.disabled = true;
    });
    const textAreaList = document.querySelectorAll("textarea");
    textAreaList.forEach((textarea) => {
      textarea.disabled = true;
    });
    const selectList = document.querySelectorAll("select");
    selectList.forEach((select) => {
      select.disabled = true;
    });

    markAnswer(response);
  }
}

function markAnswer(response) {
  //marking the response
  const questionOptions = document.querySelectorAll(".question-options");
  questionOptions.forEach((questionOption) => {
    const name = questionOption.getAttribute("name");
    const answer = response[name];
    if (answer) {
      const inputs = questionOption.querySelectorAll("input");
      inputs.forEach((input) => {
        if (Array.isArray(answer)) {
          if (answer.includes(input.value)) {
            input.checked = true;
          }
        } else {
          if (input.value === answer) {
            input.checked = true;
          }
        }
      });
    }
  });

  //populating dropdowns
  const dropdowns = document.querySelectorAll("select");
  dropdowns.forEach((dropdown) => {
    const name = dropdown.getAttribute("name");
    const answer = response[name];
    if (answer) {
      dropdown.value = answer;
    }
  });

  //populating textareas
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    const name = textarea.getAttribute("name");
    const answer = response[name];
    if (answer) {
      textarea.value = answer;
    }
  });

  //populating number inputs
  const numberInputs = document.querySelectorAll("input[type='number']");
  numberInputs.forEach((input) => {
    const name = input.getAttribute("name");
    const answer = response[name];
    if (answer) {
      input.value = answer;
    }
  });

  //populating date inputs
  const dateInputs = document.querySelectorAll("input[type='date']");
  dateInputs.forEach((input) => {
    const name = input.getAttribute("name");
    const answer = response[name];
    if (answer) {
      input.value = answer;
    }
  });

  //populating time inputs
  const timeInputs = document.querySelectorAll("input[type='time']");
  timeInputs.forEach((input) => {
    const name = input.getAttribute("name");
    const answer = response[name];
    if (answer) {
      input.value = answer;
    }
  });
}

async function fetchResponse(id) {
  const apiuri = `http://${serverIp}:8080/responses/${id}`;

  const response = await fetch(apiuri);

  const data = await response.json();
  return data;
}

async function fetchSurveyCard(id) {
  const apiuri = `http://${serverIp}:8080/survey/${id}`;

  const response = await fetch(apiuri);

  const data = await response.json();
  return data;
}

function postResponse(response) {
  const apiuri = `http://${serverIp}:8080/responses`;
  const responseOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
  fetch(apiuri, responseOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
