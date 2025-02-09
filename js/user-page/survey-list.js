import { createElement } from "../generator.js";
import { surveyListContainer, surveyCards } from "./data.js";
import { navigateTo, serverIp } from "../../script.js";

export async function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const surveyCardsDB = await fetchSurveyCard();

  const surveyCards = converter(surveyCardsDB);

  // createElement(surveyCards, cardsContainer);
  createElement(surveyCards, cardsContainer);

  const surveyCardList = document.querySelectorAll(".survey-card");

  surveyCardList.forEach((card, index) => {
    card.addEventListener("click", () => {
      navigateTo(`user/survey?id=${surveyCardsDB[index].id}`);
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
      ],
    }
  })
}
