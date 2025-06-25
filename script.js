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

    let responses = JSON.parse(localStorage.getItem("swmResponses") || "[]");
    responses.push({
      name: userName,
      diagnosis: diagnosis,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("swmResponses", JSON.stringify(responses));
    localStorage.setItem("swmHasSubmitted", "true");

    diagnosisInput.disabled = true;
    submitDiagnosisBtn.disabled = true;
    submitDiagnosisBtn.textContent = "Already Submitted";

    return false;
  };
});
