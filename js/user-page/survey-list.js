import { createElement } from "../generator.js";
import { surveyListContainer, surveyCards } from "./data.js";
import { navigateTo, serverIp } from "../../script.js";

export async function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const emailId = getEmailId();

  // const surveyCardsDB = await fetchSurveyCard();

  const surveyCardsDB = await fetchPendingSurveyCards(emailId);

  const surveyCards = converter(surveyCardsDB);

  // createElement(surveyCards, cardsContainer);
  createElement(surveyCards, cardsContainer);

  const surveyCardList = document.querySelectorAll(".survey-card");

  surveyCardList.forEach((card, index) => {
    card.addEventListener("click", () => {
      const name = document.querySelector('.profile > .profile-select').value.split(',')[0];
      const email = document.querySelector('.profile > .profile-select').value.split(',')[1];
      navigateTo(`user/survey?id=${surveyCardsDB[index].id}&name=${name}&email=${email}`);
    });
  });
}


async function fetchPendingSurveyCards(emailId) {

  const apiuri = `http://${serverIp}/survey/survey-cards/${emailId}`;
  
  const response = await fetch(apiuri);
  if(response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const error = await response.text();
    console.error("Error:", error);
  }
}


async function fetchSurveyCard() {
  const apiuri = `http://${serverIp}/survey/survey-cards`;

  const response = await fetch(apiuri);
  if(response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const error = await response.text();
    console.error("Error:", error);
  }
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


function getEmailId() {
  const emailId = document.querySelector('.profile > .profile-select').value.split(',')[1];
  return emailId;
}
