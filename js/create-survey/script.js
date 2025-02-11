import { sideMenuEventListener, sideMenuInit } from "./sidemenu.js";
import { headingInit, navBarInit } from "./header.js";
import { convertToJson } from "./form-json.js";
import { completeValidation, singleQCValidation } from "./validator.js";
import { navigateTo, serverIp } from "../../script.js";


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
      postSurvey(json);
      swal(
        "Survey Published",
        "Your survey has been published successfully!",
        "success"
      );
      navigateTo("admin");
    }
  });
  // adding event listener to validate
  const validate = document.querySelector(".top-validate");
  validate.addEventListener("click", () => completeValidation());
}

function postSurvey(json) {
  const apiuri = `http://${serverIp}:8080/survey`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      surveyObject: json,
    }),
  };

  fetch(apiuri, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
