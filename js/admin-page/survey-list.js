import { serverIp } from "../../script.js";
import { createElement } from "../generator.js";
import { surveyListContainer, surveyCards } from "./data.js";

export async function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const surveyCardsDB = await fetchSurveyCard();

  const surveyCards = converter(surveyCardsDB);

  // inserting the survey cards
  // createElement(surveyCards, cardsContainer);
  createElement(surveyCards, cardsContainer);


  // adding event listener to the survey cards
  const previews = document.querySelectorAll("div.survey-cards > div > div > button.preview");

  previews.forEach((preview, index) => {
    preview.addEventListener("click", () => {
      console.log("id : " + surveyCardsDB[index].id);
    });
  });

}

async function fetchSurveyCard() {
  const apiuri = `http://${serverIp}:8080/survey/survey-cards`;

  const response = await fetch(apiuri);

  const data =  await response.json();

  return data;
}


function converter(surveyList) {
  return surveyList.map(survey => {
    return  {
      tag: "div",
      class: "survey-card",
      children: [
        {
          tag: "h3",
          text: survey.title,
        },
        {
          tag: "p",
          class: "truncate-text",
          text: survey.description,
        },
        active(),
      ],
    }
  })
}


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
