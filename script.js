let moodButtons = document.querySelectorAll(".mood-btn");

let inputText = document.querySelector(".note-container #noteTextArea")

let emojiChosen = false;

let emoji = "";

let note = "";

let saveButton = document.querySelector(".save");

let inputError = document.querySelector(".inputError");

let emojiError = document.querySelector(".emojiError");

let emojiContainer = document.querySelector(".emoji-container");

let allLogs = document.querySelector(".allLogs");


moodButtons.forEach(element => {

    element.addEventListener("click", function () {
        if (emojiChosen) {
            moodButtons.forEach(element => { element.classList.remove("clicked") });
            console.log(element.textContent);
        }
        emojiChosen = true;
        emoji = element.textContent;
        console.log("clicked");
        element.classList.add("clicked");
        emojiContainer.classList.remove("emoji-warning");
        emojiError.style.display = "none";
    })
})

let logArray = [];

saveButton.addEventListener("click", function () {
    let inputExists = true;
    let emojiExists = true;
    if (inputText.value.trim() === "") {
        inputText.style.border = "2px solid #B00020";
        inputError.style.display = "block";
        inputExists = false;
    }
    if (!emojiChosen) {
        emojiContainer.classList.add("emoji-warning");
        emojiError.style.display = "block";
        emojiExists = false;
    }
    if (inputExists && emojiExists) {
        const now = new Date();
        const dateTime = now.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        note = inputText.value;

        let logObject = {
            id: Date.now(),
            date: dateTime,
            emoji: emoji,
            note: note
        }
        renderLog(logObject);
        saveToLocalStorage(logObject);
        inputText.value = "";
        emojiChosen = false;
        moodButtons.forEach(element => { element.classList.remove("clicked") });
    }
})

function renderLog(obj) {
    let log = document.createElement("div");
    log.classList.add("log");
    allLogs.appendChild(log);
    log.innerHTML = `<div class="log-top">
                        <div class="log-date">${obj.date}</div>
                        <button class="del">🗑️</button>
                    </div>
                    <div class="log-material">
                        <div class="log-emoji">${obj.emoji}</div>
                        <div class="log-note">${obj.note}</div>
                </div>`;
    //DELETE LOGIC
    log.querySelector(".del").addEventListener("click",function(){
        log.remove();
        let logList = JSON.parse(localStorage.getItem("logList"));
        let updatedList = logList.filter(item => item.id !== obj.id);
        localStorage.setItem("logList",JSON.stringify(updatedList));
    })
}

function displayLogs() {
    let logList = JSON.parse(localStorage.getItem("logList")) || [];
    logList.forEach(element => {
        renderLog(element);
    })

}


function saveToLocalStorage(obj) {
    let logList = JSON.parse(localStorage.getItem("logList")) || [];
    logList.push(obj);
    localStorage.setItem("logList", JSON.stringify(logList));
}

window.onload = displayLogs;





