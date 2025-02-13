export const navBar = [
  {
    tag: "nav",
    class: "survey-nav",
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
                    class: "create button",
                    text: "Create Survey",
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

export const sideBar = [
  {
    tag: "div",
    class: "sidebar",
    children: [
      {
        tag: "div",
        class: "profile",
        children: [
          {
            tag: "div",
            class: "profile-info",
            children: [
              {
                tag: "h2",
                text: "Dhanvanth",
              },
              {
                tag: "p",
                text: "sbdhanvanth@gmail.com",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "sidebar-buttons",
        children: [
          {
            tag: "button",
            class: "survey-list button",
            text: "Survey List",
          },
          {
            tag: "button",
            class: "response-list button",
            text: "Response List",
          },
        ],
      },
    ],
  },
];

export const surveyListContainer = [
  {
    tag: "div",
    class: "survey-list-container",
    children: [
      {
        tag: "div",
        class: "survey-list-header",
        children: [
          {
            tag: "h2",
            text: "Survey List",
          },
        ],
      },
      {
        tag: "div",
        class: "survey-cards",
        children: [],
      },
      {
        tag: "div",
        class: "pagination",
        children: [
          {
            tag: "button",
            class: "prev button",
            text: "Prev",
          },
          {
            tag: "span",
            class: "current-page",
            text: "1",
          },
          {
            tag: "button",
            class: "next button",
            text: "Next",
          },
        ],
      }
    ],
  },
];
export const surveyCards = [
  {
    tag: "div",
    class: "survey-card",
    children: [
      {
        tag: "h3",
        text: "Survey 1",
      },
      {
        tag: "p",
        text: "Description of Survey 1",
      },
      active(),
    ],
  },
  {
    tag: "div",
    class: "survey-card",
    children: [
      {
        tag: "h3",
        text: "Survey 2",
      },
      {
        tag: "p",
        text: "Description of Survey 2",
      },
      active(),
    ],
  },
];

// active status for each question survey page
function active() {
  return {
    tag: "div",
    class: "active",
    children: [
      {
        tag: "button",
        class: "delete",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-trash",
          },
        ],
      },
      {
        tag: "button",
        class: "preview",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-eye",
          },
        ],
      },
      {
        tag: "label",
        children: [
          {
            tag: "input",
            type: "checkbox",
          },
          {
            tag: "p",
            text: " Active",
          },
        ],
      },
    ],
  };
}

export const responseListContainer = [
  {
    tag: "div",
    class: "survey-list-container",
    children: [
      {
        tag: "div",
        class: "survey-list-header",
        children: [
          {
            tag: "h2",
            text: "Response List",
          },
        ],
      },
      {
        tag: "div",
        class: "survey-cards",
        children: [],
      },
    ],
  },
];
export const responseCards = [
  {
    tag: "div",
    class: "survey-card",
    children: [
      {
        tag: "h3",
        text: "Name 1",
      },
      {
        tag: "p",
        text: "email 1",
      },
      activeRes(),
    ],
  },
  {
    tag: "div",
    class: "survey-card",
    children: [
      {
        tag: "h3",
        text: "Name 2",
      },
      {
        tag: "p",
        text: "Email 2",
      },
      activeRes(),
    ],
  },
];

// active status for each question response page
function activeRes() {
  return {
    tag: "div",
    class: "active",
    children: [
      {
        tag: "button",
        class: "delete",
        children: [
          {
            tag: "i",
            class: "fa-solid fa-trash",
          },
        ],
      },
    ],
  };
}
