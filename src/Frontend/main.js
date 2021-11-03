'use strict'

const sendOldURLToServerWithNameOfNew = async () => {
  const oldURLvalue = document.getElementById("oldURLinput").value;
  const newURLvalue = document.getElementById("newURLinput").value;
  if (!validator.isLength(newURLvalue, { min: 3, max: 15 })) {
    alert("write something") //change this later;
    return
  }
  if (!validator.isAlphanumeric(newURLvalue)) {
    alert("enter Valid New Name");
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  if (!validator.isURL(oldURLvalue)) {
    alert("enter valid URL")
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  const response = await axios.post(`http://localhost:8080/api/shorturl/${newURLvalue}`, { oldurl: oldURLvalue });
  console.log(response);
}

const getStatisticFromURL = async () => {
  const userURLValue = document.getElementById("userCustomUrl").value;
  if (!validator.isLength(userURLValue, { min: 3, max: 15 })) {
    alert("write something") //change this later;
    return
  }
  if (!validator.isAlphanumeric(userURLValue)) {
    alert("enter Valid New Name");
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  const response = await axios.get(`http://localhost:8080/api/statistic/${userURLValue}`);
  const responseUrlOBJ = response.data;
  const divStatics = document.createElement("DIV");
  divStatics.classList.add("regularDiv");
  divStatics.innerHTML = `
  <h4>${userURLValue}</h4>
  <div class="statisticParag">
  <p>Special URL Created: <span class="boldWord">${responseUrlOBJ.creationDate}</span></p>
  <p>Number of Entries to URL: <span class="boldWord">${responseUrlOBJ.redirectCount}</span></p>
  <p>Original URL: <a href="${responseUrlOBJ.originalUrl} target="_blank"><span class="boldWord">${responseUrlOBJ.originalUrl}</span></a></p>
  </div>
  `;
  document.getElementById("urlStaticSect").appendChild(divStatics);
}
document.getElementById("createURLBtn").addEventListener("click", sendOldURLToServerWithNameOfNew);
document.getElementById("getStatsticBtn").addEventListener("click", getStatisticFromURL);





///style
document.getElementById("getUrlLink").addEventListener("click", () => {
  document.getElementById("getUrlSect").style.left = "0%"
  document.getElementById("getUrlLink").classList.add("active");
  document.getElementById("urlStaticSect").style.left = "100%"
  document.getElementById("getStatsLink").classList.remove("active")
});
document.getElementById("getStatsLink").addEventListener("click", () => {
  document.getElementById("getUrlSect").style.left = "-100%"
  document.getElementById("getUrlLink").classList.remove("active")
  document.getElementById("urlStaticSect").style.left = "0%"
  document.getElementById("getStatsLink").classList.add("active")
});;