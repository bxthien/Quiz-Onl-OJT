document.addEventListener("DOMContentLoaded", () => {
  // 🟢 Default selected level
  let selectedLevel = "Easy";

  /** 📌 Handle Level Selection */
  const levelButtons = document.querySelectorAll(".levelBtn");
  levelButtons[0].classList.add("selected-button");

  levelButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      levelButtons.forEach((btn) => btn.classList.remove("selected-button"));
      event.target.classList.add("selected-button");
      selectedLevel = event.target.textContent.trim();
    });
  });

  /** 📌 Handle Number Input & Slider Synchronization */
  const slider = document.getElementById("amountSlider");
  const input = document.getElementById("amountInput");

  slider.addEventListener("input", () => (input.value = slider.value));
  input.addEventListener("input", () => (slider.value = input.value));

  /** 📌 Generate Quiz */
  async function generateQuiz(event) {
    event.preventDefault();
    document.getElementById("formContainer").classList.add("shift-left");
    const quizOutput = document.getElementById("quizOutput");
    const topic = document.getElementById("topic").value.trim();
    const language = document.getElementById("language").value;
    const amount = document.getElementById("amountInput").value;

    if (!topic) return alert("Please enter a topic.");
    if (!selectedLevel) return alert("Please select a difficulty level.");

    // 🔹 Prompt format for Gemini AI
    const quizPromptFormat = `
      Create a multiple-choice quiz on the topic of ${topic}.
      The quiz should have ${amount} questions, each with four answer choices (A, B, C, and D).
      - 70% of the questions should have **only one correct answer**.
      - 30% of the questions should have **exactly three or two answers** (e.g., "A, B, and C" or "B, C, and D").
      
      For each question:
      - Provide four answer choices (A, B, C, and D).
      - Clearly indicate all correct answers (either one or exactly three choices).
      - Provide a short explanation for why each correct answer is correct.

      Ensure the questions are at a difficulty level of ${selectedLevel}.
      Format the output as a **valid JSON array** with this structure:
      [
        {
          "question": "Question text",
          "answers": { "A": "Option 1", "B": "Option 2", "C": "Option 3", "D": "Option 4" },
          "correct_answers": ["A"],  // For single-correct-answer questions
          "short_explain_for_answer": {
            "A": "Explanation for A"
          }
        },
        {
          "question": "Question text",
          "answers": { "A": "Option 1", "B": "Option 2", "C": "Option 3", "D": "Option 4" },
          "correct_answers": ["A", "B", "C"],  // For multiple-correct-answer questions
          "short_explain_for_answer": {
            "A": "Explanation for A",
            "B": "Explanation for B",
            "C": "Explanation for C"
          }
        }
      ]

      Generate the quiz in ${language}.
      Ensure the response is a **valid JSON array** without additional explanations, comments, or text.
`;

    // Show loading animation
    quizOutput.innerHTML = `<div class="loading"><img src="../assets/gif/LoadingRings.gif" alt="Loading" /></div>`;
    quizOutput.classList.remove("hidden");
    quizOutput.classList.add("show");
    // quizOutput.classList.s;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDo1cfNF63tLw9DGhrGEQYvWlp-Sdi2XIE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: quizPromptFormat }] }],
          }),
        }
      );

      if (!response.ok)
        throw new Error(`API request failed: ${response.statusText}`);

      const data = await response.json();
      let responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) throw new Error("No valid response from Gemini AI.");

      responseText = responseText.replace(/```json|```/g, "").trim();
      responseText = responseText.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      const quizData = JSON.parse(responseText);

      // 🔹 Store quiz data in Local Storage
      localStorage.setItem("quiz", JSON.stringify(quizData));
      localStorage.removeItem("quiz-answers");
      localStorage.removeItem("quiz-current");

      // 🔹 Validate saved data
      const quizDataString = localStorage.getItem("quiz");
      if (!quizDataString)
        throw new Error("No quiz data found in local storage");

      renderQuiz(JSON.parse(quizDataString));
    } catch (error) {
      quizOutput.innerHTML = `<p class="text-red-500 text-center font-bold">❌ Error loading quiz: ${error.message}</p>`;
    }
  }

  /** 📌 Render Quiz Output */
  function renderQuiz(quizData) {
    const quizOutput = document.getElementById("quizOutput");
    quizOutput.innerHTML = "";

    quizData.forEach((item, index) => {
      const answersHTML = Object.keys(item.answers)
        .map((key) => `<p><strong>${key}:</strong> ${item.answers[key]}</p>`)
        .join("");

      quizOutput.innerHTML += `
              <div class="mb-4 p-4 bg-blue-200 border border-blue-300 rounded shadow">
                  <p class="font-bold">${index + 1}. ${item.question}</p>
                  <div class="mt-2">${answersHTML}</div>
              </div>
          `;
    });

    quizOutput.classList.add("show");
  }

  /** 📌 Handle Generate & Start Button Behavior */
  const generateBtn = document.getElementById("generateBtn");
  const startBtn = document.getElementById("startBtn");

  generateBtn.addEventListener("click", function () {
    startBtn.classList.remove("!hidden");
    generateBtn.innerHTML = `Regenerate <span class="ml-2"><img src="../assets/images/render.png" alt="Render" width="25" /></span>`;
  });

  startBtn.addEventListener("click", function () {
    window.location.href = "quiz.html";
  });

  /** 📌 Attach Form Event Listener */
  document.getElementById("quizForm").addEventListener("submit", generateQuiz);
});
