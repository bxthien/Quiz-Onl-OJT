document.addEventListener("DOMContentLoaded", function () {
    const quizData = JSON.parse(localStorage.getItem("quiz")) || [];
    const userAnswers = JSON.parse(localStorage.getItem("quiz-answers")) || [];
    const resultContainer = document.querySelector("#total-answer");
    const questionContainer = document.querySelector(".bg-white");
    
    let correctCount = 0;
    let totalQuestions = quizData.length;
    
    questionContainer.innerHTML = "";
    
    quizData.forEach((questionData, index) => {
      const { question, answers, correct_answer, short_explain_for_answer } = questionData;
      const userAnswer = userAnswers[index] || [];
      const isCorrect = arraysEqual(new Set(userAnswer), new Set(correct_answer));
      
      if (isCorrect) correctCount++;
      
      let answerHtml = Object.entries(answers)
        .map(([key, value]) => {
          let isUserChoice = userAnswer.includes(key);
          let isCorrectChoice = correct_answer.includes(key);
          let answerClass = isUserChoice
            ? isCorrectChoice
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
            : isCorrectChoice
            ? "text-green-600 font-bold"
            : "";
          let icon = isUserChoice
            ? isCorrectChoice
              ? "<img src='../assets/svg/correct-icon.svg' class='inline-block w-5 h-5'/>"
              : "<img src='../assets/svg/wrong-icon.svg' class='inline-block w-5 h-5'/>"
            : "";
          return `<li class='ml-5 ${answerClass}'>${icon} ${key}. ${value}</li>`;
        })
        .join("\n");
      
      questionContainer.innerHTML += `
        <div class="bg_card_inner mb-2 p-2 rounded-lg shadow-lg">
          <div class="flex items-start">
            <div class="flex-1">
              <p class="text-lg font-semibold">${question}</p>
              <ul class="mt-2">${answerHtml}</ul>
              <p class="text-green-600 mt-2 ml-5"><strong>Giải thích:</strong></p>
              <p class="ml-5">${short_explain_for_answer}</p>
            </div>
            <img src="../assets/svg/${isCorrect ? "good-review-icon.svg" : "bad-review-icon.svg"}" class="ml-4 my-auto md:w-30 md:h-30 sm:w-[5px] sm:h-[5px]" />
          </div>
        </div>`;
    });
    
    resultContainer.textContent = `You answered ${correctCount}/${totalQuestions} questions correctly!`;
  });
  
  function arraysEqual(setA, setB) {
    return setA.size === setB.size && [...setA].every(value => setB.has(value));
  }