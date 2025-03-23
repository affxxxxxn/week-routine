// script.js

const questions = [
    "What time do you wake up? (e.g., 7:00 AM)",
    "What time do you go to sleep? (e.g., 10:00 PM)",
    "Enter your fixed schedule (e.g., School: 8:00 AM - 3:00 PM)",
];

let userResponses = {};
let currentQuestion = 0;
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answerInput = document.getElementById("answer");
const nextBtn = document.getElementById("next-btn");
const timetableContainer = document.getElementById("timetable-container");
const timetableBody = document.getElementById("timetable-body");

function askQuestion() {
    questionText.textContent = questions[currentQuestion];
    answerInput.value = "";
}

function parseTime(timeString) {
    if (!timeString) return null;
    let [time, period] = timeString.split(" ");
    if (!time || !period) return null;

    let [hour, minute] = time.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return null;

    if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
    if (period.toLowerCase() === "am" && hour === 12) hour = 0;

    return hour;
}

nextBtn.addEventListener("click", function () {
    if (!answerInput.value.trim()) return;
    userResponses[questions[currentQuestion]] = answerInput.value.trim();
    answerInput.value = "";
    currentQuestion++;

    if (currentQuestion < questions.length) {
        askQuestion();
    } else {
        questionContainer.classList.add("hidden");
        generateTimetable();
    }
});

function generateTimetable() {
    timetableBody.innerHTML = ""; 
    timetableContainer.classList.remove("hidden");
    
    let wakeUp = parseTime(userResponses[questions[0]]);
    let sleep = parseTime(userResponses[questions[1]]);
    let schedule = {};

    let fixedSchedule = userResponses[questions[2]].split(",");
    fixedSchedule.forEach(entry => {
        let [task, timeRange] = entry.split(":");
        let [start, end] = timeRange.split("-").map(parseTime);
        for (let i = start; i < end; i++) {
            schedule[i] = task.trim();
        }
    });

    for (let i = wakeUp; i < sleep; i++) {
        let row = document.createElement("tr");
        let timeCell = document.createElement("td");
        timeCell.textContent = `${i % 12 || 12} ${i < 12 ? "AM" : "PM"}`;
        row.appendChild(timeCell);

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            let taskName = schedule[i] || "Free Time";
            cell.textContent = taskName.charAt(0).toUpperCase() + taskName.slice(1);
            cell.classList.add("task", `task-${taskName.replace(/\s+/g, "-").toLowerCase()}`);
            row.appendChild(cell);
        }
        timetableBody.appendChild(row);
    }
}
