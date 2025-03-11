document.addEventListener("DOMContentLoaded", function () {
  const quizData = JSON.parse(localStorage.getItem("quiz")) || [];
  const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];
  const resultContainer = document.querySelector("#total-answer");
  const questionContainer = document.querySelector(".bg-white");
  const saveButton = document.querySelector("#savedata-btn");
  const modal = document.querySelector("#modal");
  const titleInput = document.querySelector("#title");

  let correctCount = 0;
  let totalQuestions = quizData.length;

  questionContainer.innerHTML = "";

  quizData.forEach((questionData, index) => {
    const { question, answers, correct_answers, short_explain_for_answer } = questionData;
    const userAnswer = userAnswers[index] || [];
    const isCorrect = arraysEqual(new Set(userAnswer), new Set(correct_answers));

    if (isCorrect) correctCount++;

    let answerHtml = Object.entries(answers)
      .map(([key, value]) => {
        let isUserChoice = userAnswer.includes(key);
        let isCorrectChoice = correct_answers.includes(key);
        let answerClass = isUserChoice
          ? isCorrectChoice
            ? "text-green-600 font-bold"
            : "text-red-600 font-bold"
          : isCorrectChoice
          ? "text-green-600 font-bold"
          : "";
        let icon = isUserChoice
          ? isCorrectChoice
            ? "<img src='../assets/svg/correct-icon.svg' class='inline-block w-5 h-5'/>"
            : "<img src='../assets/svg/wrong-icon.svg' class='inline-block w-5 h-5'/>"
          : "";
        return `<li class='ml-5 ${answerClass}'>${icon} ${key}. ${value}</li>`;
      })
      .join("\n");

    let explanation = short_explain_for_answer;
    if (typeof short_explain_for_answer === "object") {
      explanation = Object.values(short_explain_for_answer).join("<br>");
    }

    questionContainer.innerHTML += `
      <div class="bg_card_inner mb-2 p-2 rounded-lg shadow-lg">
        <div class="flex items-start">
          <div class="flex-1">
            <p class="text-lg font-semibold">${question}</p>
            <ul class="mt-2">${answerHtml}</ul>
            <p class="text-green-600 mt-2 ml-5"><strong>Explain:</strong></p>
            <p class="ml-5">${explanation}</p>
          </div>
          <img src="../assets/svg/${isCorrect ? "good-review-icon.svg" : "bad-review-icon.svg"}" 
               class="ml-4 my-auto w-25 h-25 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-25 lg:h-25" />
        </div>
      </div>`;
  });

  resultContainer.textContent = `You answered ${correctCount}/${totalQuestions} questions correctly!`;

  // 🚀 XÓA DỮ LIỆU LOCALSTORAGE SAU KHI HIỂN THỊ XONG
  localStorage.removeItem("quiz");
  localStorage.removeItem("quiz-answers");

  saveButton.addEventListener("click", function () {
    console.log("Save button clicked");
    const quizTitle = titleInput.value.trim();
    if (!quizTitle) {
      alert("Please enter a title for this quiz!");
      return;
    }
    saveQuizToIndexedDB(quizTitle, quizData, correctCount, totalQuestions);
    modal.classList.add("hidden");
  });
});

function saveQuizToIndexedDB(title, questions, score, totalQuestions) {
  const dbRequest = indexedDB.open("QuizDB", 1);

  dbRequest.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("quizzes")) {
      const store = db.createObjectStore("quizzes", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("title", "title", { unique: false });
    }
  };

  dbRequest.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("quizzes", "readwrite");
    const store = transaction.objectStore("quizzes");
    
    const getAllRequest = store.getAll();
    getAllRequest.onsuccess = function () {
      const existingQuiz = getAllRequest.result.find(q => q.title === title);

      if (existingQuiz) {
        existingQuiz.score = score;
        existingQuiz.submitted_at = new Date().toISOString();
        existingQuiz.totalQuestions = totalQuestions;

        const updateRequest = store.put(existingQuiz);
        updateRequest.onsuccess = function () {
          console.log("Quiz updated successfully!");
          window.location.href = "../pages/saved-quizzes.html";
        };
        updateRequest.onerror = function () {
          console.error("Failed to update quiz!");
        };
      } else {
        const newQuiz = {
          title: title,
          questions: questions,
          score: score,
          submitted_at: new Date().toISOString(),
          totalQuestions: totalQuestions,
        };

        const addRequest = store.add(newQuiz);
        addRequest.onsuccess = function () {
          console.log("Quiz saved successfully!");
          window.location.href = "../pages/saved-quizzes.html";
        };
        addRequest.onerror = function () {
          console.error("Failed to save quiz!");
        };
      }
    };

    getAllRequest.onerror = function () {
      console.error("Failed to check existing quiz!");
    };

    transaction.onerror = function () {
      console.error("Failed to save/update quiz!");
    };
  };

  dbRequest.onerror = function () {
    console.error("Failed to open IndexedDB!");
  };
}

function arraysEqual(setA, setB) {
  return setA.size === setB.size && [...setA].every(value => setB.has(value));
}
