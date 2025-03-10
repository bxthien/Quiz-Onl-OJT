const DB_NAME = "QuizDB";
const STORE_NAME = "quizzes";
const DB_VERSION = 1;

async function getQuizById(id) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          reject(`Quiz với ID ${id} không tồn tại.`);
        }
      };

      request.onerror = () => reject("Lỗi khi lấy dữ liệu từ IndexedDB.");
    });
  } catch (error) {
    throw new Error("Lỗi khi mở IndexedDB: " + error);
  }
}

async function saveQuiz(quiz) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(quiz);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Lỗi khi lưu quiz vào IndexedDB.");
    });
  } catch (error) {
    throw new Error("Lỗi khi mở IndexedDB: " + error);
  }
}

async function getSavedQuizzes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to retrieve quizzes.");
  });
}

async function deleteQuiz(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () =>
      resolve(`Quiz with ID ${id} deleted successfully.`);
    request.onerror = () => reject("Failed to delete quiz.");
  });
}

export { saveQuiz, getSavedQuizzes, deleteQuiz };
