import { createElement } from "./js/generator.js";
import { navBar, login } from "./data.js";
import { surveyListInit } from "./js/admin-page/survey-list.js";
import { responseListInit } from "./js/admin-page/response-list.js";

export const serverIp = "localhost";

window.addEventListener("load", () => {
  handleRouteChange();
});

// Listen for back/forward navigation
window.addEventListener("popstate", () => {
  handleRouteChange();
});

// Function to navigate to a page by changing the URL and loading the content
export function navigateTo(page, needHistory = true, forceLoad = false) {
  if (!forceLoad && window.location.pathname.replace("/", "") === page) return;
  if (needHistory) {
    history.pushState({ page }, "", `/${page}`);
  } else {
    history.replaceState({ page }, "", `/${page}`);
  }
  handleRouteChange();
}

// Function to handle routing based on URL changes
function handleRouteChange() {
  const path = window.location.pathname.replace("/", "");

  const routes = {
    "": loadLoginPage,
    login: loadLoginPage,
    admin: lazyAdminInit,
    user: lazyUserInit,
    "admin/create-survey": loadCreateSurveyPage,
    "user/survey": () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const name = params.get("name");
      const email = params.get("email");
      loadSurveyPage(id, name, email);
    },
    "admin/survey": () => {
      const id = new URLSearchParams(window.location.search).get("id");
      loadAdminSurveyPreview(id);
    },
    "admin/response": () => {
      const id = new URLSearchParams(window.location.search).get("id");
      const surveyId = new URLSearchParams(window.location.search).get("surveyId");
      loadAdminResponse(id, surveyId);
    },
    "admin/survey-list": loadSurveyList,
    "admin/response-list": () => {
      const surveyId = new URLSearchParams(window.location.search).get("surveyId");
      loadResponseList(surveyId);
    },
  };

  const routeAction =
    routes[path] || routes[window.location.pathname.replace("/", "")];
  if (routeAction) {
    routeAction();
  } else {
    console.error("No route found for path:", path);
  }
}

// Function to load the login page
function loadLoginPage() {
  document.body.innerHTML = "";
  createElement(navBar, document.body);
  createElement(login, document.body);
  updateStylesheet("style.css");

  document.getElementById("admin-button").addEventListener("click", () => {
    navigateTo("admin");
    
  });

  document.getElementById("user-button").addEventListener("click", () => {
    navigateTo("user");
  });
}

// Function to lazy load the admin module
function lazyAdminInit() {
  document.body.innerHTML = "";
  if (window.adminPageInit) {
    window.adminPageInit();
    updateStylesheet("css/admin-page/style.css");
  } else {
    import("./js/admin-page/script.js")
      .then((m) => {
        m.adminPageInit();
        updateStylesheet("css/admin-page/style.css");
        navigateTo("admin/survey-list", false);
      })
      .catch((err) => console.error("Failed to load admin page script:", err));
  }
}

function loadSurveyList() {
  const page = document.querySelector(".page");
  if (page) {
    page.innerHTML = "";
    surveyListInit(page);
  } else {
    navigateTo("admin", false);
  }
}

function loadResponseList(surveyId) {
  const page = document.querySelector(".page");
  if (page) {
    page.innerHTML = "";
    responseListInit(page, surveyId);
  } else {
    navigateTo("admin", false);
  }
}

// Function to lazy load the user module
function lazyUserInit() {
  document.body.innerHTML = "";
  if (window.userPageInit) {
    window.userPageInit();
    updateStylesheet("css/user-page/style.css");
  } else {
    import("./js/user-page/script.js")
      .then((m) => {
        m.userPageInit();
        updateStylesheet("../css/user-page/style.css");
      })
      .catch((err) => console.error("Failed to load user page script:", err));
  }
}

// Function to load the create survey page
function loadCreateSurveyPage() {
  document.body.innerHTML = "";
  //lazy loading for creating new survey
  if (window.createSurveyInit) {
    window.createSurveyInit();
    updateStylesheet("css/create-survey/style.css");
  } else {
    import("./js/create-survey/script.js")
      .then((m) => {
        m.createSurveyInit();
        updateStylesheet("../css/create-survey/style.css");
      })
      .catch((err) =>
        console.error("Failed to load create survey script:", err)
      );
  }
}

// Function to load the survey page
function loadSurveyPage(id, name, email) {
  document.body.innerHTML = "";
  //lazy loading
  if (window.userFormInit) {
    window.userFormInit(id, name, email);
    updateStylesheet("css/user-form/style.css");
  } else {
    import("./js/user-form/script.js")
      .then((m) => {
        m.userFormInit(id, name, email);
        updateStylesheet("../css/user-form/style.css");
      })
      .catch((err) =>
        console.error("Failed to load create survey script:", err)
      );
  }
}

//Function to load the admin survey preview page
function loadAdminSurveyPreview(id) {
  document.body.innerHTML = "";
  if (window.AdminPreviewInit) {
    window.userFormInit(id);
    updateStylesheet("css/user-form/style.css");
  } else {
    import("./js/user-form/script.js")
      .then((m) => {
        m.AdminPreviewInit(id);
        updateStylesheet("../css/user-form/style.css");
      })
      .catch((err) =>
        console.error("Failed to load create survey script:", err)
      );
  }
}

//Function to load the admin survey response page
function loadAdminResponse(id, surveyId) {
  document.body.innerHTML = "";
  if (window.AdminResponseInit) {
    window.AdminResponseInit(id, surveyId);
    updateStylesheet("css/user-form/style.css");
  } else {
    import("./js/user-form/script.js")
      .then((m) => {
        m.AdminResponseInit(id, surveyId);
        updateStylesheet("../css/user-form/style.css");
      })
      .catch((err) =>
        console.error("Failed to load create survey script:", err)
      );
  }
}

function updateStylesheet(href) {
  let link = document.querySelector('link[rel="stylesheet"]');
  link.setAttribute("href", href);
}
