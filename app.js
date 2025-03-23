let currentStep = 0;
let userSchedule = {
    fixedActivities: [],
    leisureTime: [],
    personalTime: []
};

const questions = [
    "What are your fixed activities (school, work)?",
    "What time do you want to reserve for leisure activities?",
    "Do you want to set any specific time for friends' activities?",
    "Would you like to set any other fixed time for other activities?"
];

const nextButton = document.getElementById('next-btn');
const responseInput = document.getElementById('response');
const questionText = document.getElementById('question');
const weeklyView = document.querySelector('.weekly-view');

nextButton.addEventListener('click', handleNext);

function handleNext() {
    const userResponse = responseInput.value.trim();
    if (userResponse) {
        storeUserResponse(userResponse);
        responseInput.value = ''; // Clear input field
        
        if (currentStep < questions.length - 1) {
            currentStep++;
            questionText.textContent = questions[currentStep];
        } else {
            generateSchedule();
        }
    } else {
        alert('Please provide a response.');
    }
}

function storeUserResponse(response) {
    if (currentStep === 0) {
        userSchedule.fixedActivities.push(response);
    } else if (currentStep === 1) {
        userSchedule.leisureTime.push(response);
    } else if (currentStep === 2) {
        userSchedule.personalTime.push(response);
    }
}

function generateSchedule() {
    questionText.textContent = "Generating your schedule...";

    // Here, you can add logic to calculate available time slots and generate the timetable
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Example of adding fixed events (school/work) and available leisure time
    days.forEach(day => {
        const dayDiv = document.getElementById(day);
        const fixedEvent = document.createElement('div');
        fixedEvent.classList.add('task');
        fixedEvent.textContent = "Fixed Activity: School/Work (8 AM - 3 PM)"; // Replace with actual schedule
        dayDiv.appendChild(fixedEvent);
        
        const leisureEvent = document.createElement('div');
        leisureEvent.classList.add('task');
        leisureEvent.textContent = `Leisure Time: 6 PM - 8 PM`; // Example time
        dayDiv.appendChild(leisureEvent);
    });

    // Now display the weekly view
    document.getElementById('questions-section').style.display = 'none';
    weeklyView.style.display = 'grid';
}
