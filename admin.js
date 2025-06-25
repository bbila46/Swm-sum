const loginScreen = document.getElementById("loginScreen");
const adminScreen = document.getElementById("adminScreen");
const adminPassword = document.getElementById("adminPassword");
const loginMessage = document.getElementById("loginMessage");
const responseTable = document.getElementById("responseTable").querySelector("tbody");

// 🔐 SET your admin password here
const CORRECT_PASSWORD = "swm2025admin";

function login() {
  const input = adminPassword.value.trim();
  if (input === CORRECT_PASSWORD) {
    loginScreen.classList.remove("active");
    adminScreen.classList.add("active");
    loadResponses();
  } else {
    loginMessage.textContent = "❌ Incorrect password!";
  }
}

function loadResponses() {
  const raw = localStorage.getItem("swmResponses");
  if (!raw) {
    responseTable.innerHTML = "<tr><td colspan='3'>No responses yet.</td></tr>";
    return;
  }

  const data = JSON.parse(raw);
  responseTable.innerHTML = "";

  data.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.diagnosis}</td>
      <td>${entry.date}</td>
    `;
    responseTable.appendChild(row);
  });
}
