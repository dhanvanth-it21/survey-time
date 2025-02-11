import { serverIp, navigateTo } from "../../script.js";
import { createElement } from "../generator.js";
import { responseListContainer, responseCards } from "./data.js";

export async function responseListInit(div, surveyId) {
  const responseCardsDB = surveyId === "All"
    ? await allResponseListInit(div)
    : await allResponseListBySurveyIdInit(div, surveyId);

  // Event listener for delete button
  document.querySelectorAll("div.survey-cards > div > div > button.delete")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
      
      });
    });
}

async function allResponseListBySurveyIdInit(div, surveyId) {
  const responseCardsDB = await fetchAllResponsesBySurveyId(surveyId);
  createElement(responseListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const header = document.querySelector(".survey-list-header > h2");
  header.innerText = `Response-List > Survey: ${surveyId}`;

  const responseCards = converter(responseCardsDB);
  createElement(responseCards, cardsContainer);

  addResponseCardListeners(responseCardsDB);
}

async function allResponseListInit(div) {
  const responseCardsDB = await fetchAllResponses();
  const groupedResponses = Object.groupBy(responseCardsDB, ({ surveyId }) => surveyId);

  const groupedResponsesEntries = Object.entries(groupedResponses);
  console.log(groupedResponsesEntries);
  groupedResponsesEntries.forEach(([surveyId, responses]) => {
    const elem = createElement(responseListContainer, div);
    const cardsContainer = elem[0].querySelector(".survey-cards");
    const header = elem[0].querySelector(".survey-list-header > h2");
    header.innerText = `Survey: ${surveyId}`;

    const responseCards = converter(responses);
    createElement(responseCards, cardsContainer);

    addResponseCardListeners(responses, elem[0]);
  });
}

function addResponseCardListeners(responseCardsDB, container = document) {
  const responseCardsList = container.querySelectorAll(".survey-card");
  responseCardsList.forEach((responseCard, index) => {
    responseCard.addEventListener("click", async () => {
      const responseData = responseCardsDB[index];
      console.log("id: " + responseData.id);

      const response = await fetchSurveyById(responseData.id);
      navigateTo(`admin/response?id=${responseData.id}&surveyId=${responseData.surveyId}`);
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
      class: "survey-card response-card",
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
    };
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
