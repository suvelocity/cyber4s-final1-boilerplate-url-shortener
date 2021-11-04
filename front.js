const urlInputField = document.querySelector('#input_url');
const urlSubmit = document.querySelector('#submit_url');
urlSubmit.addEventListener('click', submitUrl);


async function submitUrl(){
    const urlInput = document.querySelector('#input_url').value;
    // try for invalid url
    const response = await axios.post(`http://localhost:8080/shorten/${urlInput}`);
    urlInputField.value = "";
    const shortLink = document.querySelector('#short_link')
    shortLink.innerText = response.data;
    shortLink.setAttribute('href', response.data);
}
