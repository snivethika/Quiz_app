const quizData = [
    {
        question: "What does HTML stand for?",
        choices: [
            "HyperText Markup Language",
            "HomeTool Markup Language",
            "Hyperlink and Text Markup Language",
            "Hyperlink Markup Language"
        ],
        correct: "HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScript created?",
        choices: [
            "1996",
            "1995",
            "1994",
            "1993"
        ],
        correct: "1995"
    },
    {
        question: "Which language runs in a web browser?",
        choices: [
            "Java",
            "C",
            "Python",
            "JavaScript"
        ],
        correct: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let participantAnswers = [];

const questionElement = document.getElementById('question');
const choicesElements = document.querySelectorAll('.choice');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const answersList = document.getElementById('answers-list');
const restartBtn = document.getElementById('restart-btn');

// Load the first question
function loadQuestion() {
    const currentQuizData = quizData[currentQuestionIndex];

    questionElement.innerText = currentQuizData.question;

    choicesElements.forEach((choiceElement, index) => {
        const choiceTextElement = document.getElementById(`choice${index + 1}-text`);
        choiceTextElement.innerText = currentQuizData.choices[index];
    });
}

// Get selected answer
function getSelected() {
    let selectedAnswer;
    choicesElements.forEach(choiceElement => {
        if (choiceElement.checked) {
            selectedAnswer = document.getElementById(`${choiceElement.id}-text`).innerText;
        }
    });
    return selectedAnswer;
}

// Clear selected answer
function clearSelected() {
    choicesElements.forEach(choiceElement => {
        choiceElement.checked = false;
    });
}

// Next button event listener
nextBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (selectedAnswer) {
        participantAnswers.push(selectedAnswer);

        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
            clearSelected();
            if (currentQuestionIndex === quizData.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            }
        }
    } else {
        alert('Please select an answer before moving to the next question.');
    }
});

// Submit button event listener
submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (selectedAnswer) {
        participantAnswers.push(selectedAnswer);
        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        showResult();
    } else {
        alert('Please select an answer before submitting.');
    }
});

// Show result after quiz completion
function showResult() {
    questionElement.style.display = 'none';
    document.getElementById('choices').style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';

    resultContainer.style.display = 'block';
    resultElement.innerText = `Your score is: ${score} out of ${quizData.length}`;

    // Show correct answers and participant's answers
    quizData.forEach((quizItem, index) => {
        const listItem = document.createElement('li');
        const isCorrect = quizItem.correct === participantAnswers[index] ? '✅' : '❌';
        listItem.innerText = `Q${index + 1}: ${quizItem.question} - Your answer: ${participantAnswers[index]} ${isCorrect} (Correct: ${quizItem.correct})`;
        answersList.appendChild(listItem);
    });

    restartBtn.style.display = 'inline-block';
}

// Restart the quiz
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    participantAnswers = [];
    questionElement.style.display = 'block';
    document.getElementById('choices').style.display = 'block';
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
    resultContainer.style.display = 'none';
    answersList.innerHTML = ''; // Clear previous answers list
    restartBtn.style.display = 'none';
    loadQuestion();
    clearSelected();
});

// Load the first question when the page loads
loadQuestion();
