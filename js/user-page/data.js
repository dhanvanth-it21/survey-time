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

const users = [
  {
    name: "Dhanvanth",
    email: "sbdhanvanth@gmail.com",
  },
  {
    name: "ram",
    email: "ram@gmial.com",
  },
  {
    name: "kuamr",
    email: "kuamr@gmial.com",
  }
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
          profileSelect(),
          {
            tag: "div",
            class: "profile-info",
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
    ],
  },
];



export const noData = [
  {
    tag: "div",
    class: "no-data",
    children: [
      {
        tag: "p",
        text: "All surveys has been responded",
      },
    ],
  }
]





export function profileSelect() {
  const select = {
    tag: "select",
    class: "profile-select",
    children: users.map(user => ({
      tag: "option",
      text: user.email,
      value: `${user.name},${user.email}`,
    })),
  };

  return select;
}



