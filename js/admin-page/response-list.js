import { serverIp, navigateTo } from "../../script.js";
import { createElement } from "../generator.js";
import { responseListContainer, responseCards } from "./data.js";

export async function responseListInit(div, surveyId) {
  const responseCardsDB =
    surveyId === "All"
      ? await allResponseListInit(div)
      : await allResponseListBySurveyIdInit(div, surveyId);

}


async function deleteSurvey(responseId) {
  const apiuri = `http://${serverIp}:8080/responses/${responseId}`;
  const responseOptions = {
    method: "DELETE",
  }
  await fetch(apiuri, responseOptions)
  .then( (response) => {
    if(response.ok) {
      swal("Respone Deleted", "", "success")
    }
    else throw new Error("Error deleting response");
  })
  .catch((error) => {
    console.error("Error : ", error);
  })
}

async function allResponseListBySurveyIdInit(div, surveyId) {
  const responseCardsDB = await fetchAllResponsesBySurveyId(surveyId);
  createElement(responseListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");

  const header = document.querySelector(".survey-list-header > h2");
  header.innerText = `Response-List > Response of: ${responseCardsDB[0].surveyTitle}`;

  const responseCards = converter(responseCardsDB);
  createElement(responseCards, cardsContainer);
  document
    .querySelectorAll("div.survey-cards > div > div > button.delete")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const surveyId = responseCardsDB[index].surveyId;
        const email = responseCardsDB[index].email;
        const responseId = responseCardsDB[index].id;
        swal({
          title: "Are you sure?",
          text: `Survey : ${surveyId}, Response of: ${email}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (ok) => {
          if (ok) {
            await deleteSurvey(responseId)
            .then(() => {
              deleteButton.closest(".survey-card").remove();
              })
              .catch((error) => {
              console.error("Error: ", error);
              });
          } 
        });
      });
    });

  addResponseCardListeners(responseCardsDB);
}

async function allResponseListInit(div) {
  const responseCardsDB = await fetchAllResponses();
  const groupedResponses = Object.groupBy(
    responseCardsDB,
    ({ surveyId }) => surveyId
  );

  const groupedResponsesEntries = Object.entries(groupedResponses);
  console.log(groupedResponsesEntries);
  groupedResponsesEntries.forEach(([surveyId, responses]) => {
    const elem = createElement(responseListContainer, div);
    const cardsContainer = elem[0].querySelector(".survey-cards");
    const header = elem[0].querySelector(".survey-list-header > h2");
    header.innerText = `Response of: ${responses[0].surveyTitle}`;

    const responseCards = converter(responses);
    createElement(responseCards, cardsContainer);

    elem[0].querySelectorAll("div.survey-cards > div > div > button.delete")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const surveyId = responses[index].surveyId;
        const email = responses[index].email;
        const responseId = responses[index].id;
        swal({
          title: "Are you sure?",
          text: `Survey : ${surveyId}, Response of: ${email}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (ok) => {
          if (ok) {
            await deleteSurvey(responseId)
              .then(() => {
              deleteButton.closest(".survey-card").remove();
              })
              .catch((error) => {
              console.error("Error: ", error);
              });
          } 
        });
      });
    });
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
      navigateTo(
        `admin/response?id=${responseData.id}&surveyId=${responseData.surveyId}`
      );
    });
  });
}

async function fetchAllResponses() {
  const apiuri = `http://${serverIp}:8080/responses/response-cards `;
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
