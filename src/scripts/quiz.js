const isMd = window.matchMedia("(min-width: 768px)").matches;
const buttonSound = new Audio("../assets/sounds/funny_button_pressin_quiz.mp3");
const audio = document.getElementById("background-music");
const toggleBtn = document.getElementById("toggle-music");
const toggleSoundBtn = document.getElementById("toggle-button-sound");
audio.volume = 0.5;
let isBackgroundPlaying = false;
let isVFXPlaying = false;
const finishQuizSound = new Audio("../assets/sounds/finish-quiz.mp3");
let backId = isMd ? "back-button" : "moblie-prev";
let back = document.getElementById(backId);
let next = document.getElementById(isMd ? "next-button" : "moblie-next");
const quizData = JSON.parse(localStorage.getItem("quiz"));
if (!quizData) {
  window.location.href = "../index.html";
}
const quizAnswer = JSON.parse(localStorage.getItem("quiz-answers"));
let selectedAnswers = quizAnswer || [];
let currentQuestionIndex = localStorage.getItem("quiz-current")
  ? parseInt(localStorage.getItem("quiz-current"), 10)
  : selectedAnswers.length;

const questionText = document.getElementById("question-text");
const questionBoard = document.getElementById("question-board");
const answerButtons = {
  A: document.getElementById("answer-A"),
  B: document.getElementById("answer-B"),
  C: document.getElementById("answer-C"),
  D: document.getElementById("answer-D"),
};
function animOut(direction) {
  return direction === "next" ? "slide-out-left" : "slide-out-right";
}
function animIn(direction) {
  return direction === "next" ? "slide-in-right" : "slide-in-left";
}
let isAnimating = false;

function boardSwipe(direction) {
  if (isAnimating) return; // Chặn nếu animation đang chạy
  isAnimating = true;

  questionBoard.classList.add(animOut(direction));

  setTimeout(() => {
    questionBoard.classList.remove(animOut(direction));
    questionBoard.classList.add(animIn(direction));

    direction === "next" ? currentQuestionIndex++ : currentQuestionIndex--;

    document.getElementById("progress-bar").style.width =
      (currentQuestionIndex * 100) / quizData.length + "%";

    showQuestion();

    setTimeout(() => {
      questionBoard.classList.remove(animIn(direction));
      isAnimating = false; // Reset flag sau animation
    }, 500);
    Object.values(answerButtons).forEach((btn) => (btn.disabled = false));
  }, 500);
}
function toggleButtonsVisibility() {
  const isSm = window.matchMedia("(max-width: 767px)").matches;
  if (isSm) {
    document.getElementById("back-button").classList.add("hidden");
    document.getElementById("next-button").classList.add("hidden");
  } else {
    document.getElementById("back-button").classList.remove("hidden");
    document.getElementById("next-button").classList.remove("hidden");
  }
}
function resizeButton(button) {
  const sourceButton = document.getElementById("sourceButton");
  const targetButton = document.getElementById("targetButton");

  if (sourceButton && targetButton) {
    const height = button.offsetHeight;
    targetButton.style.height = `${height}px`;
  }
}
function showQuestion() {
  toggleButtonsVisibility();
  document.getElementById("current-text").textContent = currentQuestionIndex;
  if (currentQuestionIndex < quizData.length) {
    document.getElementById("number-of-answer").textContent =
      quizData[currentQuestionIndex].correct_answers.length;

    console.log(back.id + next.id);
    back.classList.toggle("hidden", currentQuestionIndex <= 0);
    next.classList.toggle(
      "hidden",
      selectedAnswers.length <= currentQuestionIndex ||
        selectedAnswers[currentQuestionIndex]?.length <
          quizData[currentQuestionIndex].correct_answers.length
    );

    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    Object.keys(answerButtons).forEach((key) => {
      const button = answerButtons[key];
      button.disabled = false;
      if (currentQuestion.answers[key]) {
        button.querySelector("p.inline-block").textContent =
          currentQuestion.answers[key];
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }

      // Reset tất cả màu trước khi kiểm tra trạng thái
      button.classList.remove("bg-blue-400", "bg-green-700");

      // Nếu câu hỏi đã có câu trả lời trước đó, đổi m  àu xám bạc
      if (
        selectedAnswers[currentQuestionIndex] != null &&
        selectedAnswers[currentQuestionIndex].includes(key)
      ) {
        button.classList.add("bg-blue-400");
      }

      button.replaceWith(button.cloneNode(true));
      answerButtons[key] = document.getElementById(`answer-${key}`);

      answerButtons[key].addEventListener("click", () => {
        console.log(isVFXPlaying);
        if (isVFXPlaying) {
          playButtonSound();
        }
        if (
          selectedAnswers[currentQuestionIndex] != null &&
          selectedAnswers[currentQuestionIndex].includes(key) &&
          quizAnswer[currentQuestionIndex].length !== 1
        ) {
          answerButtons[key].classList.remove("bg-blue-400", "bg-green-700");
          answerButtons[key].classList.add("bg-blue-200");
        } else {
          answerButtons[key].classList.add("bg-green-700");
        }

        handleAnswer(key);
      });
    });
    // Đặt height về auto trước để tính chính xác
    Object.values(answerButtons).forEach((btn) => (btn.style.height = "auto"));

    // Lấy chiều cao lớn nhất
    let maxHeight = Math.max(
      ...Object.values(answerButtons).map((btn) => btn.offsetHeight)
    );

    // Gán chiều cao lớn nhất cho tất cả button
    Object.values(answerButtons).forEach(
      (btn) => (btn.style.height = `${maxHeight}px`)
    );
  } else {
    questionText.innerHTML =
      '<div class="text-[35px] font-bold text-green-900 neon-text">🎉 You have completed the quiz!</div><div class="text-sm font-bold text-amber-600 neon-text">🎉 Let\'s check the results!!!</div>';

    Object.values(answerButtons).forEach((button) =>
      button.classList.add("hidden")
    );
    back.classList.add("hidden");
    next.classList.add("hidden");
    document.getElementById("number-answer-div").classList.add("hidden");
    document.getElementById("review-quiz").classList.remove("hidden");
    document.getElementById("back-from-finish").classList.remove("hidden");
    document.getElementById("submit-quiz").classList.add("hidden");
    finishQuizSound.play();
    finishQuizSound.currentTime = 0;
  }
}
function handleAnswer(selected) {
  const correctAnswers = quizData[currentQuestionIndex].correct_answers;
  let selectedList = selectedAnswers[currentQuestionIndex] || [];
  if (!selectedList.includes(selected) && correctAnswers.length > 1) {
    selectedList.push(selected);
  } else if (correctAnswers.length > 1) {
    selectedList = selectedList.filter((item) => item !== selected);
  } else {
    if (selectedList[0]) {
      answerButtons[selectedList[0]].classList.remove("bg-blue-400");
    }
    Object.keys(answerButtons).forEach((key) => {
      answerButtons[key].disabled = false;
    });
    selectedList = [selected];
  }
  selectedAnswers[currentQuestionIndex] = selectedList;
  console.log("Số lượng đáp án:", selectedAnswers[currentQuestionIndex].length);
  console.log("Đáp án đã chọn:", selectedAnswers);

  if (selectedAnswers[currentQuestionIndex].length === correctAnswers.length) {
    Object.values(answerButtons).forEach((btn) => (btn.disabled = true));
    selectedList.forEach((key) => {
      // answerButtons[key].classList.remove("animate-pulse");

      answerButtons[key].classList.add(
        "animate-[wiggle_1s_ease-in-out_infinite]"
      );
      setTimeout(() => {
        answerButtons[key].classList.remove(
          "animate-[wiggle_1s_ease-in-out_infinite]"
        );
        // answerButtons[key].classList.add("animate-pulse");
      }, 1000);
    });
    document.getElementById("progress-bar").style.width =
      ((currentQuestionIndex + 1) * 100) / quizData.length + "%";
    document.getElementById("current-text").textContent =
      currentQuestionIndex + 1;
    setTimeout(() => {
      boardSwipe("next");
    }, 1000);
  } else {
    next.classList.toggle(
      "hidden",
      selectedAnswers.length <= currentQuestionIndex ||
        selectedAnswers[currentQuestionIndex]?.length !==
          quizData[currentQuestionIndex].correct_answers.length
    );
  }
}

// Hàm phát âm thanh
function playButtonSound() {
  buttonSound.currentTime = 0; // Reset thời gian để không bị delay
  buttonSound.play();
}
document.addEventListener("DOMContentLoaded", () => {
  toggleBtn.addEventListener("click", function () {
    if (isBackgroundPlaying) {
      audio.pause();
      toggleBtn.textContent = "🔇";
    } else {
      audio.play();
      toggleBtn.textContent = "🔊";
    }
    isBackgroundPlaying = !isBackgroundPlaying;
  });
  toggleSoundBtn.addEventListener("click", function () {
    if (isVFXPlaying) {
      document.querySelectorAll("button").forEach((button) => {
        button.removeEventListener("click", playButtonSound);
      });
      toggleSoundBtn.textContent = "🎛";
    } else {
      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", playButtonSound);
      });
      toggleSoundBtn.textContent = "🔛";
    }
    isVFXPlaying = !isVFXPlaying;
  });

  const techDots = document.querySelector(".tech-dots");
  const chars = "0123456789ABCDEF#%@&$";

  for (let i = 0; i < 120; i++) {
    const charEl = document.createElement("span");
    charEl.classList.add("tech-char");
    charEl.textContent = chars[Math.floor(Math.random() * chars.length)];

    // Random vị trí trên màn hình
    charEl.style.top = Math.random() * 100 + "vh";
    charEl.style.left = Math.random() * 100 + "vw";

    // Random tốc độ và kích thước
    charEl.style.animationDuration = Math.random() * 5 + 5 + "s";
    charEl.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";

    techDots.appendChild(charEl);
  }
  const questionBox = document.getElementById("question");
  const techDotsScreen = document.createElement("div");
  techDotsScreen.classList.add("question-tech-dots");
  questionBox.appendChild(techDotsScreen);
  // const charsQuest = "Minh";
  // for (let i = 0; i < 40; i++) {
  //   const charEl = document.createElement("span");
  //   charEl.classList.add("question-tech-char");
  //   charEl.textContent =
  //     charsQuest[Math.floor(Math.random() * charsQuest.length)];

  //   // Random vị trí bên trong bảng
  //   charEl.style.top = Math.random() * 100 + "%";
  //   charEl.style.left = Math.random() * 100 + "%";

  //   // Random tốc độ và kích thước
  //   charEl.style.animationDuration = Math.random() * 5 + 5 + "s";
  //   charEl.style.fontSize = Math.random() * 1.2 + 0.8 + "rem";

  //   techDotsScreen.appendChild(charEl);
  // }
  showQuestion();
  if (currentQuestionIndex <= quizData.length) {
    document.getElementById("progress-bar").style.width =
      (currentQuestionIndex * 100) / quizData.length + "%";
    document.getElementById("current-text").textContent = currentQuestionIndex;
  }

  document
    .getElementById("back-from-finish")
    .addEventListener("click", function () {
      boardSwipe("back");
      setTimeout(() => {
        document.getElementById("number-answer-div").classList.remove("hidden");
        document.getElementById("review-quiz").classList.add("hidden");
        document.getElementById("submit-quiz").classList.remove("hidden");
        this.classList.add("hidden");
      }, 500);
    });

  const submitBtn = document.getElementById("submit-quiz");
  const modal = document.getElementById("submit-modal");
  const cancelBtn = document.getElementById("cancel-submit");
  const confirmBtn = document.getElementById("confirm-submit");
  const submitReviewBtn = document.getElementById("review-quiz");
  const modalReview = document.getElementById("review-modal");
  const cancelReviewBtn = document.getElementById("cancel-review");
  const confirmReviewBtn = document.getElementById("confirm-review");

  submitBtn.addEventListener("click", function () {
    this.classList.add("animate-bounce");
    setTimeout(() => this.classList.remove("animate-bounce"), 500);
    modal.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", () => {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));
    localStorage.removeItem("quiz-current");
    window.location.href = "quiz-review.html";
  });
  submitReviewBtn.addEventListener("click", function () {
    this.classList.add("animate-bounce");
    setTimeout(() => this.classList.remove("animate-bounce"), 500);
    modalReview.classList.remove("hidden");
  });

  // Khi nhấn Cancel, ẩn modal
  cancelReviewBtn.addEventListener("click", () => {
    submitReviewBtn.classList.add("animate-bounce");
    modalReview.classList.add("hidden");
  });

  // Khi nhấn Sure, lưu dữ liệu vào localStorage và chuyển trang
  confirmReviewBtn.addEventListener("click", () => {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));
    localStorage.removeItem("quiz-current");
    window.location.href = "quiz-review.html";
  });
});
function saveToLocal() {
  if (selectedAnswers && currentQuestionIndex) {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers) || []);
    localStorage.setItem("quiz-current", currentQuestionIndex || 0);
  }
}

setInterval(saveToLocal, 5000);

window.addEventListener("beforeunload", () => {
  saveToLocal();
});
document.getElementById("total-text").textContent = quizData.length;

document.getElementById("character").addEventListener("click", function () {
  this.classList.add("animate-wiggle");
  if (this.classList.contains("scale-30")) {
    this.classList.remove("scale-30");
    this.classList.add("scale-90");
  } else {
    this.classList.remove("scale-90");
    this.classList.add("scale-30");
  }
  setTimeout(() => this.classList.remove("animate-wiggle"), 500);
});
document
  .getElementById("character-left")
  .addEventListener("click", function () {
    this.classList.add("animate-wiggle");
    if (this.classList.contains("scale-30")) {
      this.classList.remove("scale-30");
      this.classList.add("scale-90");
    } else {
      this.classList.remove("scale-90");
      this.classList.add("scale-30");
    }
    setTimeout(() => this.classList.remove("animate-wiggle"), 500);
  });
back.addEventListener("click", () => {
  boardSwipe("back");
});

next.addEventListener("click", () => {
  boardSwipe("next");
});
document.addEventListener("resize", () => {
  toggleButtonsVisibility();
});
