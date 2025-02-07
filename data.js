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
          ],
        },
      ],
    },
  ];


export const login = [
    {
        tag: "div",
        class: "button-container",
        children: [
            {
                tag: "button",
                class: "admin button",
                text: "Admin",
                id: "admin-button",
            },
            {
                tag: "button",
                class: "user button",
                text: "User",
                id: "user-button",
            },
        ],
    },
];