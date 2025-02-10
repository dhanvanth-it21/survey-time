import { createElement } from "../generator.js";
import { sideBar } from "./data.js";
import { surveyListInit } from "./survey-list.js";

export function sideBarInit(div) {
  createElement(sideBar, div);
  const profileSelect = document.querySelector(".profile > .profile-select");
  profileGenerate(profileSelect.value);
  profileSelect.addEventListener("change", (event) => {
    const selectedProfile = event.target.value;
    profileGenerate(selectedProfile);
    
  });
  const surveyList = document.querySelector(".survey-list");
  surveyList.addEventListener("click", () => {
    const page = document.querySelector(".page");
    page.innerHTML = "";
    surveyListInit(page);
  });
}

function profileGenerate(profile) {
  const profileInfo = document.querySelector(".profile-info");
  profileInfo.remove();
  const [name, email] = profile.split(",");
  const profileDetail = [
    {
      tag: "div",
      class: "profile-info",
      children: [
        {
          tag: "h2",
          text: name,
        },
        {
          tag: "p",
          text: email,
        },
      ],
    },
  ];

  createElement(profileDetail, document.querySelector(".profile"));
}
