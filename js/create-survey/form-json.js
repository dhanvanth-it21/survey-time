// return the type of question
function getType(type) {
  switch (type) {
    case "Multiple Choice":
      return "radio";
    case "Checkboxes":
      return "checkbox";
    case "Drop Down":
      return "select";
    case "Date":
      return "date";
    case "Time":
      return "time";
    case "Paragraph":
      return "text";
    case "Number":
      return "number";
    case "Upload Image": 
      return "file"
    default:
      return "text";
  }
}

// json format coverter helper
function convert() {
  const survey = {};
  //form-heading-details
  const formTitle = document.querySelector(".form-heading-title-input");
  const formDescription = document.querySelector(
    ".form-heading-discription-input"
  );

  //setting title and description
  survey.title = formTitle.value;
  survey.description = formDescription.value === "" ? "---" : formDescription.value;
  survey.active = true;

  //now selecting the questions
  const questionsContainers = document.querySelectorAll(".question-container");

  // this will contain the each question respective json format
  const questions = [];

  // iterating to each question container and creating respective json
  questionsContainers.forEach((questionContainer) => {
    const questionText = questionContainer.querySelector(
      ".question-selection>textarea"
    ).value;
    const questionRequired = questionContainer.querySelector(
      "div.question-container-footer > div > label > input[type=checkbox]"
    ).checked;
    const questionType = getType(
      questionContainer.querySelector(".question-type>span").textContent
    );

    //basic question json details and format created
    const question = {
      questionId: questions.length + 1, //question number
      question: questionText, //actual question
      type: questionType, // type of the question
      required: questionRequired, // required parameter
    };

    // ---->  now setting the constainer to the json

    //min and max for text
    if (questionType === "text") {
      const questionMinLength = questionContainer.querySelector(
        "div.question-constrains > .min-length > label > input"
      ).value;
      const questionMaxLength = questionContainer.querySelector(
        "div.question-constrains > .max-length > label > input"
      ).value;
      question.minLength = questionMinLength;
      question.maxLength = questionMaxLength;
    }

    // min and max for checkbox
    if (questionType === "checkbox") {
      const questionMinSelection = questionContainer.querySelector(
        "div.question-constrains > .min-selection > label > input"
      ).value;
      const questionMaxSelection = questionContainer.querySelector(
        "div.question-constrains > .max-selection > label > input"
      ).value;
      question.minSelection = questionMinSelection;
      question.maxSelection = questionMaxSelection;
    }

    // min and max for date
    if (questionType === "date") {
      const questionStartDate = questionContainer.querySelector(
        "div.question-constrains > .start-date > label > input"
      ).value;
      const questionEndDate = questionContainer.querySelector(
        "div.question-constrains > .end-date > label > input"
      ).value;
      question.startDate = questionStartDate;
      question.endDate = questionEndDate;
    }

    // min and max for time
    if (questionType === "time") {
      const questionStartTime = questionContainer.querySelector(
        "div.question-constrains > .start-time > label > input"
      ).value;
      const questionEndTime = questionContainer.querySelector(
        "div.question-constrains > .end-time > label > input"
      ).value;
      question.startTime = questionStartTime;
      question.endTime = questionEndTime;
    }

    // min and max for number
    if (questionType === "number") {
      const questionMinVlaue = questionContainer.querySelector(
        "div.question-constrains > .min-value > label > input"
      ).value;
      const questionMaxVlaue = questionContainer.querySelector(
        "div.question-constrains > .max-value > label > input"
      ).value;
      question.minValue = questionMinVlaue;
      question.maxValue = questionMaxVlaue;
    }

    // file uploading only image
    if (questionType === "file" && questionContainer.querySelector("div.question-constrains > div.image-type-selection")) {
      const checkedTpyes = Array.from(
        questionContainer.querySelectorAll(
          "div.question-constrains > div.image-type-selection > label > input"
        )
      ).filter((ext) => ext.checked === true);
      const imageTypes = checkedTpyes.map((ext) => {
          return ext.value;
      }).reduce((a, ext) => `${a}${ext}, `, "");
      question.accept = imageTypes;
      question.size = questionContainer.querySelector("div.question-constrains > div.image-size > label > input").value;
    }

    // radio, checkbox, dropdown have options, a options obj created and added to the json
    if (
      questionType === "radio" ||
      questionType === "checkbox" ||
      questionType === "select"
    ) {
      const options = {};
      const optionsList =
        questionContainer.querySelectorAll(".markdown-option");
      // index as key and option as value
      optionsList.forEach((option, index) => {
        options[index] = option.querySelector("input").value;
      });
      question.options = options;
    }

    //pushing to questions array
    questions.push(question);
  });

  //adding to survey json (final json format)
  survey.questions = questions;
  return survey;
}

//function triggerd after the create button clicked and validation completed successfully
// and return the json format
export function convertToJson() {
  const survey = convert();
  console.log(JSON.stringify(survey, null, 2));
  return survey;
}

// this is the example json format of complete form
//helped to built the converter
const eg = [
  {
    tag: "div",
    class: "form-body-container",
    children: [
      {
        tag: "div",
        class: "form-heading container-box",
        children: [
          {
            tag: "div",
            class: "form-heading-title-div",
            children: [
              {
                tag: "h1",
                text: "Survey Title",
              },
            ],
          },
          {
            tag: "div",
            class: "form-heading-discription-div",
            children: [
              {
                tag: "p",
                text: "Form description (optional)",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "What is your favorite color?",
              },
              {
                tag: "div",
                class: "question-options",
                children: [
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "radio",
                          name: "question1",
                          value: "option1",
                        },
                      },
                      {
                        text: "Option 1",
                      },
                    ],
                  },
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "radio",
                          name: "question1",
                          value: "option2",
                        },
                      },
                      {
                        text: "Option 2",
                      },
                    ],
                  },
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "radio",
                          name: "question1",
                          value: "option3",
                        },
                      },
                      {
                        text: "Option 3",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "Question 2",
              },
              {
                tag: "div",
                class: "question-options",
                children: [
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "checkbox",
                          name: "question2",
                          value: "option4",
                        },
                      },
                      {
                        text: "Option 4",
                      },
                    ],
                  },
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "checkbox",
                          name: "question2",
                          value: "option5",
                        },
                      },
                      {
                        text: "Option 5",
                      },
                    ],
                  },
                  {
                    tag: "label",
                    children: [
                      {
                        tag: "input",
                        attributes: {
                          type: "checkbox",
                          name: "question2",
                          value: "option6",
                        },
                      },
                      {
                        text: "Option 6",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "Question 3",
              },
              {
                tag: "select",
                attributes: {
                  name: "question3",
                  class: "dropdown",
                },
                children: [
                  {
                    tag: "option",
                    attributes: {
                      value: "option7",
                    },
                    text: "Option 7",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "option8",
                    },
                    text: "Option 8",
                  },
                  {
                    tag: "option",
                    attributes: {
                      value: "option9",
                    },
                    text: "Option 9",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "Question 4",
              },
              {
                tag: "textarea",
                attributes: {
                  name: "question4",
                  class: "text-input",
                },
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "Question 5",
              },
              {
                tag: "input",
                attributes: {
                  type: "date",
                  name: "question5",
                  class: "date-input",
                },
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-container container-box",
        children: [
          {
            tag: "div",
            class: "question-item",
            children: [
              {
                tag: "h2",
                class: "question-title",
                text: "Question 6",
              },
              {
                tag: "input",
                attributes: {
                  type: "time",
                  name: "question6",
                  class: "time-input",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
