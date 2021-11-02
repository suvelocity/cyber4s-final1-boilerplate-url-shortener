'use strict'

const sendOldURLToServerWithNameOfNew = () => {
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
  alert("yay")
}

document.getElementById("createURLBtn").addEventListener("click", sendOldURLToServerWithNameOfNew);