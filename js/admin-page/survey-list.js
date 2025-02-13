import { navigateTo, serverIp } from "../../script.js";
import { createElement } from "../generator.js";
import { userJsonConverter } from "../user-form/user-json-converter.js";
import { surveyListContainer, surveyCards } from "./data.js";

export async function surveyListInit(div) {
  createElement(surveyListContainer, div);
  const cardsContainer = document.querySelector(".survey-cards");
  let currentPage = 0;
  const size = 2;

  async function loadSurveys(page) {
    const pagesSurveyCardsDB = await fetchSurveyCard(page, size);
    if (!pagesSurveyCardsDB) return;
    currentPage = pagesSurveyCardsDB.number;
    document.querySelector(".current-page").textContent = currentPage + 1;

    cardsContainer.innerHTML = "";
    const surveyCardsDB = pagesSurveyCardsDB.content;
    const surveyCards = converter(surveyCardsDB);
    createElement(surveyCards, cardsContainer);
    addEventListeners(surveyCardsDB);
  }

  await loadSurveys(currentPage);

  document.querySelector(".next").addEventListener("click", async () => {
    const totalPages = await getTotalPages();
    if (currentPage < totalPages - 1) {
      await loadSurveys(currentPage + 1);
    }
  });

  document.querySelector(".prev").addEventListener("click", async () => {
    if (currentPage > 0) {
      await loadSurveys(currentPage - 1);
    }
  });

  async function getTotalPages() {
    const response = await fetchSurveyCard(0, 1);
    return response ? response.totalPages : 1;
  }

  async function fetchSurveyCard(page, size) {
    const apiuri = `http://${serverIp}:8080/survey/survey-cards?page=${page}&size=${size}`;
    try {
      const response = await fetch(apiuri);
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      console.error("Error fetching survey cards:", error);
      return null;
    }
  }

  function addEventListeners(surveyCardsDB) {
    // event listener for active status
    document
      .querySelectorAll(
        "div.survey-cards > div > div > label > input[type=checkbox]"
      )
      .forEach((checkbox) => {
        checkbox.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      });

    // event listener for delete button
    document
      .querySelectorAll("div.survey-cards > div > div > button.delete")
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
          })
            .then(async (ok) => {
              if (ok) {
                await deleteSurvey(surveyId);
                deleteButton.closest(".survey-card").remove();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });

    // active status event listener
    document
      .querySelectorAll(
        "div.survey-cards > div > div.active > label > input[type=checkbox]"
      )
      .forEach((activeButton, index) => {
        activeButton.addEventListener("click", (event) => {
          event.preventDefault();
          const isChecked = event.target.checked;
          (function (isChecked) {
            if (!isChecked) {
              return swal(
                "Stop accepting responses",
                "No longer the user able to respond to the survey",
                "warning"
              );
            } else {
              return swal(
                "Enabling the Survey to user",
                "users are able to respond to the survey",
                "success"
              );
            }
          })(isChecked).then(async (ok) => {
            if (ok) {
              await activeStatusToggle(event, surveyCardsDB[index].id);
            }
          });
        });
      });

    // adding event listener to the survey cards
    const previews = document.querySelectorAll(
      "div.survey-cards > div > div > button.preview"
    );

    // preview button
    previews.forEach((preview, index) => {
      preview.addEventListener("click", async (event) => {
        event.stopPropagation();
        console.log("id : " + surveyCardsDB[index].id);
        const survey = await fetchSurveyById(surveyCardsDB[index].id);
        console.log(survey.surveyObject);
        // const surveyJson = userJsonConverter(survey.surveyObject);
        navigateTo(`admin/survey?id=${surveyCardsDB[index].id}`);
      });
    });

    // event listener for survey cards
    const cards = document.querySelectorAll("div.survey-cards > div");
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const surveyId = surveyCardsDB[index].id;
        navigateTo(`admin/response-list?surveyId=${surveyId}`, false);
      });
    });
  }

  async function activeStatusToggle(event, surveyId) {
    event.target.checked = !event.target.checked;
    await updateActiveStatus(surveyId);
  }

  async function updateActiveStatus(surveyId) {
    const apiuri = `http://${serverIp}:8080/survey/active-status/${surveyId}`;
    const responseOptions = {
      method: "PUT",
    };
    const response = await fetch(apiuri, responseOptions);
    const message = await response.text();
    if (response.ok) {
      console.log(message);
    } else {
      console.error("Error: ", message);
    }
  }
}

async function deleteSurvey(surveyId) {
  const apiuri = `http://${serverIp}:8080/survey/${surveyId}`;
  const requestOptions = {
    method: "DELETE",
  };
  await fetch(apiuri, requestOptions)
    .then(async (response) => {
      if (response.ok) {
        swal(
          "Survey Deleted",
          "Its respective responses also deleted",
          "success"
        );
        await deleteResponseBySurveyId(surveyId);
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch(() => {
      swal("Error", "An error occurred while deleting the survey", "error");
    });
}

async function deleteResponseBySurveyId(surveyId) {
  const apiuri = `http://${serverIp}:8080/responses/survey/${surveyId}`;
  const responseOptions = {
    method: "DELETE",
  };
  await fetch(apiuri, responseOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error occurred while deleting the response of surveyId: ${surveyId}`
        );
      }
    })
    .catch((error) => {
      swal(
        "Error",
        `Error occurred while deleting the response of surveyId: ${surveyId}`,
        "error"
      );
    });
}

// fetching survey card
async function fetchSurveyCard(page, size) {
  const apiuri = `http://${serverIp}:8080/survey/survey-cards?page=${page}&size=${size}`;
  const response = await fetch(apiuri);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    console.error("Error:", error);
  }
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
        active(survey.active),
      ],
    };
  });
}

// active status for each question survey page (helper)
function active(isActive = false) {
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
            ...(isActive && { checked: true }),
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
  const apiuri = `http://${serverIp}:8080/survey/${id}`;
  const response = await fetch(apiuri);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    console.error("Error:", error);
  }
}
