// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const caseScreen = document.getElementById('caseScreen');
const nameInput = document.getElementById('nameInput');
const registerBtn = document.getElementById('registerBtn');
const greeting = document.getElementById('greeting');
const diagnosisInput = document.getElementById('diagnosisInput');
const submitDiagnosisBtn = document.getElementById('submitDiagnosisBtn');
const nameHiddenInput = document.getElementById('nameHiddenInput'); // for form submission

let userName = '';
let hasSubmitted = false;

// Handle registration
registerBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name.length < 2) {
    alert('Please enter your name.');
    return;
  }

  userName = name;
  localStorage.setItem('swmName', userName);
  localStorage.setItem('swmHasSubmitted', 'false');

  showCaseScreen();
});

// Load saved state
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('swmName');
  const submitted = localStorage.getItem('swmHasSubmitted');

  if (savedName) {
    userName = savedName;
    hasSubmitted = submitted === 'true';
    showCaseScreen();
  }
});

function showCaseScreen() {
  welcomeScreen.classList.remove('active');
  caseScreen.classList.add('active');

  greeting.textContent = `👤 Welcome, ${userName}`;
  nameHiddenInput.value = userName;

  if (hasSubmitted) {
    diagnosisInput.disabled = true;
    submitDiagnosisBtn.disabled = true;
    submitDiagnosisBtn.textContent = 'Already Submitted';
  }
}

// Handle diagnosis submission
function handleSubmission() {
  const diagnosis = diagnosisInput.value.trim();
  if (diagnosis.length < 3) {
    alert("Please enter a diagnosis before submitting.");
    return false;
  }

  if (hasSubmitted) {
    alert("You've already submitted.");
    return false;
  }

  // Save diagnosis locally
  let responses = JSON.parse(localStorage.getItem('swmResponses') || '[]');
  responses.push({
    name: userName,
    diagnosis: diagnosis,
    date: new Date().toLocaleString()
  });
  localStorage.setItem('swmResponses', JSON.stringify(responses));
  localStorage.setItem('swmHasSubmitted', 'true');
  hasSubmitted = true;

  diagnosisInput.disabled = true;
  submitDiagnosisBtn.disabled = true;
  submitDiagnosisBtn.textContent = 'Already Submitted';

  return true; // allow form submit to FormSubmit (if you're using it)
}
