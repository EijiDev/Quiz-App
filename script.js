const quizQuestion = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin","Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 5 + 3",
        choices: ["5","8", "12", "15"],
        answer: "8"
    },
    {
        question: "What is the largest ocean in the world?",
        choices: ["West Ph Sea","Indian Ocean", "Atlantic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Where is stanza located?",
        choices: ["Lingayen","Indonesia", "La Union", "Palawan"],
        answer: "Lingayen"
    },
    {
        question: "Saan nakatira is Seth?",
        choices: ["Bayambang","Talibaew", "Bued", "Sa bundok"],
        answer: "Bued"
    }
];

const container = document.getElementById("quiz-container");
const questionText = document.getElementById("question");
const choicesText = document.querySelector(".choices");
const nextBtn = document.querySelector(".next-btn");
const resultText = document.querySelector("#result");
const scoreText = document.querySelector("#score");
const restartBtn = document.querySelector(".restart-btn");

let currentQuestionPage = 0;
let score = 0;

function loadQuestion () {
    const currentQuestion = quizQuestion[currentQuestionPage];
    questionText.textContent= currentQuestion.question;
    choicesText.innerHTML= "";

    currentQuestion.choices.forEach(choices =>{
        const button = document.createElement('button');
        button.classList.add("choices-btn");
        button.textContent = choices;
        button.onclick = () => checkAnswer(choices);
        choicesText.appendChild(button);
    });

}

function checkAnswer(selectedChoice) {
    const correctAnswer = quizQuestion[currentQuestionPage].answer;
    const showCorrect = document.getElementById("correctAnswer");
    const showScore = document.getElementById("Score").textContent= `Score: ${score} / ${currentQuestionPage}`;

    if(selectedChoice === correctAnswer) {
        
        score++;
    } 
    setTimeout(() => {
        showCorrect.textContent =`Correct answer is: ${correctAnswer}`;
        showScore.textContent = `Score: ${score} / ${currentQuestionPage}`;

        container.appendChild(showCorrect);
        container.appendChild(showScore);
    }, 2000)

    currentQuestionPage++;

    if (currentQuestionPage < quizQuestion.length){
        setTimeout(() => {
            loadQuestion();
        }, 2000);
    } else {
        showResult();
    }
}

function showResult(){
    document.getElementById("quiz").classList.add("hidden");
    resultText.classList.remove("hidden");
    if (score >= 3) {
        scoreText.textContent = `Aratan nan review ka ${score} / ${quizQuestion.length}!`;
    } else {
        scoreText.textContent = `Man aral kan maong ${score} / ${quizQuestion.length}!`;
    }
}

restartBtn.addEventListener("click", function () {
    currentQuestionPage = 0;
    score = 0;
    resultText.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion(); 
});

nextBtn.style.display = "none";
loadQuestion();