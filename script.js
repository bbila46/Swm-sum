const welcomeScreen = document.getElementById('welcomeScreen');
const caseScreen = document.getElementById('caseScreen');
const registerBtn = document.getElementById('registerBtn');
const userNameInput = document.getElementById('userNameInput');
const greeting = document.getElementById('greeting');
const submitDiagnosisBtn = document.getElementById('submitDiagnosisBtn');
const diagnosisInput = document.getElementById('diagnosisInput');
const userNameField = document.getElementById('userNameField');

let userName = '';
let hasSubmitted = localStorage.getItem('swmHasSubmitted') === 'true';

if (localStorage.getItem('swmUserName')) {
  userName = localStorage.getItem('swmUserName');
  showCaseScreen();
}

registerBtn.addEventListener('click', () => {
  const name = userNameInput.value.trim();
  if (name.length < 2) {
    alert('Please enter a valid name.');
    return;
  }
  userName = name;
  localStorage.setItem('swmUserName', userName);
  showCaseScreen();
});

function showCaseScreen() {
  welcomeScreen.classList.remove('active');
  caseScreen.classList.add('active');
  greeting.textContent = `Hello, ${userName}!`;
  userNameField.value = userName;

  if (hasSubmitted) {
    diagnosisInput.disabled = true;
    submitDiagnosisBtn.disabled = true;
    submitDiagnosisBtn.textContent = 'Already Submitted';
  }
}

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

  localStorage.setItem('swmHasSubmitted', 'true');
  hasSubmitted = true;

  diagnosisInput.disabled = true;
  submitDiagnosisBtn.disabled = true;
  submitDiagnosisBtn.textContent = "Already Submitted";

  return true; // allow form to send
}
