document.addEventListener("DOMContentLoaded", function () {
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const answerBox = document.getElementById("answer-box");
    const nextButton = document.getElementById("next-button");
    const timetableContainer = document.getElementById("timetable-container");
    const timetableBody = document.querySelector("#timetable tbody");

    let userInputs = {};
    let currentQuestion = 0;

    const questions = [
        { key: "wakeTime", text: "What time do you wake up? (e.g., 7:00 AM)" },
        { key: "sleepTime", text: "What time do you sleep? (e.g., 10:00 PM)" },
        { key: "workHours", text: "What are your work/school hours? (e.g., 8:00 AM - 3:00 PM, or type 'none')" },
        { key: "studyTime", text: "How many hours per day do you want to study?" },
        { key: "leisureTime", text: "How many hours per day for leisure?" },
        { key: "friendsTime", text: "How many hours per week for friends?" },
        { key: "gymTime", text: "How many hours per week for gym?" }
    ];

    function askQuestion() {
        if (currentQuestion < questions.length) {
            questionText.innerText = questions[currentQuestion].text;
            answerBox.value = "";
            answerBox.style.display = "block";
            nextButton.style.display = "block";
        } else {
            questionContainer.style.display = "none";
            generateTimetable();
        }
    }

    nextButton.addEventListener("click", function () {
        let answer = answerBox.value.trim();
        if (answer === "") return;

        let key = questions[currentQuestion].key;
        userInputs[key] = answer;
        currentQuestion++;
        askQuestion();
    });

    function roundTimeToHour(time) {
        let [hour, minute] = time.split(/[: ]/);
        let period = time.includes("PM") ? "PM" : "AM";

        hour = parseInt(hour);
        if (minute && parseInt(minute) >= 30) {
            hour++;
        }
        if (period === "PM" && hour !== 12) {
            hour += 12;
        }
        if (period === "AM" && hour === 12) {
            hour = 0;
        }
        return hour;
    }

    function generateTimetable() {
        timetableContainer.style.display = "block";
        timetableBody.innerHTML = "";

        let wakeHour = roundTimeToHour(userInputs.wakeTime);
        let sleepHour = roundTimeToHour(userInputs.sleepTime);

        let workHours = userInputs.workHours.toLowerCase() !== "none"
            ? userInputs.workHours.split("-").map(t => roundTimeToHour(t.trim()))
            : null;

        let availableHours = Array.from({ length: sleepHour - wakeHour }, (_, i) => wakeHour + i);

        availableHours.forEach(hour => {
            let row = document.createElement("tr");
            let timeCell = document.createElement("td");
            let formattedTime = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
            if (hour === 12) formattedTime = "12:00 PM";
            if (hour === 0) formattedTime = "12:00 AM";
            timeCell.innerText = formattedTime;
            row.appendChild(timeCell);

            for (let i = 0; i < 7; i++) {
                let cell = document.createElement("td");

                if (workHours && hour >= workHours[0] && hour < workHours[1] && i < 5) {
                    cell.classList.add("task", "work");
                    cell.innerText = "Work/School";
                }
                row.appendChild(cell);
            }
            timetableBody.appendChild(row);
        });
    }

    askQuestion();
});
