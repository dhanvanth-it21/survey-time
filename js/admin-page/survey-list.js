import { createElement } from "../generator.js";
import { surveyListContainer, surveyCards } from "./data.js";

export function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  createElement(surveyCards, cardsContainer);

}
