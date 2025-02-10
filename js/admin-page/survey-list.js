import { navigateTo, serverIp } from "../../script.js";
import { createElement } from "../generator.js";
import { userJsonConverter } from "../user-form/user-json-converter.js";
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
  const previews = document.querySelectorAll(
    "div.survey-cards > div > div > button.preview"
  );


  //preview button 
  previews.forEach((preview, index) => {
    preview.addEventListener("click", async () => {
      console.log("id : " + surveyCardsDB[index].id);
      const survey = await fetchSurveyById(surveyCardsDB[index].id);
      console.log(survey.surveyObject);
      // const surveyJson = userJsonConverter(survey.surveyObject);
      navigateTo(`admin/survey?id=${surveyCardsDB[index].id}`)
    });
  });
}


//fectching survey card
async function fetchSurveyCard() {
  const apiuri = `http://${serverIp}:8080/survey/survey-cards`;

  const response = await fetch(apiuri);

  const data = await response.json();

  return data;
}

// survey card json converter
function converter(surveyList) {
  return surveyList.map((survey) => {
    return {
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
    };
  });
}

// active status for each question survey page (helper)
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


// fetching the survey with id
async function fetchSurveyById(id) {
  const apiuri = "";
  const data  = await fetch(`http://${serverIp}:8080/survey/${id}`);
  const response = await data.json();
  return response;
}