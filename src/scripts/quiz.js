const quizDataAdd = [
  {
    question: "Ai là vị vua đầu tiên của nhà nước Văn Lang?",
    answers: {
      A: "Hùng Vương",
      B: "An Dương Vương",
      C: "Ngô Quyền",
      D: "Lý Thái Tổ",
    },
    correct_answer: "ABC",
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
    correct_answer: "C",
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
    correct_answer: "B",
    short_explain_for_answer:
      "Trần Quốc Tuấn (Trần Hưng Đạo) là vị tướng tài ba, lãnh đạo quân dân Đại Việt kháng chiến chống quân Mông-Nguyên.",
  },
  {
    question: "Vị vua nào đã dời đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay)?",
    answers: {
      A: "Đinh Tiên Hoàng",
      B: "Lê Đại Hành",
      C: "Lý Thái Tổ",
      D: "Trần Thái Tông",
    },
    correct_answer: "C",
    short_explain_for_answer:
      "Lý Thái Tổ quyết định dời đô từ Hoa Lư về Thăng Long năm 1010.",
  },
  {
    question: "Quang Trung là tên của vị vua nào?",
    answers: {
      A: "Lê Thánh Tông",
      B: "Lê Lợi",
      C: "Nguyễn Huệ",
      D: "Mạc Đăng Dung",
    },
    correct_answer: "C",
    short_explain_for_answer:
      "Nguyễn Huệ là tên thật của vua Quang Trung, người có công lớn trong việc đánh tan quân Thanh.",
  },
  {
    question: "Ai là tác giả của bài thơ 'Nam quốc sơn hà'?",
    answers: {
      A: "Lý Thường Kiệt Lý Thường Kiệt Lý Thường Kiệt Lý Thường Kiệt Lý Thường Kiệt",
      B: "Trần Quốc Tuấn",
      C: "Nguyễn Trãi",
      D: "Hồ Chí Minh",
    },
    correct_answer: "A",
    short_explain_for_answer:
      "Lý Thường Kiệt được cho là tác giả của bài thơ 'Nam quốc sơn hà', bản tuyên ngôn độc lập đầu tiên của Việt Nam.",
  },
  {
    question: "Cuộc khởi nghĩa Lam Sơn chống quân Minh do ai lãnh đạo?",
    answers: {
      A: "Trần Quốc Tuấn",
      B: "Lê Lợi",
      C: "Ngô Quyền",
      D: "Lý Thường Kiệt",
    },
    correct_answer: "B",
    short_explain_for_answer:
      "Lê Lợi là người lãnh đạo cuộc khởi nghĩa Lam Sơn đánh đuổi quân Minh xâm lược.",
  },
  {
    question:
      "Hiệp định Geneve năm 1954 được ký kết sau chiến thắng nào của Việt Nam?",
    answers: {
      A: "Điện Biên Phủ",
      B: "Bạch Đằng",
      C: "Chi Lăng",
      D: "Rạch Gầm - Xoài Mút",
    },
    correct_answer: "A",
    short_explain_for_answer:
      "Chiến thắng Điện Biên Phủ đã buộc Pháp phải ngồi vào bàn đàm phán và ký kết Hiệp định Geneve.",
  },
  {
    question: "Ai là vị chủ tịch đầu tiên của nước Việt Nam Dân chủ Cộng hòa?",
    answers: {
      A: "Hồ Chí Minh",
      B: "Tôn Đức Thắng",
      C: "Trường Chinh",
      D: "Phạm Văn Đồng",
    },
    correct_answer: "A",
    short_explain_for_answer:
      "Hồ Chí Minh là vị chủ tịch đầu tiên của nước Việt Nam Dân chủ Cộng hòa (nay là Cộng hòa Xã hội Chủ nghĩa Việt Nam).",
  },
  {
    question:
      "Địa danh nào được mệnh danh là 'Hòn ngọc Viễn Đông' thời Pháp thuộc?",
    answers: {
      A: "Hà Nội",
      B: "Huế",
      C: "Sài Gòn",
      D: "Hải Phòng",
    },
    correct_answer: "C",
    short_explain_for_answer:
      "Sài Gòn (TP.HCM ngày nay) được người Pháp gọi là 'Hòn ngọc Viễn Đông' vì sự phát triển và vẻ đẹp của nó.",
  },
];
const isMd = window.matchMedia("(min-width: 768px)").matches;

let backId = isMd ? "back-button" : "moblie-prev";
let back = document.getElementById(backId);
let next = document.getElementById(isMd ? "next-button" : "moblie-next");
localStorage.setItem("quiz", JSON.stringify(quizDataAdd));
const quizData = JSON.parse(localStorage.getItem("quiz"));
const quizAnswer = JSON.parse(localStorage.getItem("quiz-answer"));
let selectedAnswers = quizAnswer || [];
let currentQuestionIndex = 0;
const submitButton = document.getElementById("submitQuiz");
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
    document.getElementById("current-text").textContent =
      selectedAnswers.length + 1;
    toggleButtonsVisibility();
    console.log(back.id + next.id);
    back.classList.toggle("hidden", currentQuestionIndex <= 0);
    next.classList.toggle(
      "hidden",
      selectedAnswers.length <= currentQuestionIndex
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
      if (selectedAnswers[currentQuestionIndex] === key) {
        button.classList.add("bg-gray-400");
      }

      // Gỡ bỏ event cũ để tránh trùng lặp
      button.replaceWith(button.cloneNode(true));
      answerButtons[key] = document.getElementById(`answer-${key}`);

      answerButtons[key].addEventListener("click", () => {
        // Reset màu tất cả trước khi chọn mới
        Object.values(answerButtons).forEach((btn) =>
          btn.classList.remove("bg-gray-400", "bg-green-500")
        );

        answerButtons[key].classList.add("bg-green-500");
        setTimeout(() => {
          handleAnswer(key);
        }, 1000);
      });
    });
  } else {
    questionText.textContent = "🎉 Bạn đã hoàn thành bài kiểm tra!";
    Object.values(answerButtons).forEach((button) =>
      button.classList.add("hidden")
    );
  }
}
function handleAnswer(selected) {
  selectedAnswers[currentQuestionIndex] = selected;
  currentQuestionIndex++;
  console.log(selectedAnswers);
  console.log(quizData.length);
  document.getElementById("progress-bar").style.width =
    (selectedAnswers.length * 100) / quizData.length + "%";
  showQuestion();
}
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();

  submitButton.addEventListener("click", () => {
    console.log("Bài làm của bạn:", selectedAnswers);
    alert("Bài làm đã được lưu!");
  });
});
document.getElementById("total-text").textContent = quizData.length;
document.getElementById("submitQuiz").addEventListener("click", function () {
  this.classList.add("animate-bounce");
  setTimeout(() => this.classList.remove("animate-bounce"), 500);
});

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
