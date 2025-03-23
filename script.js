const questions = [
    "What is your typical work/school schedule?",
    "What time do you wake up?",
    "What time do you sleep?",
    "How many hours for leisure?",
    "How many hours for study?",
    "How many hours for gym?",
    "How many hours for friends time?"
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

    const wakeTime = parseInt(userResponses["What time do you wake up?"]);
    const sleepTime = parseInt(userResponses["What time do you sleep?"]);

    let leisureHours = parseInt(userResponses["How many hours for leisure?"]);
    let studyHours = parseInt(userResponses["How many hours for study?"]);
    let gymHours = parseInt(userResponses["How many hours for gym?"]);
    let friendsHours = parseInt(userResponses["How many hours for friends time?"]);

    let availableHours = sleepTime - wakeTime;
    let schedule = [];

    for (let i = wakeTime; i < sleepTime; i++) {
        schedule.push({ time: `${i}:00`, task: "" });
    }

    function assignTask(hours, taskName) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i].task === "" && hours > 0) {
                schedule[i].task = taskName;
                hours--;
            }
        }
    }

    assignTask(studyHours, "Study");
    assignTask(leisureHours, "Leisure");
    assignTask(gymHours, "Gym");
    assignTask(friendsHours, "Friends");

    timetableBody.innerHTML = "";

    for (let i = 0; i < schedule.length; i++) {
        let row = document.createElement("tr");
        let timeCell = document.createElement("td");
        timeCell.innerText = schedule[i].time;
        row.appendChild(timeCell);

        for (let j = 0; j < 7; j++) {
            let taskCell = document.createElement("td");
            taskCell.innerText = schedule[i].task;
            row.appendChild(taskCell);
        }

        timetableBody.appendChild(row);
    }
}
