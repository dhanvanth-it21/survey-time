// returns a "p-tag" element with the error text and class as "error"
function errorText(text) {
  const error = document.createElement("p");
  error.className = "error";
  error.textContent = text;
  return error;
}

// --------------------------------------------form heading validation-----------------------------------------
function formHeadingValidation() {
  const formHeading = document.querySelector(".form-heading");
  const formTitle = formHeading.querySelector(".form-heading-title-input");

  // Now validating the form title
  const errorMessage = titleValidationMessage(formTitle.value);
  //if error exists then show below to the formTitle and return false as error detected
  if (errorMessage) {
    formTitle.insertAdjacentElement("afterend", errorText(errorMessage));
    return false;
  }
  return true;
}

// form title validation helper gives the specfic error message
function titleValidationMessage(value) {
  if (value === "") {
    return "*Title is required";
  } else if (value.length < 1) {
    return "*Title must be at least 5 characters";
  } else if (value.length > 100) {
    return "*Title must be less than 100 characters";
  } else if (!/^[a-zA-Z0-9 .,!@#$%^&*()_+=-]*$/.test(value)) {
    return "*Allowed only commonly used special characters";
  }
  return null;
}

//------------------------------------------------- question container validation-------------------------------
//  specific question container validation
function questionContainerValidation(qc) {
  let isCorrect = true;
  // validation for question
  const question = qc.querySelector(".question-selection>textarea");
  const questionErrorMessage = questionValidationMessage(question.value);
  if (questionErrorMessage) {
    qc.querySelector(".question-selection").insertAdjacentElement(
      "afterend",
      errorText(questionErrorMessage)
    );
  }
  // validation for the question type
  const questionTypeErrorMessage = questionTypeValidationMessage(
    qc.querySelector(".question-selected-type-container")
  );
  if (questionTypeErrorMessage) {
    qc.querySelector(".question-selected-type-container").insertAdjacentElement(
      "afterend",
      errorText(questionTypeErrorMessage)
    );
  }
  if (isCorrect && (questionErrorMessage || questionTypeErrorMessage)) {
    isCorrect = false;
  }
  return isCorrect;
}

//  all question container validaiton using foreach loop which calls questionContainerValidation(qc);
function questionContainersValidation() {
  const questionContainers = document.querySelectorAll(".question-container");

  //validation if no question is found
  if (questionContainers.length === 0) {
    document
      .querySelector(".form-body-container")
      .appendChild(errorText("*At least one question is required"));
    return false;
  }
  let isCorrect = true;
  // validation for each question container
  questionContainers.forEach((qc) => {
    isCorrect = questionContainerValidation(qc);
  });
  return isCorrect;
}

// question validation helper for the question and return the error message
function questionValidationMessage(value) {
  if (value === "") {
    return "*Question is required";
  } else if (value.length < 1) {
    return "*Question must be at least 5 characters";
  } else if (value.length > 2000) {
    return "*Question must be less than 2000 characters";
  } 
  // else if (!/^[a-zA-Z0-9 .,!@#$%^&*()_+=-]*$/.test(value)) {
  //   return "*Allowed only commonly used special characters";
  // }
  return null;
}

// question type validation helper for the question type selected and return the error message
function questionTypeValidationMessage(questionTypeContainer) {
  // if it contains the markdown container the validation
  // for both radio and checkbox same validation
  if (questionTypeContainer.querySelector(".markdown-container")) {
    const qtc = questionTypeContainer.querySelector(".markdown-container");
    const markdownOptions = qtc.querySelectorAll(".markdown-option");

    // -----------------------this is for the checkbox----------start
    const minSelection = questionTypeContainer.querySelector(
      ".question-constrains > div.min-selection > label > input"
    );
    const maxSelection = questionTypeContainer.querySelector(
      ".question-constrains > div.max-selection > label > input"
    );
    let minSelec = minSelection ? minSelection.value : null;
    let maxSelec = maxSelection ? maxSelection.value : null;
    // -----------------------this is for the checkbox----------end

    let errorMessage = null;
    // taking each option and checking the validation
    markdownOptions.forEach((option) => {
      const value = option.querySelector("input").value;
      if (value === "") {
        errorMessage = "*Option is empty";
      } else if (value.length < 1) {
        errorMessage = "*Option must be at least 5 characters";
      } else if (value.length > 200) {
        errorMessage = "*Option must be less than 100 characters";
      } else if (!/^[a-zA-Z0-9 .,!@#$%^&*()_+=-]*$/.test(value)) {
        errorMessage = "*Allowed only commonly used special characters";
      }

      // -----------------------this is for the checkbox----------start
      else if (minSelec && maxSelec) {
        minSelec = parseInt(minSelec);
        maxSelec = parseInt(maxSelec);
        if (minSelec > maxSelec) {
          errorMessage = "*max character must be greater than min character";
        } else if (
          markdownOptions.length < minSelec ||
          markdownOptions.length < maxSelec
        ) {
          errorMessage =
            "*enter min and max according to the number of options";
        }
      }
      // -----------------------this is for the checkbox----------end
    });
    return errorMessage;
  }
  // this is the validation for textarea
  if (questionTypeContainer.querySelector(".paragraph-container")) {
    let errorMessage = null;
    const min = parseInt(
      questionTypeContainer.querySelector(
        ".question-constrains > div.min-length > label > input"
      ).value
    );
    const max = parseInt(
      questionTypeContainer.querySelector(
        ".question-constrains > div.max-length > label > input"
      ).value
    );
    if (min > max) {
      errorMessage = "*max character must be greater than min character";
    }
    return errorMessage;
  }

  // this is validation for the date
  if (questionTypeContainer.querySelector(".date-type-container")) {
    let errorMessage = null;
    const startDate = questionTypeContainer.querySelector(
      "div.question-constrains > div.start-date > label > input"
    ).value;
    const endDate = questionTypeContainer.querySelector(
      "div.question-constrains > div.end-date > label > input"
    ).value;
    if (new Date(startDate) > new Date(endDate)) {
      errorMessage = "*End date must be after start date";
    }
    return errorMessage;
  }

  // this is validation for the number
  if (questionTypeContainer.querySelector(".number-range-type-container")) {
    //max number must be greater than min number
    let errorMessage = null;
    const minNumber = questionTypeContainer.querySelector(
      ".question-constrains > div.min-value > label > input"
    );
    const maxNumber = questionTypeContainer.querySelector(
      ".question-constrains > div.max-value > label > input"
    );
    let minNum = minNumber ? minNumber.value : null;
    let maxNum = maxNumber ? maxNumber.value : null;
    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);
    if (minNum > maxNum) {
      errorMessage = "*max number must be greater than min number";
    }
    return errorMessage;
  }

  // this is validation for the file acepting only image
  if (questionTypeContainer.querySelector(".file-image-type-container")) {
    //max number must be greater than min number
    let errorMessage = null;
    const checkedTpyes = Array.from(
      questionTypeContainer.querySelectorAll(
        "div.question-constrains > div.image-type-selection > label > input"
      )
    ).filter((ext) => ext.checked === true);

    if (checkedTpyes.length === 0) {
      errorMessage = "*Select at least 1 image extension";
    }

    const imageSize = questionTypeContainer.querySelector("div.question-constrains > div.image-size > label > input");
    if(!imageSize.value || imageSize.value === "0") errorMessage = "*Enter the image size";
    if(parseInt(imageSize.value) >= 25) errorMessage = "*Enter the image size less than 25 MB";
    return errorMessage;
  }

  //other type validation need to be done
}

//-----------------------------------------------------------------------------------------------------------
// Remove  previous error messages with the provided place
function removeError(place = document) {
  const previousError = place.querySelectorAll(".error");
  previousError.forEach((error) => {
    error.remove();
  });
}

// admin complete validation when the create button clicked
export function completeValidation() {
  // Remove all previous error messages
  removeError();

  const fhv = formHeadingValidation();
  const qcv = questionContainersValidation();
  if (fhv && qcv) {
    return true;
  }
  return false;
}

// specfic question container validation --> single-question-container-validation
export function singleQCValidation(qc) {
  removeError(qc);
  return questionContainerValidation(qc);
}


 