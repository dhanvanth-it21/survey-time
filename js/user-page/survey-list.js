import { createElement } from "../generator.js";
import { surveyListContainer, surveyCards } from "./data.js";
import { navigateTo } from "../../script.js";

export function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  createElement(surveyCards, cardsContainer);

  const surveyCardList = document.querySelectorAll(".survey-card");

  surveyCardList.forEach((card) => {
    card.addEventListener("click", () => {
      navigateTo("user/survey");
    });
  });

}
