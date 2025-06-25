function handleSubmission() {
  const diagnosis = diagnosisInput.value.trim();
  if (diagnosis.length < 3) {
    alert("Please enter a diagnosis before submitting.");
    return false;
  }

  if (hasSubmitted) {
    alert("You’ve already submitted your diagnosis.");
    return false;
  }

  // Save submission
  const responses = JSON.parse(localStorage.getItem("swmResponses") || "[]");
  responses.push({
    name: userName,
    diagnosis: diagnosis,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("swmResponses", JSON.stringify(responses));

  // Lock form
  localStorage.setItem('swmHasSubmitted', 'true');
  hasSubmitted = true;
  diagnosisInput.disabled = true;
  submitDiagnosisBtn.disabled = true;
  submitDiagnosisBtn.textContent = "Already Submitted";

  return true; // let form submit
}
