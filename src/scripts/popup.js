// popup.js
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("customPopup")) {
      fetch("../components/popup.html")
        .then((response) => response.text())
        .then((html) => {
          document.body.insertAdjacentHTML("beforeend", html);
          setupPopup();
        })
        .catch((error) => console.error("Lỗi khi tải popup:", error));
    } else {
      setupPopup();
    }
  });
  
  function setupPopup() {
    const popup = document.getElementById("customPopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupMessage = document.getElementById("popupMessage");
    const popupCloseBtn = document.getElementById("popupCloseBtn");
  
    if (popupCloseBtn) {
      popupCloseBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
      });
    }
  
    window.showPopup = function (title, message) {
      if (popup && popupTitle && popupMessage) {
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
  
        // Ẩn popup sau 3 giây
        // setTimeout(() => {
        //   popup.classList.add("hidden");
        // }, 3000);
      }
    };
  }
  