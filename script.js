const questions = [
    "What is your typical work/school schedule?",
    "What time do you wake up?",
    "What time do you sleep?",
    "What activities do you want to include in your schedule?",
    "How much time do you need for leisure?",
    "How much time do you need for studying or work?",
];

let currentQuestion = 0;
let userResponses = {};
const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const nextBtn = document.getElementById("next-btn");
const timetableContainer = document.querySelector(".timetable-container");
const timetable = document.getElementById("timetable");

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

    let timeSlots = [];
    for (let i = wakeTime; i < sleepTime; i++) {
        timeSlots.push(i + ":00");
    }

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    timetable.innerHTML = "";

    for (let i = 0; i < days.length; i++) {
        let dayHeader = document.createElement("div");
        dayHeader.innerText = days[i];
        dayHeader.classList.add("timetable-cell");
        timetable.appendChild(dayHeader);
    }

    for (let i = 0; i < timeSlots.length; i++) {
        for (let j = 0; j < days.length; j++) {
            let cell = document.createElement("div");
            cell.innerText = timeSlots[i];
            cell.classList.add("timetable-cell");
            timetable.appendChild(cell);
        }
    }
}
