const scriptURL = 'https://script.google.com/macros/s/AKfycbzo8hSeXuNCN0riz4Dk4dxyBsua7Zin_LMEinsHFR93LiPBeM1c0oJN8bcGloBwaVAsow/exec';

document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const caseScreen = document.getElementById("caseScreen");
  const nameInput = document.getElementById("nameInput");
  const registerBtn = document.getElementById("registerBtn");
  const greeting = document.getElementById("greeting");
  const nameHiddenInput = document.getElementById("nameHiddenInput");
  const diagnosisInput = document.getElementById("diagnosisInput");
  const submitDiagnosisBtn = document.getElementById("submitDiagnosisBtn");

  let userName = localStorage.getItem("swmName") || "";
  let hasSubmitted = localStorage.getItem("swmHasSubmitted") === "true";

  function showCaseScreen() {
    welcomeScreen.classList.remove("active");
    caseScreen.classList.add("active");
    greeting.textContent = `👤 Welcome, ${userName}`;
    nameHiddenInput.value = userName;

    if (hasSubmitted) {
      diagnosisInput.disabled = true;
      submitDiagnosisBtn.disabled = true;
      submitDiagnosisBtn.textContent = "Already Submitted";
    }
  }

  if (userName) {
    showCaseScreen();
  }

  registerBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name.length < 2) {
      alert("Please enter your name.");
      return;
    }

    userName = name;
    localStorage.setItem("swmName", userName);
    localStorage.setItem("swmHasSubmitted", "false");
    hasSubmitted = false;

    showCaseScreen();
  });

  window.handleSubmission = () => {
    const diagnosis = diagnosisInput.value.trim();
    if (diagnosis.length < 3) {
      alert("Please write a longer diagnosis.");
      return false;
    }

    if (hasSubmitted) {
      alert("Already submitted.");
      return false;
    }

    const payload = {
      name: userName,
      diagnosis: diagnosis
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        localStorage.setItem("swmHasSubmitted", "true");
        diagnosisInput.disabled = true;
        submitDiagnosisBtn.disabled = true;
        submitDiagnosisBtn.textContent = "Already Submitted";
        alert("Submitted successfully!");
      } else {
        alert("Failed to submit.");
      }
    })
    .catch(error => {
      console.error("Error!", error.message);
    });

    return false;
  };
});
