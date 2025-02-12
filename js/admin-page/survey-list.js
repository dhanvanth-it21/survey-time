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

  //event listener fot active status
  document.querySelectorAll("div.survey-cards > div > div > label > input[type=checkbox]")
  .forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
    })
  })

  //event listener for delete button
  document.querySelectorAll("div.survey-cards > div > div > button.delete")
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const title = surveyCardsDB[index].title;
      const surveyId = surveyCardsDB[index].id;
      swal({
        title: "Are you sure?",
        text: `Survey : ${title}.
        On deleting the survey, all the responses will be lost`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (ok) => {
        if (ok) {
          await deleteSurvey(surveyId);
        } 
      });
    })
  });

  // adding event listener to the survey cards
  const previews = document.querySelectorAll(
    "div.survey-cards > div > div > button.preview"
  );


  //preview button 
  previews.forEach((preview, index) => {
    preview.addEventListener("click", async (event) => {
      event.stopPropagation();
      console.log("id : " + surveyCardsDB[index].id);
      const survey = await fetchSurveyById(surveyCardsDB[index].id);
      console.log(survey.surveyObject);
      // const surveyJson = userJsonConverter(survey.surveyObject);
      navigateTo(`admin/survey?id=${surveyCardsDB[index].id}`)
    });
  });





  //eventen llistner for  survey cards
  const cards = document.querySelectorAll("div.survey-cards > div");
  cards.forEach((card,index) => {
    card.addEventListener('click', () => {
      const surveyId = surveyCardsDB[index].id;
      navigateTo(`admin/response-list?surveyId=${surveyId}`,false);
    })
  })

}


async function deleteSurvey(surveyId) {
  const apiuri = `http://${serverIp}:8080/survey/${surveyId}`;
  const requestOptions = {
    method: "DELETE",
  };
  await fetch(apiuri, requestOptions)
    .then((response) => {
      if (response.ok) {
        swal("Survey Deleted", "Its respective responses also deleted", "success")
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      swal("Error", "An error occurred while deleting the survey", "error");
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