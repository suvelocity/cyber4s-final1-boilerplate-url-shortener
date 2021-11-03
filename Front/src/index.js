const URLInput = document.getElementById("UrlInput");
const URLOutput = document.getElementById("root");
const button = document.getElementById("go");
const inputshorturl = document.getElementById("shorturl");
const getstat = document.getElementById("getstates");
const stats = document.getElementById("stats");
const myAPI = "http://localhost:8080"

button.addEventListener("click", async function(){
    try {
        if(!validator.isURL(URLInput.value)){
            displayUrl("Please enter a valid URL");
            return
        }
        const data = await axios.get(`${myAPI}/makeurl`, {
            headers: {
                "longurl" : URLInput.value 
            }
        })
        console.log(data);
        displayUrl(data.data)

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
    const longurl = createElement("div", "status");
    const date = createElement("div", "status");
    const counter = createElement("div", "status");
    longurl.textContent = `Original URL: ${data.data.longurl}`;
    counter.textContent = `Times Visited: ${data.data.counter}`;
    date.textContent = `Date Created: ${data.data.date}`;
    stats.append(longurl, counter , date);
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