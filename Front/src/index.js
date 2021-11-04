const URLInput = document.getElementById("UrlInput");
const URLOutput = document.getElementById("root");
const button = document.getElementById("go");
const inputshorturl = document.getElementById("shorturl");
const getstat = document.getElementById("getstates");
const stats = document.getElementById("stats");
const customeURL = document.getElementById("customeURL");
const home = document.getElementById("home");
const statsBtn = document.getElementById("statsBtn");
const header = document.getElementById("header");
const root = document.getElementById("root");



const myAPI = " https://yurls.herokuapp.com/"

button.addEventListener("click", async function(){
    try {
        const shotUrl = customeURL.value;
        if(!validator.isURL(URLInput.value)){
            displayUrl("Please enter a valid URL");
            return
        }
        const data = await axios.get(`${myAPI}/makeurl`, {
            headers: {
                "longurl" : URLInput.value,
                "shorturl": shotUrl  
            }
        })
        displayUrl(data.data);
        URLInput.value = "";
    } catch (error) {      
        console.log(error);
    }
})

getstat.addEventListener("click", async function(){
    const data = await axios.get(`${myAPI}/status`, {
        headers: {
            "shorturl" : inputshorturl.value 
        }
    })
    clearStatus();
    const longurl = createElement("div", "status");
    longurl.classList.add("showinfosmall")
    const date = createElement("div", "status");
    date.classList.add("showinfo")
    const counter = createElement("div", "status");
    counter.classList.add("showinfo")
    longurl.textContent = `Original URL: ${data.data.longurl}`;
    counter.textContent = `Times Visited: ${data.data.counter}`;
    date.textContent = `Date Created: ${data.data.date}`;
    stats.append(longurl, counter , date);
})

statsBtn.addEventListener("click", ()=>{
    try {
        URLInput.style.visibility = "hidden";
        button.style.visibility = "hidden";
        customeURL.style.visibility = "hidden";
        header.style.visibility = "hidden";
        stats.style.visibility = "visible";
        root.style.visibility = "hidden";
    } catch (error) {
        
    }
})

home.addEventListener("click", ()=>{
    URLInput.style.visibility = "visible";
    button.style.visibility = "visible";
    customeURL.style.visibility = "visible";
    header.style.visibility = "visible";
    stats.style.visibility = "hidden";
    root.style.visibility = "visible";
})

function displayUrl(newUrl){
    URLOutput.setAttribute("href", newUrl);
    URLOutput.innerText = newUrl
}

function createElement(tag, className){
    const element = document.createElement(tag);
    element.classList.add(className);
    return element
}

function clearStatus(){
    inputshorturl.value = "";
    const status = document.getElementsByClassName('status');
    let i = status.length-1;
    while(i>=0){ //delete all status elemnts created
        status[i].remove();
        i--;
    }
}
