document.addEventListener("DOMContentLoaded", () => {
  // 🟢 Default selected level
  let selectedLevel = "Medium";

  const startBtn = document.getElementById("startBtn");

  /** 📌 Handle Level Selection */
  const levelButtons = document.querySelectorAll(".levelBtn");
  levelButtons[1].classList.add("selected-button");

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

    // 🔹 Prompt format for Gemini AI
    const quizPromptFormat = `Create a concise multiple-choice quiz on ${topic}. Aim for fast generation.
    Number of questions: ${amount}. Each question has 4 answer choices (A, B, C, D).
    Question types:
        - 70% - Single correct answer.
        - 30% - Two or three correct answers.
        - Make sure questions are unique, not repetitive, and cover different aspects of the topic.
    For each question:
        - Provide answer choices A, B, C, and D. Keep answers brief.
        - Clearly indicate all correct answer options.
        - Write very short explanations (1 sentence max) for each correct answer, focusing on the core reason.
    
    Difficulty level: ${selectedLevel} (e.g., beginner, intermediate, advanced. Beginner=basic facts, Advanced=complex concepts).
    Output format:  A valid JSON array structured as follows:
    [
      {
        "question": "Question text (brief)",
        "answers": { "A": "Option 1 (short)", "B": "Option 2 (short)", "C": "Option 3 (short)", "D": "Option 4 (short)" },
        "correct_answers": ["A"],
        "short_explain_for_answer": {
          "A": "Explanation for A (very short)"
        }
      },
      {
        "question": "Question text (brief)",
        "answers": { "A": "Option 1 (short)", "B": "Option 2 (short)", "C": "Option 3 (short)", "D": "Option 4 (short)" },
        "correct_answers": ["A", "B", "C"],
        "short_explain_for_answer": {
          "A": "Explanation for A (very short)",
          "B": "Explanation for B (very short)",
          "C": "Explanation for C (very short)"
        }
      }
    ]
    
    Generate the quiz in ${language}.
    IMPORTANT:  Return ONLY a valid JSON array. No extra text, no explanations outside the JSON, no comments. Ensure fast response.
    `;

    // Show loading animation
    quizOutput.innerHTML = `<div class="loading"><img src="../assets/gif/LoadingRings.gif" alt="Loading" /></div>`;
    quizOutput.classList.remove("hidden");
    quizOutput.classList.add("show");
    // quizOutput.classList.s;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyByBxJJuv6YeOb7-_5PvXNl-uyiaTFS1R0`,
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
    startBtn.classList.remove("!hidden");
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

  generateBtn.addEventListener("click", function () {
    generateBtn.innerHTML = `Regenerate <span class="ml-2"><img src="../assets/images/render.png" alt="Render" width="25" /></span>`;
    startBtn.classList.add("!hidden");
  });

  startBtn.addEventListener("click", function () {
    window.location.href = "quiz.html";
  });

  /** 📌 Attach Form Event Listener */
  document.getElementById("quizForm").addEventListener("submit", generateQuiz);
});
