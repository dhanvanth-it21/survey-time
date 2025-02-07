import { createElement } from "../generator.js";
import { responseListContainer, responseCards } from "./data.js";

export function responseListInit(div) {
  createElement(responseListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  createElement(responseCards, cardsContainer);

}
