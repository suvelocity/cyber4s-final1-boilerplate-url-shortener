const URLInput = document.getElementById("UrlInput");
const URLOutput = document.getElementById("root")
const button = document.getElementById("go")
const myAPI = "http://localhost:8080"


button.addEventListener("click", async function(){
    try {
        const data = await axios.get(`${myAPI}/makeurl`, {
            headers: {
                "longURL" : URLInput.value 
            }
        })
        displayUrl(data.shortURL)

    } catch (error) {
        console.log(error);
    }
})

function displayUrl(newUrl){
    URLOutput.setAttribute("href", newUrl);
    URLOutput.innerText = newUrl
}