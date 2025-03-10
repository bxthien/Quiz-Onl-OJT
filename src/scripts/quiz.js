const quizDataAdd = [
  {
    question: "Ai là vị vua đầu tiên của nhà nước Văn Lang?",
    answers: {
      A: "Hùng Vương",
      B: "An Dương Vương",
      C: "Ngô Quyền",
      D: "Lý Thái Tổ",
    },
    correct_answer: ["A", "B", "C"],
    short_explain_for_answer:
      "Hùng Vương là vị vua đầu tiên của nhà nước Văn Lang, mở đầu cho thời kỳ các vua Hùng.",
  },
  {
    question: "Trận Bạch Đằng năm 938 gắn liền với tên tuổi của vị tướng nào?",
    answers: {
      A: "Lý Thường Kiệt",
      B: "Trần Hưng Đạo",
      C: "Ngô Quyền",
      D: "Lê Lợi",
    },
    correct_answer: ["C"],
    short_explain_for_answer:
      "Ngô Quyền là người chỉ huy quân ta đánh tan quân Nam Hán trên sông Bạch Đằng năm 938.",
  },
  {
    question:
      "Ai là người lãnh đạo cuộc kháng chiến chống quân Mông-Nguyên lần thứ nhất?",
    answers: {
      A: "Trần Thủ Độ",
      B: "Trần Quốc Tuấn (Trần Hưng Đạo)",
      C: "Lê Hoàn",
      D: "Quang Trung",
    },
    correct_answer: ["B"],
    short_explain_for_answer:
      "Trần Quốc Tuấn (Trần Hưng Đạo) là vị tướng tài ba, lãnh đạo quân dân Đại Việt kháng chiến chống quân Mông-Nguyên.",
  },
];
const isMd = window.matchMedia("(min-width: 768px)").matches;

let backId = isMd ? "back-button" : "moblie-prev";
let back = document.getElementById(backId);
let next = document.getElementById(isMd ? "next-button" : "moblie-next");
localStorage.setItem("quiz", JSON.stringify(quizDataAdd));
const quizData = JSON.parse(localStorage.getItem("quiz"));
const quizAnswer = JSON.parse(localStorage.getItem("quiz-answers"));
let selectedAnswers = quizAnswer || [];
let currentQuestionIndex = localStorage.getItem("quiz-current")
  ? JSON.parse(localStorage.getItem("quiz-current"))
  : selectedAnswers.length;
const questionText = document.getElementById("question-text");

const answerButtons = {
  A: document.getElementById("answer-A"),
  B: document.getElementById("answer-B"),
  C: document.getElementById("answer-C"),
  D: document.getElementById("answer-D"),
};
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
function showQuestion() {
  if (currentQuestionIndex < quizData.length) {
    document.getElementById("number-of-answer").textContent =
      quizData[currentQuestionIndex].correct_answer.length;
    toggleButtonsVisibility();
    console.log(back.id + next.id);
    back.classList.toggle("hidden", currentQuestionIndex <= 0);
    next.classList.toggle(
      "hidden",
      selectedAnswers.length <= currentQuestionIndex ||
        selectedAnswers[currentQuestionIndex]?.length <
          quizData[currentQuestionIndex].correct_answer.length
    );

    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    Object.keys(answerButtons).forEach((key) => {
      const button = answerButtons[key];
      if (currentQuestion.answers[key]) {
        button.querySelector("p.inline-block").textContent =
          currentQuestion.answers[key];
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }

      // Reset tất cả màu trước khi kiểm tra trạng thái
      button.classList.remove("bg-gray-400", "bg-green-500");

      // Nếu câu hỏi đã có câu trả lời trước đó, đổi màu xám bạc
      if (
        selectedAnswers[currentQuestionIndex] != null &&
        selectedAnswers[currentQuestionIndex].includes(key)
      ) {
        button.classList.add("bg-gray-400");
      }

      // Gỡ bỏ event cũ để tránh trùng lặp
      button.replaceWith(button.cloneNode(true));
      answerButtons[key] = document.getElementById(`answer-${key}`);

      answerButtons[key].addEventListener("click", () => {
        // Reset màu tất cả trước khi chọn mới
        // Object.values(answerButtons).forEach((btn) =>
        //   btn.classList.remove("bg-gray-400", "bg-green-500")
        // );
        if (
          selectedAnswers[currentQuestionIndex] != null &&
          selectedAnswers[currentQuestionIndex].includes(key)
        ) {
          answerButtons[key].classList.remove("bg-gray-400");
          answerButtons[key].classList.remove("bg-green-500");
          answerButtons[key].classList.add("bg-blue-200");
        } else {
          answerButtons[key].classList.add("bg-green-500");
        }

        handleAnswer(key);
      });
    });
  } else {
    questionText.innerHTML =
      '<div class="text-2xl font-bold text-green-500 animate-bounce">🎉 Bạn đã hoàn thành bài kiểm tra!</div><div class="text-2xl font-bold text-amber-600 animate-bounce">🎉 Cùng xem kết quả nào!!!</div>';

    Object.values(answerButtons).forEach((button) =>
      button.classList.add("hidden")
    );
    back.classList.add("hidden");
    next.classList.toggle("hidden");
    document.getElementById("number-answer-div").classList.add("hidden");
    document.getElementById("review-quiz").classList.remove("hidden");
    document.getElementById("back-from-finish").classList.remove("hidden");
    document.getElementById("submit-quiz").classList.add("hidden");
  }
}
function handleAnswer(selected) {
  const correctAnswers = quizData[currentQuestionIndex].correct_answer;
  let selectedList = selectedAnswers[currentQuestionIndex] || [];

  // if (selectedList.includes(selected) && correctAnswers.length > 1) {
  //   // Nếu đã chọn, bỏ chọn
  //   selectedList = selectedList.filter((item) => item !== selected);
  // } else {
  //   // Nếu chưa chọn, thêm vào danh sách
  //   selectedList.push(selected);
  // }
  if (!selectedList.includes(selected) && correctAnswers.length > 1) {
    selectedList.push(selected);
  } else if (correctAnswers.length > 1) {
    selectedList = selectedList.filter((item) => item !== selected);
  } else {
    selectedList = [selected];
  }
  selectedAnswers[currentQuestionIndex] = selectedList;
  console.log("Đáp án đã chọn:", selectedAnswers);

  if (selectedList.length === correctAnswers.length) {
    Object.values(answerButtons).forEach((btn) => (btn.disabled = true));
    selectedList.forEach((key) => {
      answerButtons[key].classList.remove("animate-pulse");

      answerButtons[key].classList.add(
        "animate-[wiggle_1s_ease-in-out_infinite]"
      );
      setTimeout(() => {
        answerButtons[key].classList.remove(
          "animate-[wiggle_1s_ease-in-out_infinite]"
        );
        answerButtons[key].classList.add("animate-pulse");
      }, 1000);
    });
    setTimeout(() => {
      currentQuestionIndex++;
      document.getElementById("progress-bar").style.width =
        (selectedAnswers.length * 100) / quizData.length + "%";
      document.getElementById("current-text").textContent =
        selectedAnswers.length;
      showQuestion();
      Object.values(answerButtons).forEach((btn) => (btn.disabled = false));
    }, 1000);
  } else {
    next.classList.toggle(
      "hidden",
      selectedAnswers.length <= currentQuestionIndex ||
        selectedAnswers[currentQuestionIndex]?.length <
          quizData[currentQuestionIndex].correct_answer.length
    );
  }
}
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();

  document.getElementById("progress-bar").style.width =
    (selectedAnswers.length * 100) / quizData.length + "%";
  document.getElementById("current-text").textContent = selectedAnswers.length;
  document
    .getElementById("back-from-finish")
    .addEventListener("click", function () {
      this.classList.add("animate-bounce");
      setTimeout(() => this.classList.remove("animate-bounce"), 500);
      document.getElementById("number-answer-div").classList.remove("hidden");
      document.getElementById("review-quiz").classList.add("hidden");
      document.getElementById("submit-quiz").classList.remove("hidden");
      this.classList.add("hidden");
      currentQuestionIndex--;
      showQuestion();
    });

  const submitBtn = document.getElementById("submit-quiz");
  const modal = document.getElementById("submit-modal");
  const cancelBtn = document.getElementById("cancel-submit");
  const confirmBtn = document.getElementById("confirm-submit");
  const submitReviewBtn = document.getElementById("review-quiz");
  const modalReview = document.getElementById("review-modal");
  const cancelReviewBtn = document.getElementById("cancel-review");
  const confirmReviewBtn = document.getElementById("confirm-review");

  // Khi nhấn Submit, hiện modal
  submitBtn.addEventListener("click", function () {
    this.classList.add("animate-bounce");
    setTimeout(() => this.classList.remove("animate-bounce"), 500);
    modal.classList.remove("hidden");
  });

  // Khi nhấn Cancel, ẩn modal
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Khi nhấn Sure, lưu dữ liệu vào localStorage và chuyển trang
  confirmBtn.addEventListener("click", () => {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));
    window.location.href = "pages/quiz-review.html";
  });
  submitReviewBtn.addEventListener("click", function () {
    this.classList.add("animate-bounce");
    setTimeout(() => this.classList.remove("animate-bounce"), 500);
    modalReview.classList.remove("hidden");
  });

  // Khi nhấn Cancel, ẩn modal
  cancelReviewBtn.addEventListener("click", () => {
    modalReview.classList.add("hidden");
  });

  // Khi nhấn Sure, lưu dữ liệu vào localStorage và chuyển trang
  confirmReviewBtn.addEventListener("click", () => {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));
    window.location.href = "pages/quiz-review.html";
  });
});

document.getElementById("total-text").textContent = quizData.length;

document.getElementById("character").addEventListener("click", function () {
  this.classList.add("animate-wiggle");
  setTimeout(() => this.classList.remove("animate-wiggle"), 500);
});
document
  .getElementById("character-left")
  .addEventListener("click", function () {
    this.classList.add("animate-wiggle");
    setTimeout(() => this.classList.remove("animate-wiggle"), 500);
  });
back.addEventListener("click", () => {
  currentQuestionIndex--;
  showQuestion();
});

next.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});
