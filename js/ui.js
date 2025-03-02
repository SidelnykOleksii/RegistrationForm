import { fetchUsers } from "./api.js";

export async function renderUserTable() {
  const users = await fetchUsers();
  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = ""; // Clear table before rendering

  users.forEach((user) => {
    const userRow = document.createElement("tr");

    userRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender || "N/A"}</td>
            <td class="action-icons">
                <button class="update-icon">✏️</button>
                <button class="delete-icon" data-email="${
                  user.email
                }">❌</button>
            </td>
        `;

    tableBody.appendChild(userRow);
  });
}

export function showMessage(messageText, messageType = "info") {
  const messageElement = document.getElementById("messageBox");

  messageElement.textContent = messageText;
  messageElement.className = `message ${messageType}`;
  messageElement.style.display = "block";

  setTimeout(() => {
    messageElement.style.display = "none";
  }, 3000);
}
