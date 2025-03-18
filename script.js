const questionText = document.getElementById("question");
const choicesText = document.getElementById("choices");
const resultText = document.querySelector("#result");
const scoreText = document.querySelector("#score");
const restartBtn = document.querySelector(".restart-btn");

let quizQuestion = [];
let currentQuestionPage = 0;
let score = 0;

async function fetchQuestion() {
    try {
        const response = await fetch("question.txt");
        if (!response.ok) throw new Error(`Failed to load questions`);
        const data = await response.text();
        convertQuestions(data);
        loadQuestion(); 
    } catch (error) {
        console.error("Error fetching questions:", error);
        questionText.textContent = "❌ Failed to load questions. Please try again later.";
    }
}

function convertQuestions(data) {
    const lines = data.trim().split("\n");
    lines.forEach(line => {
        const parts = line.split(",").map(part => part.trim());
        if (parts.length < 3) return; 

        const question = parts[0];
        const choices = parts.slice(1, parts.length - 1);
        const answer = parts[parts.length - 1];

        quizQuestion.push({ question, choices, answer });
    });
}

function loadQuestion() {
    if (currentQuestionPage >= quizQuestion.length) {
        showResult();
        return;
    }

    const currentQuestion = quizQuestion[currentQuestionPage];
    questionText.textContent = currentQuestion.question;
    choicesText.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.classList.add("choices-btn");
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        choicesText.appendChild(button);
    });
}

function checkAnswer(selectedChoice) {
    const correctAnswer = quizQuestion[currentQuestionPage].answer;
    const showCorrect = document.getElementById("correctAnswer");
    const showScore = document.getElementById("Score");

    if (selectedChoice === correctAnswer) {
        showCorrect.textContent = "✅ Correct!";
        score++;
    } else {
        showCorrect.textContent = `❌ Wrong! Correct answer is: ${correctAnswer}`;
    }

    setTimeout(() => {
        showScore.textContent = `Score: ${score} / ${currentQuestionPage + 1}`;
    }, 2000);

    setTimeout(() => {
        currentQuestionPage++;
        loadQuestion();
        showCorrect.textContent = "";
    }, 2000);
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultText.classList.remove("hidden");

    if (score >= 3) {
        scoreText.innerHTML = `🎉 Good job! Your score is ${score} / ${quizQuestion.length}.`;
    } else {
        scoreText.innerHTML = `💡 Keep practicing! Your score is ${score} / ${quizQuestion.length}.`;
    }
}

restartBtn.addEventListener("click", () => {
    currentQuestionPage = 0;
    score = 0; 
    showScore.textContent = "";
    resultText.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
});

fetchQuestion();
