const quizDataAdd = [
  {
    question:
      "Nhân vật nào đóng vai trò quan trọng trong việc gây ra Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Adolf Hitler",
      B: "Joseph Stalin",
      C: "Benito Mussolini",
      D: "Franklin D. Roosevelt",
    },
    correct_answers: ["A", "B", "C"],
    short_explain_for_answer: {
      A: "Hitler và chủ nghĩa phát xít Đức là động lực chính gây chiến.",
      B: "Stalin và Liên Xô có vai trò trong việc gây ra căng thẳng quốc tế.",
      C: "Mussolini và chủ nghĩa phát xít Ý là đồng minh quan trọng của Đức.",
    },
  },
  {
    question:
      "Sự kiện nào đánh dấu sự bắt đầu của Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Cuộc xâm lược Ba Lan của Đức",
      B: "Vụ tấn công Trân Châu Cảng",
      C: "Sự kiện ám sát Tổng thống Áo-Hung Franz Ferdinand",
      D: "Hiệp ước Versailles được ký kết",
    },
    correct_answers: ["A"],
    short_explain_for_answer: {
      A: "Đức xâm lược Ba Lan ngày 1 tháng 9 năm 1939, dẫn đến việc Anh và Pháp tuyên chiến với Đức.",
    },
  },
  {
    question:
      "Những quốc gia nào thuộc phe Đồng Minh trong Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Đức",
      B: "Liên Xô",
      C: "Hoa Kỳ",
      D: "Anh",
    },
    correct_answers: ["B", "C", "D"],
    short_explain_for_answer: {
      B: "Liên Xô tham gia phe Đồng Minh sau khi bị Đức tấn công.",
      C: "Hoa Kỳ tham gia sau vụ tấn công Trân Châu Cảng.",
      D: "Anh là một trong những quốc gia đầu tiên tham gia chiến tranh chống lại Đức.",
    },
  },
  {
    question:
      "Trận đánh nào được coi là bước ngoặt quan trọng trong Chiến tranh Thế giới thứ hai ở châu Âu?",
    answers: {
      A: "Trận Stalingrad",
      B: "Trận Normandy",
      C: "Trận Midway",
      D: "Trận Dunkirk",
    },
    correct_answers: ["A"],
    short_explain_for_answer: {
      A: "Trận Stalingrad đánh dấu sự thất bại lớn của quân Đức trên mặt trận phía Đông, làm thay đổi cục diện chiến tranh ở châu Âu.",
    },
  },
  {
    question:
      "Vũ khí nào sau đây được sử dụng lần đầu tiên trong Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Bom nguyên tử",
      B: "Tàu ngầm",
      C: "Máy bay phản lực",
      D: "Súng trường",
    },
    correct_answers: ["A"],
    short_explain_for_answer: {
      A: "Bom nguyên tử được sử dụng tại Hiroshima và Nagasaki vào cuối chiến tranh.",
    },
  },
  {
    question:
      "Hậu quả nào sau đây là kết quả trực tiếp của Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Sự hình thành Liên Hợp Quốc",
      B: "Sự sụp đổ của chủ nghĩa phát xít",
      C: "Chiến tranh Lạnh",
      D: "Sự chia cắt nước Đức",
    },
    correct_answers: ["A", "B", "C", "D"],
    short_explain_for_answer: {
      A: "Liên Hợp Quốc được thành lập để ngăn chặn chiến tranh tương lai.",
      B: "Chủ nghĩa phát xít bị đánh bại hoàn toàn.",
      C: "Chiến tranh Lạnh bắt đầu giữa các cường quốc thắng trận.",
      D: "Nước Đức bị chia cắt thành hai quốc gia: Đông Đức và Tây Đức.",
    },
  },
  {
    question:
      "Ai là tổng thống Hoa Kỳ trong suốt phần lớn thời gian của Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Harry S. Truman",
      B: "Dwight D. Eisenhower",
      C: "Franklin D. Roosevelt",
      D: "John F. Kennedy",
    },
    correct_answers: ["C"],
    short_explain_for_answer: {
      C: "Franklin D. Roosevelt là tổng thống Hoa Kỳ khi chiến tranh bắt đầu và qua đời trước khi chiến tranh kết thúc.",
    },
  },
  {
    question:
      "Chiến dịch nào sau đây là một phần của chiến lược của quân Đồng Minh ở châu Âu?",
    answers: {
      A: "Chiến dịch Barbarossa",
      B: "Chiến dịch Normandy",
      C: "Chiến dịch Market Garden",
      D: "Chiến dịch Overlord",
    },
    correct_answers: ["B", "D"],
    short_explain_for_answer: {
      B: "Chiến dịch Normandy là cuộc đổ bộ của quân Đồng Minh vào Normandy.",
      D: "Chiến dịch Overlord là tên mã của chiến dịch Normandy.",
    },
  },
  {
    question:
      "Ngày nào được coi là ngày kết thúc Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Ngày 2 tháng 9 năm 1939",
      B: "Ngày 6 tháng 8 năm 1945",
      C: "Ngày 2 tháng 9 năm 1945",
      D: "Ngày 8 tháng 5 năm 1945",
    },
    correct_answers: ["C"],
    short_explain_for_answer: {
      C: "Ngày 2 tháng 9 năm 1945, Nhật Bản chính thức đầu hàng không điều kiện, đánh dấu sự kết thúc của Chiến tranh Thế giới thứ hai.",
    },
  },
  {
    question:
      "Những quốc gia nào thuộc phe Trục trong Chiến tranh Thế giới thứ hai?",
    answers: {
      A: "Đức",
      B: "Nhật Bản",
      C: "Ý",
      D: "Liên Xô",
    },
    correct_answers: ["A", "B", "C"],
    short_explain_for_answer: {
      A: "Đức là một trong những quốc gia thành lập phe Trục.",
      B: "Nhật Bản là một trong những quốc gia thành lập phe Trục.",
      C: "Ý là một trong những quốc gia thành lập phe Trục.",
    },
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
  ? localStorage.getItem("quiz-current")
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
  document.getElementById("progress-bar").style.width =
    (currentQuestionIndex * 100) / quizData.length + "%";
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
      if (currentQuestion.answers[key]) {
        button.querySelector("p.inline-block").textContent =
          currentQuestion.answers[key];
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }

      // Reset tất cả màu trước khi kiểm tra trạng thái
      button.classList.remove("bg-blue-400", "bg-green-500");

      // Nếu câu hỏi đã có câu trả lời trước đó, đổi màu xám bạc
      if (
        selectedAnswers[currentQuestionIndex] != null &&
        selectedAnswers[currentQuestionIndex].includes(key)
      ) {
        button.classList.add("bg-blue-400");
      }

      button.replaceWith(button.cloneNode(true));
      answerButtons[key] = document.getElementById(`answer-${key}`);

      answerButtons[key].addEventListener("click", () => {
        if (
          selectedAnswers[currentQuestionIndex] != null &&
          selectedAnswers[currentQuestionIndex].includes(key)
        ) {
          answerButtons[key].classList.remove("bg-blue-400", "bg-green-500");
          answerButtons[key].classList.add("bg-blue-200");
        } else {
          answerButtons[key].classList.add("bg-green-500");
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
      '<div class="text-2xl font-bold text-green-500">🎉 Bạn đã hoàn thành bài kiểm tra!</div><div class="text-2xl font-bold text-amber-600">🎉 Cùng xem kết quả nào!!!</div>';

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
    setTimeout(() => {
      currentQuestionIndex++;
      document.getElementById("progress-bar").style.width =
        (selectedAnswers.length * 100) / quizData.length + "%";
      document.getElementById("current-text").textContent =
        currentQuestionIndex;
      showQuestion();
      Object.values(answerButtons).forEach((btn) => (btn.disabled = false));
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
document.addEventListener("DOMContentLoaded", () => {
  if (!quizData) {
    window.location.href = "../index.html";
  }
  showQuestion();
  document.getElementById("progress-bar").style.width =
    (currentQuestionIndex * 100) / quizData.length + "%";
  document.getElementById("current-text").textContent = currentQuestionIndex;
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
    localStorage.removeItem("quiz-current");
    window.location.href = "pages/quiz-review.html";
  });
});
function saveToLocal() {
  if (selectedAnswers && currentQuestionIndex) {
    localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers) || []);
    localStorage.setItem("quiz-current", currentQuestionIndex || 0);
  }
}

setInterval(saveToLocal, 3000);

window.addEventListener("beforeunload", () => {
  saveToLocal();
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
document.addEventListener("resize", () => {
  toggleButtonsVisibility();
});
