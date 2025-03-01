import {fetchUsers} from "./api.js";

export async function renderUserTable() {
    const users = await fetchUsers();
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = ""; // Clear table before render
  
    users.forEach((user) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.gender || "N/A"}</td>
      <td class="action-icons">
      <button class="update-icon">✏️</button>
      <button class="delete-icon" data-email="${user.email}">❌</button>
      </td>
      `;
  
      tableBody.appendChild(row);
    });
  }

export function showMessage(message, type = "info") {
    const messageBox = document.getElementById("messageBox");

    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
    messageBox.style.display = "block";

    console.log("Повідомлення з'явилося");

    setTimeout(() => {
        console.log("Приховуємо повідомлення");
        messageBox.style.display = "none";
    }, 3000);
}