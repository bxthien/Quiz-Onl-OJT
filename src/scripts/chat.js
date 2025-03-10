const fs = require("fs");

// Quiz parameters
const topic = "History of War 2";
const difficulty = "Medium";
const language = "Vietnamese";
const amount = "10";

// Prompt for AI
const quizPromptFormat = `
Create a multiple-choice quiz on the topic of ${topic}. 
The quiz should have ${amount} questions, each with four answer choices (A, B, C, and D). 
Some questions may have **more than one correct answer** (e.g., "A and C" or "B, C, and D"). 

For each question:
- Provide four answer choices (A, B, C, and D).
- Indicate all correct answers (can be one or multiple choices).
- Provide a short explanation for why each correct answer is correct.

Ensure the questions are at a difficulty level of ${difficulty}. 
Format the output as a **valid JSON array** with the following structure:
[
  {
    "question": "Question text",
    "answers": { "A": "Option 1", "B": "Option 2", "C": "Option 3", "D": "Option 4" },
    "correct_answers": ["A", "C"],  
    "short_explain_for_answer": {
      "A": "Explanation for A",
      "C": "Explanation for C"
    }
  }
]

Generate the quiz in ${language}. 
Ensure the response is a **valid JSON array** without additional explanations, comments, or text.
`;

async function generateQuiz() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAchUc_ifLB0eDwpAIP9eDmzFA_KRxXnSg`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: quizPromptFormat }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    let responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("No valid response from Gemini AI.");
    }

    // Clean up response (remove markdown code block markers)
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Fix common JSON issues (e.g., trailing commas)
    responseText = responseText.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]");

    // Parse JSON safely
    const quizData = JSON.parse(responseText);

    // Save JSON to file
    fs.writeFileSync("quiz.json", JSON.stringify(quizData, null, 2));
    console.log("✅ Quiz saved to quiz.json");
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
  }
}

// Run the function
generateQuiz();
