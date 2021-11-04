//import section
import "./styles.scss";
import axios from "axios";
//DOM elements section
const submitButton = document.querySelector("btn");
const baseServerPath = "http://localhost:3000";
const getShortenVersion = async (_originUrl) => {
  try {
    const body = { originUrl: `${_originUrl}` };
    const response = await axios.post(
      `${baseServerPath}` + "/api/shorturl/",
      body,
      { headers: { "content-type": "application/json" } }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    clearResultDiv();
    const errorsDiv = document.querySelector(".errors");
    errorsDiv.textContent = "Invalid Url";
    setTimeout(() => {
      errorsDiv.firstChild.remove();
    }, 3000);
  }
  throw "INVAILD URL";
};
const clearResultDiv = () => {
  const result = document.getElementById("resultUrl");
  result.textContent = "";
};
const createResultDiv = (element, newSequence) => {
  element.appendChild(
    createElement("a", `${baseServerPath}/${newSequence}`, ["shortLink"], {
      href: `${baseServerPath}/${newSequence}`,
    })
  );
  element.appendChild(
    createElement(
      "button",
      [createElement("span", "stats")],
      ["statsBtn", "btn"]
    )
  );
};
async function serveUrl() {
  const inputValue = document.getElementById("urlInput").value;
  const newSequence = await getShortenVersion(inputValue);
  const result = document.getElementById("resultUrl");
  clearResultDiv();
  createResultDiv(result, newSequence);
  //.append(`${baseServerPath}` + `/${originUrl}`);
}
const getStats = async (_shortUrl) => {
  try {
    const body = { originUrl: `${_originUrl}` };
    const response = await axios.get(
      `${baseServerPath}/api/stats/${_shortUrl}`,
      { headers: { "content-type": "application/json" } }
    );
    console.log(response);
    return response.data;
  } catch (err) {}
};
const statsHandler = (event) => {};
function createElement(tagName, children = [], classes = [], attributes = {}) {
  // create new element in more comfortable
  const el = document.createElement(tagName);
  for (let child of children) {
    // append childs of element
    el.append(child);
  }
  for (let cls of classes) {
    // add all the classes to the element
    el.classList.add(cls);
  }
  for (let attr in attributes) {
    // add all attributes to the element
    el.setAttribute(attr, attributes[attr]);
  }
  return el;
}
document.getElementById("submitBtn").addEventListener("click", serveUrl);
// const submitHandler = (event) =>{
//     try{
//     }catch{
//     }
// }
// submitButton.addEventListener("click", submitHandler)
