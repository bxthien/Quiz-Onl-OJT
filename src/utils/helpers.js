// helpers.js

/** ==========================
 *  Quiz Data Helpers
 *  ==========================
 */

// Chuyển đổi dữ liệu từ AI thành format quiz
export const formatQuizData = (aiResponse) => {
  return aiResponse.questions.map((q, index) => ({
    id: index + 1,
    question: q.text,
    options: shuffleArray(q.options),
    correctAnswer: q.answer,
  }));
};

// Trộn ngẫu nhiên đáp án
export const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

// Kiểm tra đáp án đúng hay sai
export const isCorrectAnswer = (userAnswer, correctAnswer) => {
  return userAnswer === correctAnswer;
};

/** ==========================
 *  Quiz Progress Helpers
 *  ==========================
 */

// Tính phần trăm bài làm hoàn tất
export const calculateProgress = (userAnswers, totalQuestions) => {
  const answered = Object.keys(userAnswers).length;
  return Math.round((answered / totalQuestions) * 100);
};

// Kiểm tra xem bài làm đã hoàn tất chưa
export const isQuizCompleted = (userAnswers, totalQuestions) => {
  return Object.keys(userAnswers).length === totalQuestions;
};

/** ==========================
 *  Quiz Grading Helpers
 *  ==========================
 */

// Chấm điểm quiz
export const gradeQuiz = (userAnswers, correctAnswers) => {
  let score = 0;
  Object.keys(userAnswers).forEach((questionId) => {
    if (userAnswers[questionId] === correctAnswers[questionId]) {
      score++;
    }
  });
  return score;
};

// Tạo phản hồi dựa trên điểm số
export const generateFeedback = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return "🌟 Xuất sắc!";
  if (percentage >= 70) return "👍 Tốt lắm!";
  if (percentage >= 50) return "🙂 Cần cải thiện!";
  return "❌ Hãy thử lại!";
};

/** ==========================
 *  UI & Formatting Helpers
 *  ==========================
 */

// Định dạng điểm số
export const formatScore = (score, total) => {
  return `${score}/${total} (${((score / total) * 100).toFixed(1)}%)`;
};

// Định dạng ngày
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("vi-VN", {
    dateStyle: "short",
  });
};

// Định dạng ngày giờ
export const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

// Chuyển đổi giây thành định dạng mm:ss
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
