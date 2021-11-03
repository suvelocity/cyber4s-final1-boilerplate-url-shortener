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

document.getElementById("createURLBtn").addEventListener("click", sendOldURLToServerWithNameOfNew);


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