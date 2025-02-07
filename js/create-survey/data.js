//question container includes input for question and dropdown for container for list of types
export const questionContainer = [
  {
    tag: "div",
    class: "question-container container-box",
    children: [
      {
        tag: "div",
        class: "question-selection",
        children: [
          {
            tag: "textarea",
            placeholder: "Question",
          },
          {
            tag: "div",
            class: "question-type-selection-container",
            children: [
              {
                tag: "div",
                class: "select-btn",
                children: [
                  {
                    tag: "div",
                    class: "question-type",
                  },
                  {
                    tag: "i",
                    class: "fa-solid fa-caret-down",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "question-separator",
        attributes: {
          style: "border-top:1px solid rgba(0,0,0,0.1); margin-top: 20px",
        },
      },
      {
        tag: "div",
        class: "question-selected-type-container",
      },
      {
        tag: "div",
        class: "question-separator",
        attributes: {
          style: "border-top:1px solid rgba(0,0,0,0.1);",
        },
      },
      {
        tag: "div",
        class: "question-container-footer",
        children: [
          {
            tag: "button",
            class: "validate",
            text: "Validate",
          },
          required(),
        ],
      },
    ],
  },
];

// it includes list of types of question for the container in question container
export const questionTypeOptionList = [
  {
    tag: "div",
    class: "question-type-options",
    children: [
      {
        tag: "ul",
        class: "options",
        children: [
          // Multiple Choice
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-circle-dot",
              },
              {
                tag: "span",
                text: "Multiple Choice",
              },
            ],
          },
          //Check Box
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-square-check",
              },
              {
                tag: "span",
                text: "Checkboxes",
              },
            ],
          },
          //Drop Dowm
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-square-caret-down",
              },
              {
                tag: "span",
                text: "Drop Down",
              },
            ],
          },
          // Paragraph
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-file-lines",
              },
              {
                tag: "span",
                text: "Paragraph",
              },
            ],
          },
          // Number
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-solid fa-hashtag",
              },
              {
                tag: "span",
                text: "Number",
              },
            ],
          },
          // Date
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-calendar-days",
              },
              {
                tag: "span",
                text: "Date",
              },
            ],
          },
          //Time
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-clock",
              },
              {
                tag: "span",
                text: "Time",
              },
            ],
          },
          //Upload Image
          {
            tag: "li",
            class: "option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-image",
              },
              {
                tag: "span",
                text: "Upload Image",
              },
            ],
          },
        ],
      },
    ],
  },
];

//side menu elements
export const sideMenuElements = [
  {
    tag: "div",
    class: "side-menu",
    children: [
      {
        tag: "div",
        class: "add-question",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-plus",
          },
        ],
      },
      {
        tag: "div",
        class: "delete-question",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-trash",
          },
        ],
      },
    ],
  },
];

//nav bar elements
export const navBarElements = [
  {
    tag: "nav",
    children: [
      {
        tag: "div",
        class: "nav-container",
        children: [
          {
            tag: "div",
            class: "nav-form-info",
            children: [
              {
                tag: "div",
                class: "nav-logo",
                children: [
                  {
                    tag: "i",
                    class: "fa-solid fa-clipboard-list",
                  },
                ],
              },
              {
                tag: "div",
                class: "nav-title",
                children: [
                  {
                    tag: "h1",
                    text: "Survey Time",
                  },
                  {
                    tag: "div",
                    class: "underline",
                  },
                ],
              },
            ],
          },
          {
            tag: "div",
            class: "nav-form-account",
            children: [
              {
                tag: "div",
                class: "nav-from-account-details",
                children: [
                  {
                    tag: "button",
                    class: "top-validate",
                    text: "Validate",
                  },
                  {
                    tag: "button",
                    class: "create",
                    text: "Create",
                  },
                  {
                    tag: "button",
                    class: "discard",
                    text: "Discard",
                  },
                  {
                    tag: "div",
                    class: "nav-form-settings",
                    children: [
                      {
                        tag: "i",
                        class: "fa-solid fa-ellipsis-vertical",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

//heading of the form elements
export const headingElements = [
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
                tag: "input",
                class: "form-heading-title-input",
                attributes: {
                  placeholder: "Survey Title",
                  type: "text",
                },
              },
            ],
          },
          {
            tag: "div",
            class: "form-heading-discription-div",
            children: [
              {
                tag: "input",
                class: "form-heading-discription-input",
                attributes: {
                  type: "text",
                  placeholder: "Survey description (optional)",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

//-------------------------------------------constrains maker functions return json-----------------------------------
//main constrain creater
function constrains(...args) {
  return {
    tag: "div",
    class: "question-constrains",
    children: [...args.map((a) => a())],
  };
}

// required type for each question
function required() {
  return {
    tag: "div",
    class: "required",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "checkbox",
          },
          {
            tag: "p",
            text: " Required",
          },
        ],
      },
    ],
  };
}

// text min character
function minLength() {
  return {
    tag: "div",
    class: "min-length",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 0,
              value: 1,
            },
          },
          {
            tag: "span",
            text: " Min Character",
          },
        ],
      },
    ],
  };
}

// text max character
function maxLength() {
  return {
    tag: "div",
    class: "max-length",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 0,
              value: 2000,
            },
          },
          {
            tag: "span",
            text: " Max Character",
          },
        ],
      },
    ],
  };
}

// checkbox min selection
function minSelection() {
  return {
    tag: "div",
    class: "min-selection",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 1,
              value: 1,
            },
          },
          {
            tag: "span",
            text: " Min Selection",
          },
        ],
      },
    ],
  };
}

// checkbox max selection
function maxSelection() {
  return {
    tag: "div",
    class: "max-selection",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 1,
              value: 1,
            },
          },
          {
            tag: "span",
            text: " Max Selection",
          },
        ],
      },
    ],
  };
}

// number min value
function minValue() {
  return {
    tag: "div",
    class: "min-value",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 0,
              // value: 0,
            },
          },
          {
            tag: "span",
            text: " Min Value",
          },
        ],
      },
    ],
  };
}

// number max value
function maxValue() {
  return {
    tag: "div",
    class: "max-value",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 0,
              // value: 100,
            },
          },
          {
            tag: "span",
            text: " Max Value",
          },
        ],
      },
    ],
  };
}

// start date
function startDate() {
  return {
    tag: "div",
    class: "start-date",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "date",
          },
          {
            tag: "span",
            text: " Start Date",
          },
        ],
      },
    ],
  };
}

// end date
function endDate() {
  return {
    tag: "div",
    class: "end-date",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "date",
          },
          {
            tag: "span",
            text: " End Date",
          },
        ],
      },
    ],
  };
}

// start time
function startTime() {
  return {
    tag: "div",
    class: "start-time",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "time",
          },
          {
            tag: "span",
            text: " Start Time",
          },
        ],
      },
    ],
  };
}

// end time
function endTime() {
  return {
    tag: "div",
    class: "end-time",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "time",
          },
          {
            tag: "span",
            text: " End Time",
          },
        ],
      },
    ],
  };
}

// this has a arr of image extension and returns them by json format
function imageTypeSelectionhelper() {
  const arr = ["jpeg", "png", "gif", "tiff", "svg", "webp"];
  const returnArr = [];
  arr.forEach((ext) => {
    returnArr.push({
      tag: "label",
      children: [
        {
          tag: "input",
          type: "checkbox",
          attributes: {
            value: `.${ext}`,
          },
        },
        {
          tag: "span",
          text: ` ${ext.toUpperCase()}`,
        },
      ],
    });
  });
  return returnArr;
}

// file image type selection
function imageTypeSelection() {
  return {
    tag: "div",
    class: "image-type-selection",
    children: [...imageTypeSelectionhelper()],
  };
}

// file image type size selection
function imageSize() {
  return {
    tag: "div",
    class: "image-size",
    children: [
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "number",
            attributes: {
              min: 0,
              value: 5,
            },
          },
          {
            tag: "span",
            text: " Max Size (MB)",
          },
        ],
      }
    ]
  }
}

// -------------------------------------------Question Types and its option--------------------------------------------
//radio
export const markdown = [
  {
    tag: "div",
    class: "markdown-container",
    children: [
      {
        tag: "div",
        class: "markdown-options",
        children: [
          {
            tag: "div",
            class: "markdown-option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-circle",
              },
              {
                tag: "input",
                type: "text",
                placeholder: "Option",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "markdown-add-option",
        children: [
          {
            tag: "i",
            class: "fa-regular fa-circle",
          },
          {
            tag: "button",
            text: "Add another",
          },
        ],
      },
    ],
  },
  constrains(),
];
export const markdownOption = [
  {
    tag: "div",
    class: "markdown-option",
    children: [
      {
        tag: "i",
        class: "fa-regular fa-circle",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Option",
      },
      {
        tag: "button",
        class: "markdown-option-close",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-x",
          },
        ],
      },
    ],
  },
];
//------------------

//checkbox
export const markdownCheckbox = [
  {
    tag: "div",
    class: "markdown-container",
    children: [
      {
        tag: "div",
        class: "markdown-options",
        children: [
          {
            tag: "div",
            class: "markdown-option",
            children: [
              {
                tag: "i",
                class: "fa-regular fa-square",
              },
              {
                tag: "input",
                type: "text",
                placeholder: "Option",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "markdown-add-option",
        children: [
          {
            tag: "i",
            class: "fa-regular fa-square",
          },
          {
            tag: "button",
            text: "Add another",
          },
        ],
      },
    ],
  },
  constrains(minSelection, maxSelection),
];
export const markdownCheckboxOption = [
  {
    tag: "div",
    class: "markdown-option",
    children: [
      {
        tag: "i",
        class: "fa-regular fa-square", // This will be the checkbox icon
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Option", // Placeholder for text input
      },
      {
        tag: "button",
        class: "markdown-option-close",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-x", // Close button icon
          },
        ],
      },
    ],
  },
];
//---------------------

//dropdown
export const markdownDropdown = [
  {
    tag: "div",
    class: "markdown-container",
    children: [
      {
        tag: "div",
        class: "markdown-options",
        children: [
          {
            tag: "div",
            class: "markdown-option",
            children: [
              {
                tag: "p",
                class: "num-sequence",
              },
              {
                tag: "input",
                type: "text",
                placeholder: "Option",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "markdown-add-option",
        children: [
          {
            tag: "p",
            class: "num-sequence",
          },
          {
            tag: "button",
            text: "Add another",
          },
        ],
      },
    ],
  },
  constrains(),
];
export const markdownDropdownOption = [
  {
    tag: "div",
    class: "markdown-option",
    children: [
      {
        tag: "p",
        class: "num-sequence",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Option", // Placeholder for text input
      },
      {
        tag: "button",
        class: "markdown-option-close",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-x", // Close button icon
          },
        ],
      },
    ],
  },
];
//------------------

//paragraph
export const paragraph = [
  {
    tag: "div",
    class: "paragraph-container",
    children: [
      {
        tag: "textarea",
        class: "paragraph-textarea",
        placeholder: "Paragraph text",
        disabled: true,
      },
    ],
  },
  constrains(minLength, maxLength),
];
//------------------

//time
export const timeType = [
  {
    tag: "div",
    class: "time-type-container",
    children: [
      {
        tag: "input",
        type: "time",
        class: "time-type",
        disabled: true,
      },
    ],
  },
  constrains(startTime, endTime),
];
//----------------

//data
export const dateType = [
  {
    tag: "div",
    class: "date-type-container",
    children: [
      {
        tag: "input",
        type: "date",
        class: "date-type",
        disabled: true,
      },
    ],
  },
  constrains(startDate, endDate),
];
//------------------

// Number
export const numberRange = [
  {
    tag: "div",
    class: "number-range-type-container",
    children: [
      {
        tag: "input",
        type: "number",
        class: "number-range-type",
        disabled: true,
        placeholder: "number as input",
      },
    ],
  },
  constrains(minValue, maxValue),
];
//------------------

//image
export const fileImage = [
  {
    tag: "div",
    class: "file-image-type-container",
    children: [
      {
        tag: "input",
        type: "file",
        class: "file-image-type",
        disabled: true,
      },
    ],
  },
  constrains(imageTypeSelection,imageSize),
];
//------------------



