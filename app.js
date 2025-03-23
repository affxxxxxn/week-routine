const questions = [
    "What is your typical work/school schedule?",
    "What time do you usually wake up?",
    "What time do you go to sleep?",
    "What are your preferred leisure activities?",
    "When would you like to spend time with friends?"
];

let currentQuestion = 0;
let userData = {
    workSchedule: "",
    wakeUpTime: "",
    sleepTime: "",
    leisureActivities: "",
    friendsTime: ""
};

const nextButton = document.getElementById('next-question');
const questionContainer = document.getElementById('question-container');
const userAnswer = document.getElementById('user-answer');
const resultSection = document.getElementById('result-section');
const weeklyView = document.getElementById('weekly-view');

nextButton.addEventListener('click', function() {
    // Save the current answer
    userData[Object.keys(userData)[currentQuestion]] = userAnswer.value.trim();

    // Move to the next question
    currentQuestion++;

    if (currentQuestion < questions.length) {
        // Update the question
        document.getElementById('question').innerText = questions[currentQuestion];
        userAnswer.value = '';  // Clear the answer box
    } else {
        // End of questions, generate timetable
        questionContainer.style.display = 'none';
        resultSection.style.display = 'block';
        generateTimetable();
    }
});

function generateTimetable() {
    // For simplicity, let's create a basic timetable layout based on the user's input
    const timetable = document.createElement('div');
    timetable.innerHTML = `
        <p>Work/School Schedule: ${userData.workSchedule}</p>
        <p>Wake Up Time: ${userData.wakeUpTime}</p>
        <p>Sleep Time: ${userData.sleepTime}</p>
        <p>Leisure Activities: ${userData.leisureActivities}</p>
        <p>Friends' Time: ${userData.friendsTime}</p>
    `;
    weeklyView.appendChild(timetable);
}
