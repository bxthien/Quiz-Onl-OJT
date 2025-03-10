const DB_NAME = "quizDB";
const STORE_NAME = "saved_quizzes";
const DB_VERSION = 1;

// Mở database (tạo nếu chưa có)
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error opening database!");
  });
}

// Lưu hoặc cập nhật quiz (ghi đè nếu retake)
async function saveQuiz(quiz) {
  const db = await openDB();
  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Kiểm tra nếu đã có quiz trước đó (cùng tiêu đề)
    const quizzes = await getSavedQuizzes();
    const existingQuiz = quizzes.find((q) => q.title === quiz.title);

    if (existingQuiz) {
      quiz.id = existingQuiz.id; // Giữ nguyên ID cũ để ghi đè
    }

    store.put(quiz); // Sử dụng `put()` để ghi đè nếu ID đã tồn tại
    transaction.oncomplete = () => resolve("Quiz saved (or updated)!");
    transaction.onerror = () => reject("Failed to save quiz!");
  });
}

// Lấy tất cả quiz từ database
async function getSavedQuizzes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching quizzes!");
  });
}

// Xóa quiz theo ID
async function deleteQuiz(quizId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(quizId);

      transaction.oncomplete = async () => {
        console.log(`✅ Quiz ${quizId} deleted successfully`);
        resolve(); // Chỉ resolve khi transaction hoàn thành
      };

      transaction.onerror = (event) => {
        console.error(`❌ Failed to delete quiz ${quizId}`, event.target.error);
        reject("Failed to delete quiz!");
      };
    });
  } catch (error) {
    console.error("❌ Error opening database:", error);
  }
}

// Thêm dữ liệu giả nếu database trống
async function addFakeData() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Kiểm tra nếu database đã có dữ liệu
    const countRequest = store.count();
    countRequest.onsuccess = () => {
      if (countRequest.result > 0) {
        console.log("Database already has data.");
        resolve();
        return;
      }

      // Nếu database trống, thêm dữ liệu giả
      const fakeQuizzes = [
        {
          title: "Math Quiz - Grade 10",
          savedOn: new Date().toISOString().split("T")[0],
          grade: 8,
          score: 75, // Điểm số
          questions: [
            {
              question: "5 + 3 = ?",
              options: ["5", "8", "6", "9"],
              answer: "8",
            },
            {
              question: "10 / 2 = ?",
              options: ["4", "5", "6", "2"],
              answer: "5",
            },
          ],
        },
        {
          title: "Science Quiz - Grade 8",
          savedOn: new Date().toISOString().split("T")[0],
          grade: 7,
          score: 90,
          questions: [
            {
              question: "Red Planet?",
              options: ["Earth", "Mars", "Jupiter"],
              answer: "Mars",
            },
            {
              question: "Plants absorb?",
              options: ["Oxygen", "CO2", "Nitrogen"],
              answer: "CO2",
            },
          ],
        },
      ];

      fakeQuizzes.forEach((quiz) => {
        store.add(quiz); // Không cần ID, tự động tạo
      });

      transaction.oncomplete = () => resolve("Fake data added!");
      transaction.onerror = () => reject("Error adding fake data!");
    };

    countRequest.onerror = () => reject("Error checking database count!");
  });
}

// Khi tải trang, thêm dữ liệu giả
document.addEventListener("DOMContentLoaded", async () => {
  await addFakeData().catch(console.error);
});
