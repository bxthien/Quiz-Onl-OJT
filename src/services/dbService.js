const DB_NAME = "QuizDB";
const STORE_NAME = "quizzes";
const DB_VERSION = 1;

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
    request.onerror = () => reject("Failed to open IndexedDB.");
  });
}

async function saveQuiz(quiz) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(quiz);

    request.onsuccess = () =>
      resolve("Quiz saved successfully with autoIncrement ID!");
    request.onerror = () => reject("Failed to save quiz.");
  });
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
