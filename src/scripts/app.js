document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra nếu phần tử có tồn tại trước khi gán sự kiện
  let quizButton = document.getElementById("quiz-generator");
  let historyButton = document.getElementById("saved-quiz-history");

  if (quizButton) {
    quizButton.addEventListener("click", function () {
      window.location.href = "./pages/chat.html"; // Thay bằng trang đích của bạn
    });
  }

  if (historyButton) {
    historyButton.addEventListener("click", function () {
      window.location.href = "./pages/quiz-history.html"; // Thay bằng trang đích của bạn
    });
  }
});
