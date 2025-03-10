const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAchUc_ifLB0eDwpAIP9eDmzFA_KRxXnSg");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const topic = "History";
const difficulty = "Easy";
const language = "Vietnam";

const quizPromptFormat = `
Create a multiple-choice quiz on the topic of ${topic}. 
The quiz should have 20 questions, each with four answer choices (A, B, C, and D). 
Indicate the correct answer and short explain about correct answer for each question. 
Ensure the questions are at a difficulty level of ${difficulty}. 
Format the output as a valid JSON array with the following structure:
[
  {
    "question": "Question text",
    "answers": { "A": "Option 1", "B": "Option 2", "C": "Option 3", "D": "Option 4" },
    "correct_answer": "A",
    "short_explain_for_answer": "Explain"
  }
]
Generate the quiz in ${language}.
`;

async function generateQuiz() {
  try {
    const result = await model.generateContent(quizPromptFormat);
    let responseText = await result.response.text();

    // Remove code block markers if present
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Try parsing JSON safely
    const quizData = JSON.parse(responseText);

    // Save JSON to file
    fs.writeFileSync("quiz.json", JSON.stringify(quizData, null, 2));
    console.log("Quiz saved to quiz.json");

    return quizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
  }
}

generateQuiz();
