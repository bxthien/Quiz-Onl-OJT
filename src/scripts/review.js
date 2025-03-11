document.addEventListener("DOMContentLoaded", function () {
  const quizData = JSON.parse(localStorage.getItem("quiz")) || [];
  const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];
  if (!quizData || !userAnswers) {
    window.location.href = "../index.html";
  }
  const resultContainer = document.querySelector("#total-answer");
  const questionContainer = document.querySelector(".bg-white");
  const saveButton = document.querySelector("#save");
  const modal = document.querySelector("#modal");
  const titleInput = document.querySelector("#title");
  const quizId = localStorage.getItem("quiz-id");
  localStorage.clear();
  let correctCount = 0;
  let totalQuestions = quizData.length;
  const openModal = document.getElementById("open-save-btn");
  const closeModal = document.getElementById("close-save-btn");
  const modalUpdate = document.getElementById("update-modal");
  const closeUpdateModal = document.getElementById("close-update-btn");
  const updateToNewBtn = document.getElementById("switch-to-new");
  const updateBtn = document.getElementById("update");
  openModal.addEventListener("click", () => {
    if (quizId) {
      modalUpdate.classList.remove("hidden");
    } else {
      modal.classList.remove("hidden");
    }
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  closeUpdateModal.addEventListener("click", () => {
    modalUpdate.classList.add("hidden");
  });
  updateToNewBtn.addEventListener("click", () => {
    modalUpdate.classList.add("hidden");
    modal.classList.remove("hidden");
  });

  const backToTopButton = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove("hidden");
    } else {
      backToTopButton.classList.add("hidden");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  questionContainer.innerHTML = "";

  quizData.forEach((questionData, index) => {
    const { question, answers, correct_answers, short_explain_for_answer } =
      questionData;
    const userAnswer = userAnswers[index] || [];
    const isCorrect = arraysEqual(
      new Set(userAnswer),
      new Set(correct_answers)
    );

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
                <div class="flex justify-between">
                  <ul class="mt-2">${answerHtml}</ul>
                    <img src="../assets/svg/${
                      isCorrect ? "good-review-icon.svg" : "bad-review-icon.svg"
                    }" 
                    class="ml-4 my-auto w-25 h-25 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-25 lg:h-25" />
                </div>
                <p class="text-green-600 mt-2 ml-5"><strong>Explain:</strong></p>
                <p class="ml-5">${explanation}</p>
              </div>
            </div>
          </div>
      
      `;
  });

  resultContainer.textContent = `You answered ${correctCount}/${totalQuestions} questions correctly!`;

  saveButton.addEventListener("click", function () {
    console.log("Save button clicked");
    const quizTitle = titleInput.value.trim();
    if (!quizTitle) {
      alert("Please enter a title for this quiz!");
      return;
    }
    saveNewQuiz(quizTitle, quizData, correctCount, totalQuestions);
    modal.classList.add("hidden");
  });
  updateBtn.addEventListener("click", function () {
    console.log("Update button clicked");
    updateQuiz(quizId, correctCount, totalQuestions);
    modalUpdate.classList.add("hidden");
  });
});

function saveNewQuiz(title, questions, score, totalQuestions) {
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

    const newQuiz = {
      title: title,
      questions: questions,
      score: score,
      totalQuestions: totalQuestions,
      submitted_at: new Date().toISOString(),
    };

    const addRequest = store.add(newQuiz);

    addRequest.onsuccess = function () {
      console.log("✅ Quiz saved successfully!");
      showPopup("Success!", "✅ Quiz saved successfully!.");
    };

    addRequest.onerror = function (error) {
      console.error("❌ Failed to save quiz:", error);
      showPopup("Error!", "❌ Failed to save quiz");
    };

    transaction.onerror = function (error) {
      console.error("❌ Transaction failed:", error);
      showPopup("Error!", "❌ Transaction failed");
    };
  };

  dbRequest.onerror = function (error) {
    console.error("❌ Failed to open IndexedDB:", error);
    showPopup("Error!", "❌ Failed to open IndexedDB");
  };
}
function updateQuiz(id, score, totalQuestions) {
  const dbRequest = indexedDB.open("QuizDB", 1);

  dbRequest.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("quizzes", "readwrite");
    const store = transaction.objectStore("quizzes");

    const getRequest = store.get(Number(id));

    getRequest.onsuccess = function () {
      const existingQuiz = getRequest.result;
      if (existingQuiz) {
        existingQuiz.score = score;
        existingQuiz.totalQuestions = totalQuestions;
        existingQuiz.submitted_at = new Date().toISOString();

        const updateRequest = store.put(existingQuiz);

        updateRequest.onsuccess = function () {
          console.log("✅ Quiz updated successfully!");
          showPopup("Success!", "✅ Quiz updated successfully!");
        };

        updateRequest.onerror = function (error) {
          console.error("❌ Failed to update quiz:", error);
          showPopup("Error!", "❌ Failed to update quiz!");
        };
      } else {
        console.warn("⚠️ No existing quiz found with ID:", id);
        showPopup("Wanning!", "⚠️ No existing quiz found with ID!");
      }
    };

    getRequest.onerror = function (error) {
      console.error("❌ Failed to retrieve quiz for update:", error);
      showPopup("Error!", "❌ Failed to retrieve quiz for update");
    };

    transaction.onerror = function (error) {
      console.error("❌ Transaction failed:", error);
      showPopup("Error!", "❌ Transaction failed");
    };
  };

  dbRequest.onerror = function (error) {
    console.error("❌ Failed to open IndexedDB:", error);
    showPopup("Error!", "❌ Failed to open IndexedDB");
  };
}

function arraysEqual(setA, setB) {
  return setA.size === setB.size && [...setA].every((value) => setB.has(value));
}
