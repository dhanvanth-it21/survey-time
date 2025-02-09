//-----------------------------------validation-------------------------------------->start-----------

//(validation-helper) : radio question
function radioQuestionConstrain(questionContainer, question) {
  const isRequired = question.getAttribute("required") === "true";
  if (isRequired) {
    //handling the input to be checked
    const noAns = Array.from(
      questionContainer.querySelectorAll("div.question-options > label > input")
    ).filter((tag) => tag.checked === true).length;
    if (noAns === 0) return "This question is required";
  }
  return null;
}

//(validation-helper) : checkbox question
function checkBoxQuestionConstrain(questionContainer, question) {
  const isRequired = question.getAttribute("required") === "true";
  const noAns = Array.from(
    questionContainer.querySelectorAll("div.question-options > label > input")
  ).filter((tag) => tag.checked === true).length;
  if (isRequired) {
    //handling the input to be checked
    if (noAns === 0) return "This question is required";
  }
  if (!isRequired && noAns !== 0) {
    const minSelection = parseInt(question.getAttribute("min_selection"));
    const maxSelection = parseInt(question.getAttribute("max_selection"));
    const noAns = Array.from(
      questionContainer.querySelectorAll("div.question-options > label > input")
    ).filter((tag) => tag.checked === true).length;
    if (!(noAns >= minSelection && noAns <= maxSelection)) {
      if (minSelection === maxSelection)
        return `${minSelection} and only must be checked`;
      return `Checked  option should between ${minSelection} and ${maxSelection}`;
    }
  }

  return null;
}

//(validation-helper) : select question
function selectQuestionConstrain(questionContainer, question) {
  const isRequired = question.getAttribute("required") === "true";
  if (isRequired) {
    //handling the input to be checked
    const questionItem = questionContainer.querySelector("div.question-item");
    const selectTag = questionItem.querySelector("select");
    if (selectTag.value === "") return "This question is required";
  }
  return null;
}

//(validation-helper) : text question
function textQuestionConstrain(questionContainer, question) {
  const isRequired = question.getAttribute("required") === "true";
  if (isRequired) {
    //handling the input to be checked
    const questionItem = questionContainer.querySelector("div.question-item");
    const textTag = questionItem.querySelector("textarea");
    if (textTag.value === "") return "This question is required";
  }
  const textLength = questionContainer.querySelector("div.question-item > textarea").value.length;
  if(!(question.getAttribute("min_length") && question.getAttribute("max_length"))) return null;
  if(!(textLength === 0)) {
    const min_length = parseInt(question.getAttribute("min_length"));
    const max_length = parseInt(question.getAttribute("max_length"));
    if(!(textLength >= min_length && textLength <= max_length)) {
      return `Number of character should be between ${min_length} and ${max_length}`;
    }
  }
  return null;
}

//(validation-helper) : number question
function numberQuestionConstrain(questionContainer, question) {
  const isRequired = question.getAttribute("required") === "true";
  if (isRequired) {
    const questionItem = questionContainer.querySelector("div.question-item");
    const numberTag = questionItem.querySelector("input");
    if (numberTag.value === "") return "This question is required";
  }
  const numberValue = questionContainer.querySelector("div.question-item > input").value;
  if(!(question.getAttribute("min_value") && question.getAttribute("max_value"))) return null;
  if(!(numberValue === "")) {
    const min_value = parseInt(question.getAttribute("min_value"));
    const max_value = parseInt(question.getAttribute("max_value"));
    if(!(numberValue >= min_value && numberValue <= max_value)) {
      return `allowed value should be between ${min_value} and ${max_value}`;
    }
  }
  return null;
}

//(error-helper) : returns a "p-tag" element with the error text and class as "error"
function errorText(text) {
  const error = document.createElement("p");
  error.className = "error";
  error.textContent = text;
  return error;
}

//(error-helper) :  Remove  previous error messages with the provided place
function removeError(place = document) {
  const previousError = place.querySelectorAll(".error");
  previousError.forEach((error) => {
    error.remove();
  });
}

//(error-helper) : applying the error message to the respective container
function applyErrorMessage(questionContainer, errorMessage) {
  const questionItem = questionContainer.querySelector(".question-item");
  const errorTag = errorText(errorMessage);
  questionItem.insertAdjacentElement("afterend", errorTag);
  errorTag.innerText = `*${errorMessage}`;
}

// (((main))) -----> complete validation for the user page
function validatorForUser() {
  removeError();
  const questionArr = document.querySelectorAll(".question-container");
  //traversing each question for validation
  questionArr.forEach((questionContainer) => {
    //handling with different type of tyes of input
    const question = questionContainer.querySelector("div.question-item > h2");
    const questionType = question.getAttribute("question_type");
    let errorMessage = null;
    // switch case to identify the question type
    switch (questionType) {
      case "radio": {
        errorMessage = radioQuestionConstrain(questionContainer, question);
        break;
      }
      case "checkbox": {
        errorMessage = checkBoxQuestionConstrain(questionContainer, question);
        break;
      }
      case "select": {
        errorMessage = selectQuestionConstrain(questionContainer, question);
        break;
      }
      case "text": {
        errorMessage = textQuestionConstrain(questionContainer, question);
        break;
      }
      case "number": {
        errorMessage = numberQuestionConstrain(questionContainer, question);
        break;
      }
    }
    //calling for errormessage to be displayed in FE
    if (errorMessage) {
      applyErrorMessage(questionContainer, errorMessage);
    }
  });
}

//-----------------------------------validation-------------------------------------->end-----------



export function isFormValid() {
    validatorForUser();
    const error = document.querySelector(".error");
    if (error) {
        return false;
    }
    return true;
}