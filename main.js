let questions = []; // Массив с вопросами
let totalQuestions = 0;
let currentQuestionNumber = 0;

// Функция для загрузки вопросов из файла
function loadQuestions() {
  fetch("question.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      totalQuestions = questions.length;
      shuffleQuestions();
      displayQuestion();
    })
    .catch((error) => console.error("Ошибка при загрузке данных:", error));
}

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Функция для перемешивания вопросов
function shuffleQuestions() {
  shuffleArray(questions);
  questions.forEach((question) => {
    shuffleArray(question.incorrect_answers);
  });
}

// Функция для отображения вопроса
function displayQuestion() {
  const questionElement = document.getElementById("question_text");
  const answersContainer = document.getElementById("variant_answers");
  const countQuestion = document.getElementById("count_question");
  answersContainer.innerHTML = ""; // Очищаем контейнер с вариантами ответов

  if (questions.length > 0) {
    const currentQuestion = questions.pop(); // Получаем текущий вопрос из массива и удаляем его
    currentQuestionNumber = totalQuestions - questions.length;
    countQuestion.innerHTML = `<b>${currentQuestionNumber}</b>/${totalQuestions}`;

    questionElement.textContent = currentQuestion.question;

    const allAnswers = currentQuestion.incorrect_answers.concat(
      currentQuestion.correct_answer
    );
    shuffleArray(allAnswers);

    allAnswers.forEach((answer) => {
      const answerButton = document.createElement("button");
      answerButton.textContent = answer;
      answerButton.classList.add(
        "rounded-md",
        "px-4",
        "py-2",
        "border",
        "border-solid",
        "border-gray-200"
      );
      answerButton.addEventListener("click", () => {
        if (answer === currentQuestion.correct_answer) {
          answerButton.classList.add("bg-green-500", "text-white");
          setTimeout(() => {
            displayQuestion();
          }, 500);
        } else {
          answerButton.classList.add("bg-red-400", "text-white");
        }
      });
      answersContainer.appendChild(answerButton);
    });
  } else {
    questionElement.textContent = "Вопросы закончились!";
  }
}

// Загрузка вопросов при загрузке страницы
document.addEventListener("DOMContentLoaded", loadQuestions);
