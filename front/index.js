import "./styles.scss";
// import "./images/faviocon.ico";
import axios from "axios";
const baseURL = "http://localhost:3000/";

async function getData(url, username) {
  const response = await axios.get(url, {
    headers: {
      username,
    },
  });
  if (response.data.status >= 400) {
    displayMessage(response.data.message);
  }
  return response.data;
}

async function postData(url, username) {
  const response = await axios.post(url, {
    headers: {
      username,
    },
  });
  if (response.data.status >= 400) {
    displayMessage(response.data.message);
  }
}

function displayMessage(message) {
  const errorsSection = document.querySelector(".errors"); //need to define style (display:none)
  errorsSection.classList.add("display-block");
  const errorMessageElem = document.querySelector(".error__message");
  errorMessageElem.textContent = message;
}
