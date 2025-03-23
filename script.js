const questions = [
    "What is your work/school schedule? (e.g., Mon-Fri 9 AM - 5 PM)",
    "What time do you wake up? (e.g., 7 AM)",
    "What time do you sleep? (e.g., 11 PM)",
    "How many hours do you want for leisure?",
    "How many hours do you want for study?",
    "How many hours do you want for gym?",
    "How many hours do you want for friends time?",
    "Do you have any fixed tasks on specific days? (e.g., Football on Wednesday at 5 PM)"
];

let currentQuestion = 0;
let userResponses = {};
const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const nextBtn = document.getElementById("next-btn");
const timetableContainer = document.querySelector(".timetable-container");
const timetableBody = document.querySelector("#timetable tbody");

nextBtn.addEventListener("click", () => {
    const answer = userAnswer.value.trim();
    if (answer !== "") {
        userResponses[questions[currentQuestion]] = answer;
        userAnswer.value = "";

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            questionText.innerText = questions[currentQuestion];
        } else {
            generateTimetable();
        }
    }
});

function generateTimetable() {
    document.querySelector(".container").classList.add("hidden");
    timetableContainer.classList.remove("hidden");

    let workHours = userResponses["What is your work/school schedule?"];
    let [startTime, endTime] = extractTime(workHours);

    let schedule = [];
    for (let i = 6; i <= 23; i++) {
        schedule.push({ time: formatTime(i), task: "" });
    }

    function assignTask(hours, taskName, className) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i].task === "" && hours > 0) {
                schedule[i].task = taskName;
                schedule[i].class = className;
                hours--;
            }
        }
    }

    assignTask(endTime - startTime, "Work", "work");
    assignTask(parseInt(userResponses["How many hours do you want for study?"]), "Study", "study");
    assignTask(parseInt(userResponses["How many hours do you want for leisure?"]), "Leisure", "leisure");
    assignTask(parseInt(userResponses["How many hours do you want for gym?"]), "Gym", "gym");
    assignTask(parseInt(userResponses["How many hours do you want for friends time?"]), "Friends", "friends");

    timetableBody.innerHTML = schedule.map(slot => `<tr><td>${slot.time}</td><td class="${slot.class || ""}">${slot.task}</td></tr>`).join("");
}

function extractTime(schedule) {
    let match = schedule.match(/(\d+) AM.*?(\d+) PM/);
    return match ? [parseInt(match[1]), parseInt(match[2])] : [9, 17];
}

function formatTime(hour) {
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
}
