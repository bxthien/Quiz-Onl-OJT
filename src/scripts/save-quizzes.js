document.addEventListener("DOMContentLoaded", async () => {
  // const quizzes = await getSavedQuizzes();
  // if (quizzes.length === 0) {
  //   await addFakeData(); // Thêm dữ liệu giả nếu database trống
  // }
  renderQuizzes(); // Hiển thị danh sách quiz
});

async function renderQuizzes() {
  const quizContainer = document.getElementById("quizList");
  quizContainer.innerHTML = ""; // Xóa nội dung cũ

  try {
    const quizzes = await getSavedQuizzes();

    if (quizzes.length === 0) {
      quizContainer.innerHTML =
        "<p class='text-gray-600 text-lg'>No saved quizzes found.</p>";
      return;
    }

    quizzes.forEach((quiz) => {
      const quizCard = document.createElement("div");
      quizCard.innerHTML = `
                <!-- Quiz Card 1 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <!-- Quiz Title Section -->
                <div class="card-gradient p-4">
                    <h2 class="text-white text-lg font-semibold">${
                      quiz.title
                    }</h2>
                </div>

                <!-- Quiz Details Section -->
                <div class="p-4">
                   <p class="text-gray-500">Saved on: ${formatDateTime(
                     quiz.submitted_at
                   )}</p>
                    <p class="text-gray-500 mt-1">Score: ${quiz.score}/${
        quiz.totalQuestions
      }</p>

                    <!-- Action Buttons -->
                    <div class="mt-4 flex gap-3">
                        <!-- Retake Button -->
                        <button
                            class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 retake-btn"
                            data-id="${quiz.id}"
                        >
                            Retake
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>

                        <!-- Delete Button -->
                        <button
                            class="flex-1 border border-red-300 text-red-500 hover:bg-red-50 py-2 px-4 rounded-md flex items-center justify-center gap-2 delete-btn"
                            data-id="${quiz.id}"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            `;
      quizContainer.appendChild(quizCard);
    });
  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("click", (event) => {
  // Nếu phần tử được click có class 'delete-btn'
  if (event.target.closest(".delete-btn")) {
    const quizId = event.target.closest(".delete-btn").getAttribute("data-id");
    console.log("Clicked delete for quiz ID:", quizId);
    showDeletePopup(quizId);
  }

  if (event.target.closest(".retake-btn")) {
    const quizId = event.target.closest(".retake-btn").getAttribute("data-id");
    retakeQuiz(quizId);
  }
});
async function retakeQuiz(quizId) {
  if (!quizId) {
    console.error("Quiz ID is missing!");
    return;
  }

  try {
    // Lấy danh sách quiz từ IndexedDB
    const quizzes = await getSavedQuizzes();
    const quizToRetake = quizzes.find((q) => q.id == quizId);

    if (!quizToRetake) {
      console.error("Quiz not found!");
      return;
    }

    // Lưu quiz vào localStorage để làm lại
    localStorage.setItem("quiz", JSON.stringify(quizToRetake.questions));
    localStorage.setItem("quiz-title", quizToRetake.title);
    localStorage.removeItem("quiz-answers"); // Xóa đáp án cũ
    localStorage.removeItem("quiz-current"); // Reset trạng thái câu hỏi hiện tại

    // Chuyển hướng đến trang quiz
    window.location.href = `quiz.html?quizId=${quizId}`;
  } catch (error) {
    console.error("Error retaking quiz:", error);
  }
}

// Gọi hàm này để xoá quiz theo ID
async function handleDeleteQuiz(quizId) {
  try {
    await deleteQuiz(Number(quizId)); // Đảm bảo ID là số
    console.log(`Quiz ${quizId} deleted!`);
    await renderQuizzes(); // Đợi render hoàn tất
  } catch (error) {
    console.error("Error deleting quiz:", error);
  }
}

function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }); // Format ngày giờ dễ đọc
}

// 🛠 Hiển thị popup xác nhận xoá từ file delete-popup.html
async function showDeletePopup(quizId) {
  try {
    const response = await fetch("delete-popup.html");
    if (!response.ok) throw new Error("Failed to load delete-popup.html");

    const popupHtml = await response.text();

    let popupContainer = document.getElementById("popupContainer");
    if (!popupContainer) {
      popupContainer = document.createElement("div");
      popupContainer.id = "popupContainer";
      document.body.appendChild(popupContainer);
    }

    popupContainer.innerHTML = popupHtml;

    // Thêm sự kiện cho nút Cancel
    document.getElementById("cancelDelete").addEventListener("click", () => {
      popupContainer.innerHTML = ""; // Đóng popup
    });

    // Thêm sự kiện cho nút Delete
    document
      .getElementById("confirmDelete")
      .addEventListener("click", async () => {
        await handleDeleteQuiz(quizId);
        popupContainer.innerHTML = ""; // Xóa popup sau khi xoá quiz
      });
  } catch (error) {
    console.error("❌ Error loading delete-popup:", error);
  }
}
