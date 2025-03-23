document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        "What is your typical work/school schedule?",
        "What time do you usually wake up and sleep?",
        "Do you have any fixed commitments (gym, religious, family time, etc.)?",
        "How much leisure time would you like per week?",
        "How often do you want to hang out with friends?",
        "Any other important routines?"
    ];

    let currentQuestionIndex = 0;
    const questionElement = document.getElementById("question");
    const textarea = document.getElementById("answer");
    const nextButton = document.getElementById("next-button");
    let userResponses = [];

    nextButton.addEventListener("click", function () {
        const userInput = textarea.value.trim();

        if (userInput === "") {
            alert("Please enter an answer before proceeding.");
            return;
        }

        userResponses.push(userInput);
        textarea.value = ""; // Clear the text area

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            questionElement.innerText = questions[currentQuestionIndex];
        } else {
            generateTimetable(userResponses);
        }
    });

    function generateTimetable(responses) {
        console.log("User responses:", responses);
        alert("Your AI-generated timetable will be displayed next!");
        // Future: Here, you will process responses and generate a timetable.
    }
});
