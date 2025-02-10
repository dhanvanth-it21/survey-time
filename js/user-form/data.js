export const navBar = [
  {
    "tag": "nav",
    "class": "survey-nav",
    "children": [
      {
        "tag": "div",
        "class": "nav-container",
        "children": [
          {
            "tag": "div",
            "class": "nav-form-info",
            "children": [
              {
                "tag": "div",
                "class": "nav-logo",
                "children": [
                  {
                    "tag": "i",
                    "class": "fa-solid fa-clipboard-list"
                  }
                ]
              },
              {
                "tag": "div",
                "class": "nav-title",
                "children": [
                  {
                    "tag": "h1",
                    "text": "Survey Time"
                  },
                  {
                    "tag": "div",
                    "class": "underline"
                  }
                ]
              }
            ]
          },
          {
            "tag": "div",
            "class": "nav-form-account",
            "children": [
              {
                "tag": "div",
                "class": "nav-from-account-details",
                "children": [
                  {
                    "tag": "button",
                    "class": "submit",
                    "attributes": {
                      "type": "submit",
                      "form": "userForm"
                    },
                    "text": "Submit"
                  },
                  {
                    "tag": "div",
                    "class": "nav-form-settings",
                    "children": [
                      {
                        "tag": "i",
                        "class": "fa-solid fa-ellipsis-vertical"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]




export const survey = {
  title: "Survey Time",
  description: "a sample to test the user preview",
  questions: [
    {
      questionId: 1,
      question: "Question1 - MC",
      type: "radio",
      required: true,
      options: {
        0: "MC-1.",
        1: "MC-2.",
        2: "MC-3.",
      },
    },
    {
      questionId: 2,
      question: "Question1 - CB",
      type: "checkbox",
      required: false,
      minSelection: "2",
      maxSelection: "2",
      options: {
        0: "CB-1.",
        1: "CB-2.",
        2: "CB-3.",
      },
    },
    {
      questionId: 3,
      question: "Question3 - DD",
      type: "select",
      required: true,
      options: {
        0: "DD-1.",
        1: "DD-2.",
        2: "DD-3.",
      },
    },
    {
      questionId: 4,
      question: "Question4 - para",
      type: "text",
      required: false,
      minLength: "5",
      maxLength: "10",
    },
    {
      questionId: 5,
      question: "Question5 - Number",
      type: "number",
      required: true,
      minValue: "100",
      maxValue: "200",
    },
    {
      questionId: 6,
      question: "Question6 - date",
      type: "date",
      required: false,
      startDate: "2025-02-01",
      endDate: "2025-02-20",
    },
    {
      questionId: 7,
      question: "Question7 - time",
      type: "time",
      required: true,
      startTime: "00:00",
      endTime: "06:00",
    },
    {
      questionId: 8,
      question: "Question8 - time",
      type: "file",
      required: false,
      accept: ".jpeg, .png, ",
    },
  ],
};


export const surveyData = {
  "title": "Survey Time",
  "description": "a sample to test the user preview",
  "questions": [
    {
      "questionId": 1,
      "question": "Question1 - MC",
      "type": "radio",
      "required": true,
      "options": {
        "0": "MC-1.",
        "1": "MC-2.",
        "2": "MC-3."
      }
    },
    {
      "questionId": 2,
      "question": "Question1 - CB",
      "type": "checkbox",
      "required": false,
      "minSelection": "2",
      "maxSelection": "2",
      "options": {
        "0": "CB-1.",
        "1": "CB-2.",
        "2": "CB-3."
      }
    },
    {
      "questionId": 3,
      "question": "Question3 - DD",
      "type": "select",
      "required": true,
      "options": {
        "0": "DD-1.",
        "1": "DD-2.",
        "2": "DD-3."
      }
    },
    {
      "questionId": 4,
      "question": "Question4 - para",
      "type": "text",
      "required": false,
      "minLength": "5",
      "maxLength": "10"
    },
    {
      "questionId": 5,
      "question": "Question5 - Number",
      "type": "number",
      "required": true,
      "minValue": "100",
      "maxValue": "200"
    },
    {
      "questionId": 6,
      "question": "Question6 - date",
      "type": "date",
      "required": false,
      "startDate": "2025-02-01",
      "endDate": "2025-02-20"
    },
    {
      "questionId": 7,
      "question": "Question7 - time",
      "type": "time",
      "required": true,
      "startTime": "00:00",
      "endTime": "06:00"
    },
    {
      "questionId": 8,
      "question": "Question8 - time",
      "type": "file",
      "required": false,
      "accept": ".jpeg, .png, "
    }
  ]
}


const sampleResponse = {
  "name": "Dhanvanth",
  "email": "sbdhanvanth@gmail.com",
  "surveyId": '67a993354ec96d775f754b7e',
  "responseObject": {
      "1": "adsfadsfasdf",
      "2": "Male--"
  }
}
