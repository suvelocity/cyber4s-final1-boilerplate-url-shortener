const urlInputField = document.querySelector('#input_url');
const urlSubmit = document.querySelector('#submit_url');
urlSubmit.addEventListener('click', submitUrl);
const baseURL = 'http://localhost:8080';

async function submitUrl(){
    const urlInput = document.querySelector('#input_url').value;
    // try for invalid url
    // const response = await axios.post(`${baseURL}/shorten/${urlInput}`);
    const response = await axios.post(`${baseURL}/shorten`, {
        url: urlInput
    });
    urlInputField.value = "";
    const shortLinkField = document.querySelector('#short_link')
    shortLinkField.innerText = response.data;
    shortLinkField.setAttribute('href', response.data);
}
