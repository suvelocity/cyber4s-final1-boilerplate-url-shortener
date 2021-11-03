'use strict'

const sendOldURLToServerWithNameOfNew = async () => {
  const oldURLvalue = document.getElementById("oldURLinput").value;
  const newURLvalue = document.getElementById("newURLinput").value;
  if (oldURLvalue == '' || newURLvalue == '') {
    alert("write something") //change this later;
    return
  }
  if (newURLvalue.length > 10) {
    alert("no more than 10");
    return
  }
  const regexCheckOldUrl = /^http[s\/]*/;
  const regexCheckNewUrl = /[^\d\w]/
  if (!regexCheckOldUrl.test(oldURLvalue)) {
    alert("URL HTTPS NOT")
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  if (regexCheckNewUrl.test(newURLvalue)) {
    alert("nwe URL dont like");
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  const response = await axios.post(`http://localhost:8080/api/shorturl/${newURLvalue}`, { oldurl: oldURLvalue });
  console.log(response);
}

const getStatisticFromURL = async () => {
  const userURLValue = document.getElementById("userCustomUrl").value;
  const regexCheckNewUrl = /[^\d\w]/;
  if (regexCheckNewUrl.test(userURLValue)) {
    alert("nwe URL dont like");
    return 'URL MUST CONTAIN HTTP/S' //change this later
  }
  const response = await axios.get(`http://localhost:8080/api/statistic/${userURLValue}`);
  const responseUrlOBJ = response.data;
  const divStatics = document.createElement("DIV");
  divStatics.classList.add("regularDiv");
  divStatics.innerHTML = `
  <h4>${userURLValue}</h4>
  <p>Special URL Created: <span class="boldWord">${responseUrlOBJ.creationDate}</span></p>
  <p>Number of Entries to URL: <span class="boldWord">${responseUrlOBJ.redirectCount}</span></p>
  <p>Original URL: <span class="boldWord">${responseUrlOBJ.originalUrl}</span></p>
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