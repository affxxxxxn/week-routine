document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");
    const questionContainer = document.getElementById("questionContainer");
    const questionText = document.getElementById("questionText");
    const answerInput = document.getElementById("answerInput");
    const nextBtn = document.getElementById("nextBtn");
    const timetableContainer = document.getElementById("timetableContainer");
    const timetableBody = document.getElementById("timetableBody");

    let userResponses = {};
    let currentQuestion = 0;

    const questions = [
        "What time do you wake up? (e.g., 7:00 AM)",
        "What time do you sleep? (e.g., 10:00 PM)",
        "What are your work/school hours? (e.g., 7:40 AM - 3:20 PM)",
        "How many hours do you want for study each day?",
        "How many hours do you want for leisure each day?",
        "How many hours do you want for gym each day?",
        "How many hours do you want for friends/socializing each day?"
    ];

    startBtn.addEventListener("click", function () {
        startBtn.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        askQuestion();
    });

    nextBtn.addEventListener("click", function () {
        userResponses[questions[currentQuestion]] = answerInput.value;
        answerInput.value = "";
        currentQuestion++;

        if (currentQuestion < questions.length) {
            askQuestion();
        } else {
            questionContainer.classList.add("hidden");
            generateTimetable();
        }
    });

    function askQuestion() {
        questionText.textContent = questions[currentQuestion];
    }

    function roundToNearestHour(time) {
        const [hour, minute] = time.split(":").map(Number);
        return minute >= 30 ? hour + 1 : hour;
    }

    function parseTime(timeString) {
        let [time, period] = timeString.split(" ");
        let [hour, minute] = time.split(":").map(Number);

        if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
        if (period.toLowerCase() === "am" && hour === 12) hour = 0;

        return roundToNearestHour(`${hour}:${minute}`);
    }

    function generateTimetable() {
        timetableContainer.classList.remove("hidden");
        timetableBody.innerHTML = "";

        let wakeUp = parseTime(userResponses[questions[0]]);
        let sleep = parseTime(userResponses[questions[1]]);
        let [workStart, workEnd] = userResponses[questions[2]].split(" - ").map(parseTime);
        let studyHours = parseInt(userResponses[questions[3]]);
        let leisureHours = parseInt(userResponses[questions[4]]);
        let gymHours = parseInt(userResponses[questions[5]]);
        let friendsHours = parseInt(userResponses[questions[6]]);

        let schedule = {};
        let tasks = [
            { name: "work", hours: workEnd - workStart, color: "task work" },
            { name: "study", hours: studyHours, color: "task study" },
            { name: "leisure", hours: leisureHours, color: "task leisure" },
            { name: "gym", hours: gymHours, color: "task gym" },
            { name: "friends", hours: friendsHours, color: "task friends" }
        ];

        for (let i = wakeUp; i < sleep; i++) {
            schedule[i] = "free";
        }

        for (let i = workStart; i < workEnd; i++) {
            schedule[i] = "work";
        }

        tasks.forEach(task => {
            let allocated = 0;
            for (let i = wakeUp; i < sleep && allocated < task.hours; i++) {
                if (schedule[i] === "free") {
                    schedule[i] = task.name;
                    allocated++;
                }
            }
        });

        for (let i = wakeUp; i < sleep; i++) {
            let row = document.createElement("tr");
            let timeCell = document.createElement("td");
            timeCell.textContent = `${i % 12 || 12} ${i < 12 ? "AM" : "PM"}`;
            row.appendChild(timeCell);

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");
                if (schedule[i] !== "free") {
                    cell.textContent = schedule[i].charAt(0).toUpperCase() + schedule[i].slice(1);
                    cell.classList.add("task", schedule[i]);
                }
                row.appendChild(cell);
            }
            timetableBody.appendChild(row);
        }
    }
});
