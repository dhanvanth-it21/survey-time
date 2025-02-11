
import { serverIp, navigateTo } from "../../script.js";
import { createElement } from "../generator.js";
import { responseListContainer, responseCards } from "./data.js";

export async function responseListInit(div, surveyId) {
  createElement(responseListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const header = document.querySelector(".survey-list-header > h2");
  header.innerText = `Response List > Survey: ${surveyId}`;


  // const responseCardsDB = await fetchAllResponses();
  const responseCardsDB = await fetchAllResponsesBySurveyId(surveyId);
  const  responseCards = converter(responseCardsDB);

  createElement(responseCards, cardsContainer);

  const responseCardsList = document.querySelectorAll(".survey-card");
  responseCardsList.forEach((responseCard, index) => {
    responseCard.addEventListener("click", async () => {
      console.log("id : " + responseCardsDB[index].id);
      const response = await fetchSurveyById(responseCardsDB[index].id);
      navigateTo(`admin/response?id=${responseCardsDB[index].id}&surveyId=${responseCardsDB[index].surveyId}`)
    });
   
  });

}

async function fetchAllResponses() {
  const apiuri = `http://${serverIp}:8080/responses`;
  const response = await fetch(apiuri);
  const data = await response.json();
  return data;
}

async function fetchAllResponsesBySurveyId(surveyId) {
  const apiuri = `http://${serverIp}:8080/responses/survey/${surveyId}`;
  const response = await fetch(apiuri);
  const data = await response.json();
  return data;
}

function converter(responseList) {
  return responseList.map((response) => {
    return {
      tag: "div",
      class: "survey-card",
      children: [
        {
          tag: "h3",
          text: response.name,
        },
        {
          tag: "p",
          text: response.email,
        },
        activeRes(),
      ],
    }
  });
}

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


async function fetchSurveyById(id) {
  const apiuri = `http://${serverIp}:8080/responses/${id}`;

  const response = await fetch(apiuri);

  const data = await response.json();

  return data;
}