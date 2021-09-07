const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"] , [name = "text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('[name="text"');

msg.text = textArea.value;

function populateList(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices.map(voice => 
        `<option value="${voice.lang}">
        ${voice.name} (${voice.lang})</option>`).join('');
}

function setVoice(){
    msg.lang = this.value;
    toggle();
}

function toggle(playOver = true){
    speechSynthesis.cancel();
    if(playOver){
        speechSynthesis.speak(msg);
    }
}

function change(){
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged',populateList);
voicesDropdown.addEventListener('change',setVoice);
speakButton.addEventListener('click',toggle);
stopButton.addEventListener('click',() => toggle(false));
options.forEach(option => option.addEventListener('change',change));