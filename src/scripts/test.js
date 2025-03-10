document.addEventListener("DOMContentLoaded", () => {
  let selectedLevel = ""; // Store the selected level

  // Handle level button selection
  const levelButtons = document.querySelectorAll(".levelBtn");
  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active style from all buttons
      levelButtons.forEach((btn) => btn.classList.remove("selected-button"));

      // Add active style to selected button
      button.classList.add("selected-button");

      // Update selected level
      selectedLevel = button.textContent;
    });
  });

  // Function to get form values
  function generateQuiz() {
    const topic = document.getElementById("topic").value.trim();
    const language = document.getElementById("language").value;
    const amount = document.getElementById("amount").value;

    if (!topic) {
      alert("Please enter a topic.");
      return;
    }

    if (!selectedLevel) {
      alert("Please select a difficulty level.");
      return;
    }

    window.alert(topic + "" + selectedLevel + "" + language + "" + amount);

    // Here, you can send these values to your backend or use them as needed
  }

  document
    .getElementById("generateBtn")
    .addEventListener("click", generateQuiz);
});
