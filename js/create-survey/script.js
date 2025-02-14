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
    const isCompletlyValidated = completeValidation();
    if (isCompletlyValidated) {
      const json = convertToJson();
      postSurvey(json);
      swal(
        "Survey Created",
        "This Survey is now available for users to take",
        "success"
      ).then(() => {
        navigateTo("admin");
      });
    }
    else {
      swal(
        "Please meet the question constrains",
        "Please Check at warning signs",
        "warning"
      );
    }
  });
  // adding event listener to validate
  const validate = document.querySelector(".top-validate");
  validate.addEventListener("click", () => completeValidation());

  // adding event listener to discard button
  const discard = document.querySelector(".discard");
  discard.addEventListener("click", () => {
    swal({
      title: "Are you sure?",
      text: "On discarding current survey will be lost",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((ok) => {
      if (ok) {
        navigateTo("admin");
        swal("Survey Discarded", "Redirected to Survey-List", "success");
      }
    });
  });
}

async function postSurvey(json) {
  const apiuri = `http://${serverIp}/survey`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({surveyObject: json}),
  };

  const response = await fetch(apiuri, requestOptions)
  if (!response.ok) {
    const error = await response.text();
    console.error("Error:", error);
}
}
