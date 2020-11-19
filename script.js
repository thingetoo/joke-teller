const button = document.getElementById('button')
const audioElement = document.getElementById('audio')




// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled
}

//Passing our joke to our VoiceRSS API 
function tellMe(joke) {
    VoiceRSS.speech({
        key: '9f63a417eb68406eb8992d6255a5e244',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json();
        if (data.type === 'twopart') {
            joke = `${data.setup} ... ${data.delivery}`;
        } else if (data.type === 'single'){
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke)
        //Disable Button
        toggleButton();
    } catch(error) {
        console.log('error', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
