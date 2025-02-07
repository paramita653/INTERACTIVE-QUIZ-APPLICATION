const quizQuestions = [
  {
    question: "Which of the following is a functional unit of a body?",
    options: ["Mitochondria", "Cytoplasm", "Spleen", "Cell"],
    correctAnswer: "Cell"
  },
  {
    question: "Which of the following is used by cells to interact with other cells",
    options: ["Cell tubules", "Cell junctions", "Cell adhesions", "Cell detectors"],
    correctAnswer: "Cell junctions"
  },
  {
    question: "In which of the following type of cells the cell junction is abundant?",
    options: ["Cardiac cells", "Prokaryotic cells", "Hepatic cells", "Epithelial cells"],
    correctAnswer: "Epithelial cells"
  },
  {
    question: "In which of the following type of cells Sarcoplasmic reticulum is found?",
    options: ["muscle cells", "liver cells", "kidney cells", "neurons"],
    correctAnswer: "muscle cells"
  },
  {
    question: "Which of the following is known as the powerhouse of a cell?",
    options: ["Mitochondria", "Cytoplasm", "Lysosome", "Nuclei"],
    correctAnswer: "Mitochondria"
  }
];
let CurrentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timerInterval;
function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}
function displayQuestion() {
  const currentQuestion = quizQuestions[CurrentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  questionText.innerHTML = currentQuestion.question;
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);
    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[CurrentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }
  CurrentQuestionIndex++;
  if (CurrentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}
function startTimer() {
  timerInterval = setInterval(function() {
    timeRemaining--;
    document.getElementById("timer").textContent = timeRemaining;
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  clearInterval(timerInterval);
  const scorePercentage = (score / quizQuestions.length) * 100;
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2><center>Completed</center></h2>
    <p><center>Correct Answers: ${score} out of ${quizQuestions.length}</center></p>
    <p><center>Score Percentage Obtained: ${scorePercentage}%</center></p>
  `;
}
document.getElementById("start-button").addEventListener("click", startQuiz);
