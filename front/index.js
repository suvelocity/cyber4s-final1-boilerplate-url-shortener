//import section
import "./styles.scss";
import axios from "axios";
//DOM elements section

const baseServerPath = "https://sexyurl.herokuapp.com/app";

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

async function getShortenUrl(originUrl, proValue) {
  try {
    const body = { originUrl: `${originUrl}`, proValue: `${proValue}` };
    const response = await axios.post(`/api/shorturl`, body, {
      headers: {
        "content-type": "application/json",
      },
    });
    // console.log(`${baseServerPath}/api/shorturl`);
    return response;
  } catch (err) {
    clearResultDiv();
    const errorsDiv = document.querySelector(".errors");
    errorsDiv.textContent = `${err} or invalid url`;
    setTimeout(() => {
      errorsDiv.firstChild.remove();
    }, 3000);
  }
  // throw "invalid Url";
}

const createResultDiv = (element, newSequence) => {
  //function that adds content to the result div
  element.appendChild(
    createElement("a", `${baseServerPath}/${newSequence}`, ["shortLink"], {
      href: `/${newSequence}`,
    })
  );
  element.appendChild(
    createElement(
      "button",
      [createElement("span", "stats")],
      ["statsBtn", "btn"],
      { "data-shorturl": newSequence }
    )
  );

  element.children[1].addEventListener("click", (event) => handlerStat(event)); //eventlistner to the stats button
};

function clearResultDiv() {
  //clears the resultdiv content
  const result = document.getElementById("resultUrl");
  result.textContent = "";
}

document
  .getElementById("submitBtn")
  .addEventListener("click", () => serveUrl());

async function serveUrl() {
  //gets the url input value and calls other funtions that build the data and the dom
  const inputValue = document.getElementById("urlInput").value;
  const proValue = document.getElementById("proInput").value;
  const newSequence = await getShortenUrl(inputValue, proValue);
  const result = document.getElementById("resultUrl");
  clearResultDiv();
  createResultDiv(result, newSequence.data);
}

async function getStats(sequence) {
  //function that gets the url object to use in handlerstat
  try {
    const stats = await axios.get(`/api/stats/${sequence}`);

    return stats;
  } catch (err) {
    console.log(err);
    const errorsDiv = document.querySelector(".errors");
    errorsDiv.textContent = `${err} /faild to get stats`;
  }
}

async function handlerStat(event) {
  // function that handle the url stats and appends it to the modal
  let sequence;
  if (event.target.tagName === "SPAN") {
    //fixes a problem that went when we pressed directly on the span
    sequence = event.target.parentElement.dataset.shorturl;
  } else {
    sequence = event.target.dataset.shorturl;
  }
  const stats = await getStats(sequence);

  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  document.getElementById("wrapper").style.display = "none";
  for (let stat in stats.data) {
    const statData = createElement(
      "LI",
      [`${stat}: ${stats.data[stat]}`],
      ["statLi"]
    );
    modal.children[1].append(statData);
  }
}
document
  .getElementById("closeStatInfo")
  .addEventListener("click", () => closeStatsInfo()); //event listener to the [X] symbol in the stats modal

function closeStatsInfo() {
  //function for the close button in the model
  const modal = document.getElementById("modal");
  document.querySelector(".details-modal-content").textContent = "";
  modal.style.display = "none";
  document.getElementById("wrapper").style.display = "flex";
}

// go pro function
const proBtn = document.getElementById("proBtn");
proBtn.addEventListener("click", () => {
  const proinput = document.getElementById("proInput");
  proinput.style.display = "flex";
});
